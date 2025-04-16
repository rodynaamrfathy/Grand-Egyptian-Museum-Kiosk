"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageFlipProps {
  imageUrl: string;
  cardUrl: string;
  overlayText: string;
}

export default function ImageFlip({ imageUrl, cardUrl, overlayText }: ImageFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");

// Format current date as "DD.MM.YYYY"
useEffect(() => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits (e.g., "05")
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`; // "DD.MM.YYYY" format
  setCurrentDate(formattedDate);
}, []);

  useEffect(() => {
    if (manualFlip) return;

    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [manualFlip]);

  const handleClick = () => {
    setFlipped((prev) => !prev);
    setManualFlip(true);
  };

  return (
    <div
      className="w-full h-full mx-auto cursor-pointer perspective"
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-[1500ms] transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side: Card with text */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full relative">
            {!cardError && (
              <Image
                src={cardUrl}
                alt="Post Card"
                fill
                className="object-contain shadow-xl max-h-[90%] max-w-[90%] m-auto"
                priority
                onError={() => setCardError(true)}
              />
            )}
            {cardError && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span>Card image failed to load</span>
              </div>
            )}
            <div className="absolute top-[-18%] inset-0 flex items-center justify-center px-4">
              <p className="font-mariam text-white text-center text-[1.4rem] sm:text-[1.5rem] md:text-[2rem] font-bold drop-shadow-lg">
                {overlayText}
              </p>
            </div>
            {/* Date Overlay */}
            <div className="font-averia absolute bottom-[45%] right-[20%] text-[#393939] text-[0.7rem] sm:text-[1rem] md:text-[1.5rem] font-bold drop-shadow-lg">
              {currentDate}
            </div>
          </div>
        </div>

        {/* Back Side: Uploaded Image */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {!imageError && (
            <Image
              src={imageUrl}
              alt="Uploaded"
              fill
              className="object-contain shadow-xl max-h-[90%] max-w-[90%] m-auto"
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span>Image failed to load</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
