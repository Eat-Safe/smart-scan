import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

// Define an interface for the component's props
interface IngredientSaverProps {
  savedIngredients: string[];
  setSavedIngredients: Dispatch<SetStateAction<string[]>>;
  onIngredientsUpdated: () => void;
}

const IngredientSaver: React.FC<IngredientSaverProps> = ({ savedIngredients, setSavedIngredients, onIngredientsUpdated }) => {
  const [ingredient, setIngredient] = useState('');

  const handleSaveIngredient = () => {
    const updatedIngredients = [...savedIngredients, ingredient];
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    setSavedIngredients(updatedIngredients); // Update the shared state
    setIngredient(''); // Clear the input field
  };

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    const updatedIngredients = savedIngredients.filter(ingredient => ingredient !== ingredientToDelete);
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    setSavedIngredients(updatedIngredients); // Update the shared state
    onIngredientsUpdated(); 
  };

  return (
    <div>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter an ingredient"
      />
      <button onClick={handleSaveIngredient}>Save Ingredient</button>
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
  );
};

export default IngredientSaver;