import React, { useRef, useState, useEffect } from 'react';
import RetakePhoto from './RetakePhoto';
import FileUpload from './FileUpload';

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void; // prop to handle the captured image
}

// The WebcamCapture component takes a single prop: onCapture, which is a function that gets called with the captured image's data URL
const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImage(e.target.result);
        }
      };
      
      reader.readAsDataURL(event.target.files[0]);
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
//Take out the , transform: 'scaleX(-1)' to invert the stream
  return (
    <div>
      {isVideoVisible && <video ref={videoRef} autoPlay style={{ width: '95%', transform: 'scaleX(-1)', paddingTop: '2%'}}></video>}
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ width: '95%', paddingTop: '2%'}} />}
      <div className ="button-container" >
      <FileUpload onFileSelect={handleImageChange} />
      <RetakePhoto />
      <button className="button-style" onClick={takePicture}>Take Picture</button>
      </div>
    </div>
  );
};

export default WebcamCapture;