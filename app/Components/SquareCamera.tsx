import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";

const UserCamera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isStreamActive, setIsStreamActive] = useState(false);

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
        setError(null);
      }
    } catch (err) {
      setIsStreamActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-end justify-end animate-fadeIn w-full h-screen absolute p-2">
      <div className="relative w-1/3 h-1/3 brightness-100 saturate-100 contrast-100 overflow-hidden shadow-lg z-20">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
      </div>
    </div>
  );
};

export default UserCamera;
