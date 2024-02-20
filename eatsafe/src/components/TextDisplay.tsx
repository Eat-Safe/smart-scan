import React from 'react';
import './TextDisplay.css'; // Make sure to create a TextDisplay.css file for styling

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  return (
    <div className="text-display">
      {/* Conditional rendering: if text is not an empty string, display it */}
      {text && <p>Extracted Text: {text}</p>}
    </div>
  );
};

export default TextDisplay;
