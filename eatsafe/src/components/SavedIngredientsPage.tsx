// SavedIngredientsPage.tsx
import React from 'react';
import Header from './Header';

const SavedIngredientsPage = () => {

  const savedIngredients: string[] = JSON.parse(localStorage.getItem('ingredients') || '[]');


  const handleDeleteIngredient = (ingredientToDelete: string) => {
    const updatedIngredients = savedIngredients.filter(ing => ing !== ingredientToDelete);
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    window.location.reload();
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
