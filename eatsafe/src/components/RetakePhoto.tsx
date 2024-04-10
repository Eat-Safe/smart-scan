import React from 'react';
import './ButtonStyle.css';

const RetakePhoto: React.FC = () => {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="button-container">
      {/* Use onClick and pass the refreshPage function */}
      <button className="button-style" onClick={refreshPage}>Reload</button>
    </div>
  );
};

export default RetakePhoto;