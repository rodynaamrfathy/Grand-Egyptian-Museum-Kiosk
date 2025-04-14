"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageFlipProps {
  imageUrl: string;
  cardUrl: string;
}

export default function ImageFlip({ imageUrl, cardUrl }: ImageFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [imageError, setImageError] = useState(false);

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
        {/* Front Side: Post Card */}
        <div className="absolute inset-0 backface-hidden">
          {cardError ? (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span>Card image failed to load</span>
            </div>
          ) : (
            <Image
              src={cardUrl}
              alt="Post Card"
              fill
              className="object-cover shadow-xl"
              priority
              onError={() => setCardError(true)}
            />
          )}
        </div>

        {/* Back Side: Uploaded Image */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {imageError ? (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span>Image failed to load</span>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt="Uploaded"
              fill
              className="object-cover shadow-xl"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}