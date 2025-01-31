"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import cn from "classnames";

export default function KioskApp() {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(3);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const countdown = useRef<NodeJS.Timeout | null>(null);
  const returnToScreensaver = useRef<NodeJS.Timeout | null>(null);

  // Initialize camera feed
  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Ensure the video plays
        }
      } catch (error) {
        setCameraError("Failed to access the camera. Please allow camera permissions.");
        console.error("Camera access error:", error);
      }
    };

    enableCamera();

    // Cleanup camera stream on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (active && timer > 0) {
      countdown.current = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      captureImage();
    }
    return () => {
      if (countdown.current) {
        clearTimeout(countdown.current);
      }
    };
  }, [active, timer]);

  const handleClick = () => {
    setActive(true);
    setTimer(3);
    setCapturedImage(null);
    setShowQRCode(false);
    setShowOptions(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageDataUrl);
      }
    }
    setActive(false);
    setShowOptions(true);
    setTimeout(() => {
      setShowOptions(false);
      setCapturedImage(null);
      setShowQRCode(false);
      // Trigger transition back to screensaver after 5 seconds
      returnToScreensaver.current = setTimeout(() => setActive(false), 5000);
    }, 5000);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowQRCode(false);
    setShowOptions(false);
    setActive(true);
    setTimer(3);
  };

  const handleDone = () => {
    setShowQRCode(true); // Show QR code when "Done" is clicked
    setShowOptions(false); // Hide the options buttons
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black">
      {!active && !capturedImage && (
        <video autoPlay loop muted className="absolute w-full h-full object-cover">
          <source src="/screensaver.mp4" type="video/mp4" />
        </video>
      )}

      {!active && capturedImage && (
        <>
          <Image src={capturedImage} alt="Captured" layout="fill" objectFit="cover" />
          {showQRCode && (
            <div
              className={cn(
                `bg-white absolute scale-75 z-30 p-2 rounded-lg shadow-lg flex flex-col items-center transition-all duration-1000`,
                showQRCode ? "opacity-100 bottom-8" : "opacity-0 -bottom-20"
              )}
            >
              <h2 className="text-md text-black font-bold mb-4">Scan and Download</h2>
              <QRCodeSVG value="http://172.20.10.5:3000" />
            </div>
          )}
          {showOptions && !showQRCode && ( // Only show options if QR code is not visible
            <div className="absolute bottom-10 flex space-x-6">
              <button
                onClick={handleRetake}
                className="px-6 py-3 text-xl bg-white text-black rounded-lg"
              >
                Retake
              </button>
              <button
                onClick={handleDone} // Use handleDone for the "Done" button
                className="px-6 py-3 text-xl bg-white text-black rounded-lg"
              >
                Done
              </button>
            </div>
          )}
        </>
      )}

      {active && (
        <>
          <motion.div
            className="text-white text-6xl font-bold z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {timer > 0 ? timer : "Captured!"}
          </motion.div>
          <video
            ref={videoRef}
            autoPlay
            muted
            className="absolute w-full h-full object-cover z-10"
            playsInline
          />
        </>
      )}

      {!active && !capturedImage && (
        <button onClick={handleClick} className="absolute bottom-10 px-6 py-3 text-xl bg-white text-black rounded-lg z-30">
          Take a Picture
        </button>
      )}

      {cameraError && (
        <div className="absolute top-10 text-red-500 text-lg z-30">
          {cameraError}
        </div>
      )}
    </div>
  );
}