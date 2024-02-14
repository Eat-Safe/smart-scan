import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

declare global {
  interface Window {
    Tesseract: any; // Adjust for more specific typing as needed
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="fileInput"
        />
        <button 
          className="image-upload-button"
          onClick={() => document.getElementById('fileInput')!.click()}>
          Upload Image
        </button>
        <button 
          className="OCR-button"
          onClick={extractTextFromImage} disabled={isProcessing || !image}>
          {isProcessing ? 'Extracting...' : 'Extract Text'}
        </button>
        {ocrText && <p>Extracted Text: {ocrText}</p>}
      </header>
    </div>
  );
}

export default App;

