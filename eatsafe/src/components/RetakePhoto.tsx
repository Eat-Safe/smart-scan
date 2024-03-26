import React from 'react';
import './FileUpload.css';

const RetakePhoto: React.FC = () => {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="file-upload">
      {/* Use onClick and pass the refreshPage function */}
      <input type="button" value="Refresh" onClick={refreshPage} />
    </div>
  );
};

export default RetakePhoto;