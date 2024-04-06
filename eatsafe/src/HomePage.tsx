import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture'; 
import TextDisplay from './components/TextDisplay';
import AllergensDisplay from './components/AllergensDisplay'; 
import allergensList from './allergens.json';
import InfoBox from './components/InfoBox';



declare global {
  interface Window {
    Tesseract: any;
  }
}

function HomePage() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);


  useEffect(() => {
    // Automatically call extractTextFromImage when image state changes and is not null
    if (image) {
      extractTextFromImage(image as string); // Pass image as string
    }
  }, [image]); // Dependency array, re-run the effect when `image` changes

  const handleImageCapture = (imageSrc: string) => {
    setImage(imageSrc);
    extractTextFromImage(imageSrc); // Call extractTextFromImage with the imageSrc argument
  };
  
  const extractTextFromImage = async (imageSrc: string) => {
    setIsProcessing(true);
    try {
      const { data: { text } } = await window.Tesseract.recognize(
        imageSrc,
        'eng',
      );
      setOcrText(text);
      detectAllergens(text); 
    } catch (error) {
      console.error('OCR Error:', error);
      setOcrText('Failed to extract text. See console for details.');
    }
    setIsProcessing(false);
  };

  const detectAllergens = (text: string) => {
    const textLowercased = text.toLowerCase();
    const freeRegex = /\b(\w+[- ]?free)\b/g; 
    const freeAllergens = textLowercased.match(freeRegex) || [];
    const allergenFreeList = freeAllergens.map(allergenFree =>
      allergenFree.replace(/[- ]?free/, '').trim()
    );
  
    
    const detectedAllergens = allergensList.filter(allergen => {
      const allergenLowercased = allergen.toLowerCase();
      
      if (allergenFreeList.includes(allergenLowercased)) {
        return false;
      }

      return textLowercased.includes(allergenLowercased);
    });
  
    setAllergens(detectedAllergens); 
    setHasChecked(true);
  };
  
  

  return (
    <div className="App">
      <Header />
      <InfoBox />
      <WebcamCapture onCapture={handleImageCapture} />
      {/* Removed the button as extractTextFromImage is now called automatically */}
      {isProcessing ? <p>Extracting...</p> : <TextDisplay text={ocrText} />}
      <AllergensDisplay allergens={allergens} />
      {hasChecked && allergens.length === 0 && (
      <p className="allergen-status-safe">Safe food, no potential allergens detected.</p>
      )}
    </div>
  );
}

export default HomePage;
