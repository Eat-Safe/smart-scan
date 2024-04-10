// IngredientSaver.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./IngredientSaver.css"

interface IngredientSaverProps {
  savedIngredients: string[];
  setSavedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  onIngredientsUpdated: () => void;
}

const IngredientSaver: React.FC<IngredientSaverProps> = ({
  savedIngredients,
  setSavedIngredients,
  onIngredientsUpdated
}) => {
  const [ingredient, setIngredient] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSaveIngredient = () => {
    if (ingredient && !savedIngredients.includes(ingredient)) {
      const newSavedIngredients = [...savedIngredients, ingredient];
      localStorage.setItem('ingredients', JSON.stringify(newSavedIngredients));
      setSavedIngredients(newSavedIngredients);
      setIngredient('');
      onIngredientsUpdated();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const navigateToSavedIngredients = () => {
    navigate('/saved-ingredients');
  };

  return (
    <div className='container-save'>
      <div className='content-save'>
        <div className='input-container'>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter an ingredient: "
            className='input'
          />
        </div>
          <button className="button-style-two" onClick={handleSaveIngredient}>
            Save Ingredient
          </button>
          <button className="button-style-two" onClick={navigateToSavedIngredients}>
            View Saved Ingredients
          </button>
      </div>
      {showSuccessMessage && <p className="success-message">Ingredient saved successfully!</p>}
    </div>
  );
};

export default IngredientSaver;
