"use client"
import { useState, useRef } from "react";
import CameraButton from "./CameraButton";
import Countdown from "./Countdown";
import CapturedImage from "./CapturedImage";
import QRCodeDisplay from "./QRCodeDisplay";

const CameraCapture = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCountdown = () => {
    setCountdown(3);
    let counter = 3;
    const interval = setInterval(() => {
      counter--;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(interval);
        captureImage();
      }
    }, 1000);
  };

  const startCameraCapture = async () => {
    setStartCamera(true);
    setCapturedImage(null);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    startCountdown();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
      }
      setCapturedImage(canvasRef.current.toDataURL("image/png"));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleDone = () => {
    setShowQRCode(true);
    setTimeout(() => {
      setShowQRCode(false);
      setCapturedImage(null);
      setStartCamera(false);
    }, 5000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {!startCamera && !capturedImage && (
        <div className="absolute w-full h-full">
          <video
            src="/loop_video.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></video>
          <CameraButton onClick={startCameraCapture} />
        </div>
      )}

      {startCamera && !capturedImage && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          {countdown > 0 && <Countdown countdown={countdown} />}
        </div>
      )}

      {capturedImage && (
        <CapturedImage 
          image={capturedImage}
          onRetake={startCameraCapture}
          onDone={handleDone}
        />
      )}

      {showQRCode && <QRCodeDisplay />}
      
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
    </div>
  );
};

export default CameraCapture;
