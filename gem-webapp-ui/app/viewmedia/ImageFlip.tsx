"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageFlip({ imageUrl }: { imageUrl: string }) {
  const [flipped, setFlipped] = useState(false);
  const [manualFlip, setManualFlip] = useState(false); // To override auto if user clicks

  useEffect(() => {
    if (manualFlip) return; // Stop auto flipping after manual interaction

    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000); // Flip every 3 seconds

    return () => clearInterval(interval);
  }, [manualFlip]);

  const handleClick = () => {
    setFlipped((prev) => !prev);
    setManualFlip(true); // Stop auto flipping
  };

  return (
    <div className="w-full max-w-sm perspective" onClick={handleClick}>
      <div
        className={`relative w-full h-64 transition-transform duration-[1500ms] transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src="/images/card.png"
            alt="Post Card"
            layout="fill"
            className="object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Back Side (Uploaded Image) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <Image
            src={imageUrl}
            alt="Uploaded"
            layout="fill"
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
