import { useState, useRef } from "react";
import { Camera, RefreshCw, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import cn from "@/utils/TailwindMergeAndClsx";
import Image from "next/image";


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
          <button
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-orange-500 p-4 rounded-full shadow-lg hover:scale-110 transition-all"
            onClick={startCameraCapture}
          >
            <Camera size={32} className="text-white" />
          </button>
        </div>
      )}

      {startCamera && !capturedImage && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          {countdown > 0 && (
            <div className="absolute text-white text-6xl font-bold">{countdown}</div>
          )}
        </div>
      )}

      {capturedImage && (
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black">
        <Image src={capturedImage} alt="Captured" width={640} height={480} className="rounded-lg shadow-lg" />
        <div className="mt-4 flex gap-4">
            <button
              className="bg-gray-700 text-white p-3 rounded-full shadow hover:scale-110"
              onClick={startCameraCapture} // Restart countdown and retake photo
            >
              <RefreshCw size={24} />
            </button>
            <button
              className="bg-green-500 text-white p-3 rounded-full shadow hover:scale-110"
              onClick={handleDone} // Show QR code then return to screensaver
            >
              <Check size={24} />
            </button>
          </div>
        </div>
      )}

      {showQRCode && (
        <div className={cn(
          "bg-white absolute scale-75 z-30 p-2 rounded-lg shadow-lg flex flex-col items-center transition-all duration-1000 opacity-100 bottom-8"
        )}>
          <h2 className="text-md text-black font-bold mb-4">Scan and Download</h2>
          <QRCodeSVG value="http://172.20.10.5:3000" />
          </div>
      )}

      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
    </div>
  );
};

export default CameraCapture;
