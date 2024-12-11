import { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import cn from "../utils/TailwindMergeAndClsx";

interface UserCameraProps {
  fullScreen?: boolean;
}

const UserCamera = ({ fullScreen = false }: UserCameraProps) => {
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
    <div className={cn("flex flex-col items-end animate-fadeIn w-full h-screen absolute p-8 justify-end",
    )}>
      <div className={cn("relative brightness-100 saturate-100 contrast-125 z-20 transition-all duration-500",
      fullScreen ? "h-full w-full" : "w-1/3 h-1/3"
      )}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover scale-x-[-1] shadow-black rounded-sm"
        />
      </div>
    </div>
  );
};

export default UserCamera;
