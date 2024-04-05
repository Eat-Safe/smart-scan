import React from 'react';
import './ButtonStyle.css'; // Make sure to create a FileUpload.css file for styling

interface FileUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  return (
    <div className="button-container">
      <input
        type="file"
        onChange={onFileSelect}
        accept="image/*"
        id="fileInput"
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className="upload-style">Upload Image</label>
    </div>
  );
};

export default FileUpload;
