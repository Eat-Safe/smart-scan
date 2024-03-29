import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import WebcamCapture from './components/WebcamCapture';
import TextDisplay from './components/TextDisplay';
import AllergensDisplay from './components/AllergensDisplay'; 
import allergensList from './allergens.json';


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

  useEffect(() => {
    // Automatically call extractTextFromImage when image state changes and is not null
    if (image) {
      extractTextFromImage();
    }
  }, [image]); // Dependency array, re-run the effect when `image` changes


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
  const handleImageCapture = (imageSrc: string) => {
    setImage(imageSrc); // Use the same state as for the uploaded image
  };

  const detectAllergens = (text: string) => {
    const textLowercased = text.toLowerCase();
    const freeRegex = /\b(\w+[- ]?free)\b/g; // 匹配 'xxx-free' 或 'xxx free'
    const freeAllergens = textLowercased.match(freeRegex) || [];
    const allergenFreeList = freeAllergens.map(allergenFree =>
      allergenFree.replace(/[- ]?free/, '').trim()
    );
  
    // 检测文本中的过敏原
    const detectedAllergens = allergensList.filter(allergen => {
      const allergenLowercased = allergen.toLowerCase();
      // 如果在'allergen-free'列表中，跳过
      if (allergenFreeList.includes(allergenLowercased)) {
        return false;
      }
      // 检测文本是否含有过敏原
      return textLowercased.includes(allergenLowercased);
    });
  
    setAllergens(detectedAllergens); // 更新检测到的过敏原状态
    setHasChecked(true);
  };
  
  

  return (
    <div className="App">
      <Header />
      <FileUpload onFileSelect={handleImageChange} />
      <WebcamCapture onCapture={handleImageCapture}/>
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
