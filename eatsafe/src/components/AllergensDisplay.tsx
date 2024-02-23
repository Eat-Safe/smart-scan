// AllergensDisplay.tsx
import React from 'react';
import './AllergensDisplay.css'; 

interface AllergensDisplayProps {
  allergens: string[];
}

const AllergensDisplay: React.FC<AllergensDisplayProps> = ({ allergens }) => {
  return (
    <div className="allergens-display">
      {allergens.length > 0 && (
        <p>Allergens Detected: {allergens.join(', ')}</p>
      )}
    </div>
  );
};

export default AllergensDisplay;
