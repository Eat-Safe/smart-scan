import React from 'react';
import './AllergensDisplay.css'; 

interface AllergensDisplayProps {
  allergens: string[];
  searchedAllergens: string[]; 
}

const AllergensDisplay: React.FC<AllergensDisplayProps> = ({ allergens, searchedAllergens }) => {
  return (
    <div className={`allergens-display ${allergens.length > 0 ? 'gradient-background' : ''}`}>
      {allergens.length > 0 && (
        <p>Potential Allergens Detected: {allergens.join(', ')}</p>
      )}
      {/* Added display of searched allergens */}
      {searchedAllergens.length > 0 && (
        <p>Saved Allergens Found: {searchedAllergens.join(', ')}</p>
      )}
    </div>
  );
};

export default AllergensDisplay;
