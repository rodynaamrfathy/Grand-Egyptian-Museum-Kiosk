"use client";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import IconButton from "./IconButton";

interface ShareButtonProps {
  imageUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!imageUrl) {
      alert("No image to share.");
      return;
    }

    if (navigator.share) {
      if (isSharing) {
        return;
      }

      try {
        setIsSharing(true);
        await navigator.share({
          title: "Check out this picture!",
          text: "Look at this amazing image from the Grand Egyptian Museum!",
          url: imageUrl,
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("Share canceled.");
        } else {
          console.error("Error sharing:", error);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <IconButton icon={FiShare2} label="SHARE" onClick={handleShare} />
  );
};

export default ShareButton;
