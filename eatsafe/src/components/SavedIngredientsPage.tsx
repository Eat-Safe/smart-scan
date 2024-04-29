import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './ButtonStyle.css'; // Import CSS file for styles
import './SavedIngredientsPage.css'

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
      <div className="saved-ingredients-page">
        <h1 className="savedIngredients">SAVED INGREDIENTS</h1>
      </div>
      <div className="saved-ingredients-page">
        <ul className="delete-container">
          {savedIngredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              {ingredient}
              <Button variant="danger" onClick={() => handleDeleteIngredient(ingredient)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavedIngredientsPage;
