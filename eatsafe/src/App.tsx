import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture'; 
import TextDisplay from './components/TextDisplay';
import AllergensDisplay from './components/AllergensDisplay'; 
import allergensList from './allergens.json';
import InfoBox from './components/InfoBox';
import IngredientSaver from './components/IngredientSaver';



declare global {
  interface Window {
    Tesseract: any;
  }
}

function App() {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [ocrText, setOcrText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [savedAllergen, setSavedAllergen] = useState<string>('')

  useEffect(() => {
    // Load the saved allergen when the component mounts
    const loadedAllergen = localStorage.getItem('ingredient');
    if (loadedAllergen) {
      setSavedAllergen(loadedAllergen);
    }
  }, []);

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
  
     let detectedAllergens = allergensList.filter(allergen => !allergenFreeList.includes(allergen.toLowerCase()) && textLowercased.includes(allergen.toLowerCase()));

    // Check for the saved allergen
    const savedAllergenLowercased = savedAllergen.toLowerCase();
    if (savedAllergen && textLowercased.includes(savedAllergenLowercased) && !detectedAllergens.includes(savedAllergenLowercased)) {
      detectedAllergens.push(savedAllergenLowercased);
    }

    setAllergens(detectedAllergens);
    setHasChecked(true);
  };
  
  

  return (
    <div className="App">
      <Header />
      <InfoBox />
      <IngredientSaver />
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

export default App;
