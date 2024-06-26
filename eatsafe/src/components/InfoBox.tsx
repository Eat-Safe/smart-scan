import React from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is included
import './InfoBox.css';  // Custom CSS for styling

function InfoBox() {
  return (
    <div className='collapsible-container'>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How To Use:</Accordion.Header>
          <Accordion.Body>
            <p>
              <strong>WARNING:</strong> This product is under development and may provide inaccurate or incorrect answers. It is essential to exercise caution when using this software.
              <br /><br />
              <strong>How To Use:</strong> Upload a product label or snap a clear picture of one! Our software will extract and identify potential allergens. Review the report at the bottom of the page to see a list of allergies within the product. 
              <br /><br />
              <strong>Please keep the following in mind when uploading/taking a picture of the label: </strong>
              <br /><br />
              <li><strong>Picture Etiquette:</strong> It is recommended to minimize motion blur by stabilizing the camera. Aim to capture the photo in a manner that aligns the camera parallel to the product label. This approach will facilitate the clearest and most legible image.</li>
              <br /><br />
              <li><strong>Center Positioning:</strong> To achieve the best results, ensure that the food label is positioned at the center of the camera frame. This facilitates clear and accurate scanning.</li>
              <br /><br />
              <li><strong>Background Considerations:</strong> It is advisable to avoid backgrounds that contain other elements, particularly text. Such distractions may interfere with the scanning process and reduce accuracy.</li>
              <br /><br />
              <li><strong>Lighting Conditions:</strong> Adequate lighting is crucial for optimal scanning outcomes. Please ensure the area is well-lit to minimize glare. However, be cautious not to create excessive brightness that could hinder the camera's ability to capture the lettering clearly.</li>
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default InfoBox;
