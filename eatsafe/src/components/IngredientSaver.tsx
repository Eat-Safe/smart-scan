import React, { useState, useEffect } from 'react';

const IngredientSaver: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [savedIngredients, setSavedIngredients] = useState<string[]>([]);

  useEffect(() => {
    const loadedIngredients = localStorage.getItem('ingredients');
    if (loadedIngredients) {
      setSavedIngredients(JSON.parse(loadedIngredients));
    }
  }, []);

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


