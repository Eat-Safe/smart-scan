import React, { useState } from 'react';
import './InfoBox.css';

function InfoBox() {
    const [isActive, setIsActive] = useState(false);

    const toggleCollapse = () => {
        setIsActive(!isActive);
    };

    return (
        <div className='collapsible-container'>
            <button className={`collapsible ${isActive ? 'active' : ''}`} onClick={toggleCollapse}>
                How To Use Info:
            </button>
            {isActive && <p className="content">
            <strong>WARNING:</strong> This product is currently in development and may provide inaccurate or incorrect answers. It is essential to exercise caution when using this software.
            <br></br><br></br><strong>- Center Positioning:</strong> To achieve the best results, ensure that the food label is positioned at the center of the camera frame. This facilitates clear and accurate scanning. 
            <br></br><br></br><strong>- Background Considerations:</strong> It is advisable to avoid backgrounds that contain other elements, particularly text. Such distractions may interfere with the scanning process and reduce accuracy.
            <br></br><br></br><strong>- Lighting Conditions:</strong> Adequate lighting is crucial for optimal scanning outcomes. Please ensure the area is well-lit to minimize glare. However, be cautious not to create excessive brightness that could hinder the camera's ability to capture the lettering clearly.
            </p>}
        </div>
    );
}

export default InfoBox;