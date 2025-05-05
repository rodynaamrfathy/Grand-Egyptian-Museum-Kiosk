"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageFlipProps {
  imageUrl: string;
  cardImageUrl: string; // Now passed as pre-rendered card blob URL
  overlayText: string;
  currentDate: string;
}

export default function ImageFlip({ imageUrl, cardImageUrl }: ImageFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (manualFlip) return;
    const interval = setInterval(() => setFlipped(prev => !prev), 3000);
    return () => clearInterval(interval);
  }, [manualFlip]);

  const handleClick = () => {
    setFlipped(prev => !prev);
    setManualFlip(true);
  };

  return (
    <div className="w-full h-full mx-auto cursor-pointer perspective" onClick={handleClick}>
      <div className={`relative w-full h-full transition-transform duration-[1500ms] transform-style preserve-3d ${flipped ? "rotate-y-180" : ""}`}>


        {/* Font Side: Original uploaded image */}
        <div className="absolute inset-0 backface-hidden">
          {!imageError ? (
            <Image
              src={imageUrl}
              alt="Uploaded"
              fill
              className="object-contain shadow-xl max-h-[90%] max-w-[90%] ml-auto mr-auto mb-2 mt-2"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span>Image failed to load</span>
            </div>
          )}
        </div>

        {/* back Side: Pre-rendered card image */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full relative">
            {!cardError ? (
              <Image
                src={cardImageUrl}
                alt="Post Card"
                fill
                className="object-contain shadow-xl max-h-[90%] max-w-[90%] m-auto mb-2 mt-2"
                priority
                onError={() => setCardError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span>Card image failed to load</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
