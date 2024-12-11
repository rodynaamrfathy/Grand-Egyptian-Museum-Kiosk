import { Camera, Undo2 } from "lucide-react";
import { useState, useEffect } from "react";
import GEMLOGO from "@/media/GEM LOGO.png";
import Image from "next/image";
import countdown from "@/media/countdown.gif";
import QRCode, { QRCodeSVG } from "qrcode.react"; // Correct import
import cn from "../utils/TailwindMergeAndClsx";

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
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code display

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
    setTimeout(() => {
      setShowQRCode(true); // Show QR code after capture
    }, 2000);
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
          <div className={cn(`bg-white absolute scale-75 z-30 p-2 rounded-lg shadow-lg flex flex-col items-center transition-all duration-1000`,
            showQRCode ? 'opacity-100 bottom-8' : 'opacity-0 -bottom-20'
          )}>
            <h2 className="text-md text-black font-bold mb-4">
              Scan and Download
            </h2>
            <QRCodeSVG value="https://visit-gem.com/en/GEMIntro" />,
          </div>
        </>
      )}
    </>
  );
};

export default CameraCapture;
