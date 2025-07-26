"use client";
import { Share2 } from 'lucide-react';
import React from 'react';

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className }: ShareButtonProps) {
  // Placeholder/demo values
  const imageUrl = "/images/demo.jpg";
  const cardBlob = new Blob(["Demo card content"], { type: "image/png" });

  const handleShare = async () => {
    try {
      const cardFile = new File([cardBlob], "memory_card.png", { type: "image/png" });
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "image.jpg", { type: imageBlob.type });
      const shareData = {
        title: "Check out these images!",
        text: "I wanted to share these with you",
        files: [imageFile, cardFile],
      };
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const cardUrl = URL.createObjectURL(cardBlob);
        const imgUrl = URL.createObjectURL(imageBlob);
        window.open(cardUrl, "_blank");
        window.open(imgUrl, "_blank");
        setTimeout(() => {
          URL.revokeObjectURL(cardUrl);
          URL.revokeObjectURL(imgUrl);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share the images.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`w-full rounded-2xl py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur bg-white/10 border border-white/20 ${className || ''}`}
    >
      <Share2 className="w-5 h-5 text-white" />
      <span className="text-white font-medium">Share</span>
    </button>
  );
} 