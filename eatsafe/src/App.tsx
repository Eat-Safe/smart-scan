import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

declare global {
  interface Window {
    Tesseract: any; // May adjust type:any to a more fitting type for ingredients
  }
}

function App() { //these const 'States' hold the temp data, updated below. Image data, OCR data, and 'isTrue' OCR is running
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  //handle file selection + read file as data URL
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      //update const[image, setImage] once file is loaded
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImage(e.target.result);
        }
      };
      
      //read file as Data URL
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  //function that extracts text from image using Tesseract.js
  const extractTextFromImage = async () => {
    if (image && typeof image === 'string') {
      setIsProcessing(true); // Beginning of OCR processing
      try {
        const { data: { text } } = await window.Tesseract.recognize(
          image,
          'eng', //can add other languages, currently english
        );
        setOcrText(text); //updated const [ocrText, setOcrText]
      } catch (error) {
        console.error('OCR Error:', error);
        setOcrText('Failed to extract text. See console for details.');
      }
      setIsProcessing(false); //End of OCR processing, back to false
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* Hidden file input for image upload vvv */}
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
          id="fileInput"
        />
        {/* Button to trigger the file input click event vvv */}
        <button 
          className="image-upload-button"
          onClick={() => document.getElementById('fileInput')!.click()}>
          Upload Image
        </button>
        {/* Button to start the OCR process, unless currently processing or if no image is selected */}
        <button 
          className="OCR-button"
          onClick={extractTextFromImage} disabled={isProcessing || !image}>
          {isProcessing ? 'Extracting...' : 'Extract Text'}
        </button>
        {/* Displays extracted text */}
        {ocrText && <p>Extracted Text: {ocrText}</p>}
      </header>
    </div>
  );
}

export default App;

