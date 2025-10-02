"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface FlippableCardProps {
  frontImageUrl: string | null;
  backImageUrl: string | null;
  width?: number; // px
  height?: number; // px
}

export default function FlippableCard({
  frontImageUrl,
  backImageUrl,
  width = 400,
  height = 600,
}: FlippableCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [autoFlip, setAutoFlip] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Automatic flipping every 3 seconds
  useEffect(() => {
    if (autoFlip) {
      intervalRef.current = window.setInterval(() => {
        setFlipped((prev) => !prev);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoFlip]);

  // Handle manual flip
  const handleClick = () => {
    setFlipped((prev) => !prev);
    setAutoFlip(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Image fallback
  const renderImage = (src: string | null, alt: string) => {
    if (!src) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#555",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            borderRadius: "12px",
          }}
        >
          {alt} not available might be a connection error check again later
        </div>
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl object-cover shadow-lg w-full h-full"
      />
    );
  };

  return (
    <div
      className="cursor-pointer"
      style={{
        perspective: "1000px",
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          {renderImage(frontImageUrl, "Front Image")}
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {renderImage(backImageUrl, "Back Image")}
        </div>
      </div>
    </div>
  );
}
