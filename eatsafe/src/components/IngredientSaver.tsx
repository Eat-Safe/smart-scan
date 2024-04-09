import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import "./IngredientSaver.css"

interface IngredientSaverProps {
  savedIngredients: string[];
  setSavedIngredients: Dispatch<SetStateAction<string[]>>;
}

const IngredientSaver: React.FC<IngredientSaverProps> = ({ savedIngredients, setSavedIngredients }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSaveIngredient = () => {
    const updatedIngredients = [...savedIngredients, ingredient];
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    setSavedIngredients(updatedIngredients);
    setIngredient('');
  };

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    const updatedIngredients = savedIngredients.filter(ingredient => ingredient !== ingredientToDelete);
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    setSavedIngredients(updatedIngredients);
  };

  return (
    <div>
      <div className='container-save'>
        <div className='content-save'>
          <div className='input-container'>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Enter an ingredient to search: "
            />
          </div>
          <button className="button" onClick={handleSaveIngredient}>Save Ingredient</button>
        </div>
      </div>
      <div className='container-save'>
        {savedIngredients.length > 0 && (
          <ul>
            {savedIngredients.map((savedIngredient, index) => (
              <li key={index}>
                {savedIngredient}
                <button onClick={() => handleDeleteIngredient(savedIngredient)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IngredientSaver;