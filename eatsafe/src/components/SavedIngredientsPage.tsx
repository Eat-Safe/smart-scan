import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './ButtonStyle.css'; // Import CSS file for styles

const SavedIngredientsPage = () => {
  const [savedIngredients, setSavedIngredients] = useState<string[]>([]);
  const [ingredientDeleted, setIngredientDeleted] = useState(false); // State to trigger transition
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved ingredients from local storage
    const ingredients = JSON.parse(localStorage.getItem('ingredients') || '[]');
    setSavedIngredients(ingredients);
  }, [ingredientDeleted]); // Re-fetch ingredients when ingredientDeleted changes

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    // Remove the ingredient from the savedIngredients array
    const updatedIngredients = savedIngredients.filter(ing => ing !== ingredientToDelete);
    // Update the local storage with the updated ingredients
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    // Trigger the transition by toggling ingredientDeleted state
    setIngredientDeleted(!ingredientDeleted);
  };

  return (
    <div>
      <Header />
      <h1 className="savedIngredients" style={{ textAlign: 'center', color: 'white'}}> SAVED INGREDIENTS </h1>
      <ul className="delete-container" style={{ listStyleType: 'none', paddingLeft: '10px' }}>
        {savedIngredients.map((ingredient, index) => (
          <li key={index} style={{ fontFamily: 'Arial', fontSize: '16px', color: '#333' }}>
            {ingredient}
            <button className="delete-style" onClick={() => handleDeleteIngredient(ingredient)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedIngredientsPage;
