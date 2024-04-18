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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveIngredient();
    }
  };

  const navigateToSavedIngredients = () => {
    navigate('/saved-ingredients');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSaveIngredient(); }}>
      <div className='container-save'>
        <div className='content-save'>
          <div className='input-container'>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Enter an ingredient: "
              className='input'
              onKeyPress={handleKeyPress} // Add event listener for Enter key press
            />
          </div>
          <div className="button-group">
            <button type="submit" className="button-style-two">Save Item</button>
            <button type="button" className="button-style-two" onClick={navigateToSavedIngredients}>View Items</button>
          </div>
        </div>
        {/* Apply the 'show' class conditionally based on the 'showSuccessMessage' state */}
        <p className={`success-message ${showSuccessMessage ? 'show' : ''}`}>Ingredient saved successfully!</p>
      </div>
    </form>
  );
};

export default IngredientSaver;

