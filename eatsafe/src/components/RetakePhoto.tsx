import React from 'react';
import './FileUpload.css';

const RetakePhoto: React.FC = () => {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className=".image-upload-button">
      {/* Use onClick and pass the refreshPage function */}
      <button className="image-upload-button" onClick={refreshPage}>Retake Picture</button>
    </div>
  );
};

export default RetakePhoto;