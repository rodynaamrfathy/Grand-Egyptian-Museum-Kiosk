// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";

interface UserCameraProps {
  fullScreen?: boolean;
  capture?: boolean;
}

const UserCamera = ({ fullScreen = false, capture = false }: UserCameraProps) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 500 },
          height: { ideal: 500 },
          facingMode: "user",
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
        setIsPaused(false);
        setError(null);
      }
    } catch (err) {
      setIsStreamActive(false);
      setError(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setIsStreamActive(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Flip the image horizontally to match the mirrored video
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);
    
    // Draw the current frame
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the captured frame data
    const imageData = canvas.toDataURL('image/png');
    console.log(imageData);
    
    setIsPaused(true);
    return imageData;
  };

  useEffect(() => {
    if (capture && isStreamActive) {
      // Wait 5s then capture the image
      const timer = setTimeout(() => {
        const imageData = captureFrame();
        // You can handle the captured image data here
        // For example, send it to a server or store it
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [capture, isStreamActive]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-end animate-fadeIn w-full h-screen absolute p-8 justify-end">
      <div className={`relative brightness-100 saturate-100 contrast-125 z-20 transition-all duration-500 ${
        fullScreen ? "h-full w-full" : "w-1/3 h-1/3"
      }`}>
        {!isPaused && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover scale-x-[-1] shadow-black rounded-sm"
          />
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover shadow-black rounded-sm ${isPaused ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  );
};

export default UserCamera;