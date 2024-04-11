// SavedIngredientsPage.tsx
import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const SavedIngredientsPage = () => {

  const savedIngredients: string[] = JSON.parse(localStorage.getItem('ingredients') || '[]');
  const navigate = useNavigate();

  const handleDeleteIngredient = (ingredientToDelete: string) => {
    const updatedIngredients = savedIngredients.filter(ing => ing !== ingredientToDelete);
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    navigate('/saved-ingredients'); // Navigate back to the same route
  };

  return (
    <div>
      <Header />
      <h1>Saved Ingredients</h1>
      <ul>
        {savedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => handleDeleteIngredient(ingredient)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedIngredientsPage;
