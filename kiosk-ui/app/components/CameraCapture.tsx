import { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw, Check } from "lucide-react";
import cn from "../utils/TailwindMergeAndClsx";

const CameraCapture = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      setCapturedImage(canvasRef.current.toDataURL("image/png"));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
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
          <img src={capturedImage} alt="Captured" className="w-80 h-auto rounded-lg shadow-lg" />
          <div className="mt-4 flex gap-4">
            <button
              className="bg-gray-700 text-white p-3 rounded-full shadow hover:scale-110"
              onClick={startCameraCapture} // Restart countdown and retake photo
            >
              <RefreshCw size={24} />
            </button>
            <button
              className="bg-green-500 text-white p-3 rounded-full shadow hover:scale-110"
              onClick={() => {
                setCapturedImage(null);
                setStartCamera(false); // Return to screensaver
              }}
            >
              <Check size={24} />
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} width={640} height={480} className="hidden" />
    </div>
  );
};

export default CameraCapture;
