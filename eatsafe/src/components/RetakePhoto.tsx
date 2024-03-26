import React from 'react';
import './FileUpload.css'; // Make sure to create a FileUpload.css file for styling

interface FileUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="file-upload">
      {/* Use onClick and pass the refreshPage function */}
      <input type="button" value="Refresh" onClick={refreshPage} />
      
      <label htmlFor="fileInput" className="image-upload-button">
        Retake Photo
      </label>
    </div>
  );
};

export default FileUpload;