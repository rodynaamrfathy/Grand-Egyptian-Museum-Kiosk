import { Camera, Undo2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import GEMLOGO from "@/media/GEM LOGO.png";
import Image from "next/image";
import countdown from "@/media/countdown.gif";

interface CameraCaptureProps {
  onStartCameraCapture(): void;
  doStartCamera: boolean;
  capture: boolean;
}

const CameraCapture = ({
  onStartCameraCapture,
  doStartCamera,
  capture = false,
}: CameraCaptureProps) => {
    const [startCamera, setStartCamera] = useState(false);
    const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (capture) {
      // Start 5s countdown then capture
      setTimeout(() => {
        capturedImage();
      }, 5000);
    }
  }, [capture]);



  useEffect(() => {
    if (capture) {
      // Start 5s countdown then capture
      setTimeout(() => {
        capturedImage();
      }, 5000);
    }
  }, [capture]);

  useEffect(() => {
    if (doStartCamera) {
      startCameraCapture();
    }
  }, [doStartCamera]);

  const startCameraCapture = () => {
    onStartCameraCapture();
    setStartCamera(true);
  };

  const capturedImage = () => {
    setShowCountdown(false); // Remove countdown after capture
  };

  return (
    <>
      {!startCamera && (
        <div
          className="absolute z-20 w-20 rounded-r-full h-12 bg-[#ea7204] animate-pulse hover:opacity-15 left-0 bottom-8 flex justify-center items-center"
          onClick={startCameraCapture}
        >
          <Camera />
        </div>
      )}
      {startCamera && (
        <>
          <div className="absolute h-screen w-full from-white to-[#ea7204] bg-gradient-to-t"></div>
          <div
            className="absolute z-20 w-20 rounded-r-full h-12 bg-[#ea7204] hover:opacity-15 left-0 bottom-24 flex justify-center items-center"
            onClick={() => {
              window.location.reload();
            }}
          >
            <Undo2 />
          </div>
          <Image
            src={GEMLOGO}
            alt=""
            className="w-20 h-20 bottom-12 right-12 absolute z-20"
          />
          {showCountdown && (
            <Image
              src={countdown}
              alt=""
              className="w-80 object-contain left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-20"
            />
          )}
        </>
      )}
    </>
  );
};

export default CameraCapture;
