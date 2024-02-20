import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';

declare global {
  interface Window {
    Tesseract: any;
  }
}

function App() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImage(e.target.result);
        }
      };
      
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const extractTextFromImage = async () => {
    if (image && typeof image === 'string') {
      setIsProcessing(true);
      try {
        const { data: { text } } = await window.Tesseract.recognize(
          image,
          'eng',
        );
        setOcrText(text);
      } catch (error) {
        console.error('OCR Error:', error);
        setOcrText('Failed to extract text. See console for details.');
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="App">
      <Header /> {/* Use the Header component */}
      <FileUpload onFileSelect={handleImageChange} /> {/* Use the FileUpload component */}
      <button 
        className="OCR-button"
        onClick={extractTextFromImage} disabled={isProcessing || !image}>
        {isProcessing ? 'Extracting...' : 'Extract Text'}
      </button>
      <TextDisplay text={ocrText} /> {/* Use the TextDisplay component */}
    </div>
  );
}

export default App;
