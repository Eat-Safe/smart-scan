import React, { useRef, useState, useEffect } from 'react';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } else {
        alert("Your browser does not support user media or it is disabled.");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Error accessing camera. Please ensure it is not being used by another application and that you have given permission.");
    }
  };

  const takePicture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error("Failed to get canvas context");
      return;
    }
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');
    setImageSrc(imageDataUrl);
    setIsVideoVisible(false); // Hide the video element after taking the picture
    if (imageDataUrl) {
      onCapture(imageDataUrl);
    }
  };
//USED IMAGE UPLOAD BUTTON on take picture
  return (
    <div>
      {isVideoVisible && <video ref={videoRef} autoPlay style={{ width: '100%' }}></video>}
      <button className="image-upload-button" onClick={takePicture}>Take Picture</button>
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '100%' }} />}
    </div>
  );
};

export default WebcamCapture;