"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageFlip({ imageUrl }: { imageUrl: string }) {
  const [flipped, setFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false);

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
          <Image
            src="/images/card.png"
            alt="Post Card"
            fill
            className="object-cover shadow-xl"
            priority
          />
        </div>

        {/* Back Side: Uploaded Image */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Image
            src={imageUrl}
            alt="Uploaded"
            fill
            className="object-cover shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}