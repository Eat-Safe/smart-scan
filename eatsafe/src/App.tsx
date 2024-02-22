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


const allergensList = ['gluten', 'peanut', 'dairy'];

function App() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [allergens, setAllergens] = useState<string[]>([]);

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
        detectAllergens(text); 
      } catch (error) {
        console.error('OCR Error:', error);
        setOcrText('Failed to extract text. See console for details.');
      }
      setIsProcessing(false);
    }
  };

  const detectAllergens = (text: string) => {
    const detectedAllergens = allergensList.filter(allergen => text.toLowerCase().includes(allergen));
    setAllergens(detectedAllergens);
  };

  return (
    <div className="App">
<<<<<<< HEAD
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
        {allergens.length > 0 && <p>Allergens Detected: {allergens.join(', ')}</p>}
      </header>
=======
      <Header /> {/* Use the Header component */}
      <FileUpload onFileSelect={handleImageChange} /> {/* Use the FileUpload component */}
      <button 
        className="OCR-button"
        onClick={extractTextFromImage} disabled={isProcessing || !image}>
        {isProcessing ? 'Extracting...' : 'Extract Text'}
      </button>
      <TextDisplay text={ocrText} /> {/* Use the TextDisplay component */}
>>>>>>> origin/main
    </div>
  );
}

export default App;
