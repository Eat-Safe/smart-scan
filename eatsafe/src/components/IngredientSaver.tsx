import React, { useState, useEffect } from 'react';

const IngredientSaver: React.FC = () => {
  const [ingredient, setIngredient] = useState(''); // Holds the current input from the user
  const [savedIngredient, setSavedIngredient] = useState(''); // Holds the saved ingredient from localStorage

  // Effect hook to load the saved ingredient from localStorage when the component mounts
  useEffect(() => {
    const loadedIngredient = localStorage.getItem('ingredient');
    if (loadedIngredient) {
      setSavedIngredient(loadedIngredient);
    }
  }, []);

  // Function to handle saving the ingredient to localStorage
  const handleSaveIngredient = () => {
    localStorage.setItem('ingredient', ingredient); // Save the current ingredient to localStorage
    setSavedIngredient(ingredient); // Update the state to reflect the new saved ingredient
    setIngredient(''); // Clear the input field
    alert('Ingredient saved!'); // Optional: Alert the user that the ingredient has been saved
  };

  // Function to handle deleting the saved ingredient from localStorage
  const handleDeleteIngredient = () => {
    localStorage.removeItem('ingredient'); // Remove the ingredient from localStorage
    setSavedIngredient(''); // Update the state to reflect the deletion
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
      {savedIngredient && (
        <div>
          <p>Last saved ingredient: {savedIngredient}</p>
          <button onClick={handleDeleteIngredient}>Delete Ingredient</button>
        </div>
      )}
    </div>
  );
};

export default IngredientSaver;

