import React from 'react';
import './TextDisplay.css'; // Make sure to create a TextDisplay.css file for styling

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  return (
    <div className="text-display">
      <div className="overlay"></div>
      {/* Conditional rendering: if text is not an empty string, display it */}
      {text && <p className ="text-content">Extracted Text: {text}</p>}
    </div>
  );
};

export default TextDisplay;
