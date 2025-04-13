"use client";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import IconButton from "./IconButton";

interface ShareButtonProps {
  imageUrl: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!imageUrl) {
      alert("No image to share.");
      return;
    }

    if (!navigator.share || !navigator.canShare) {
      alert("Sharing not supported on this browser.");
      return;
    }

    if (isSharing) return;

    try {
      setIsSharing(true);
      
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const file = new File([blob], 'image.png', { type: 'image/png' });
      
      // Check if the file can be shared
      if (!navigator.canShare({ files: [file] })) {
        alert("Sharing files is not supported in this context.");
        return;
      }
      
      // Share the file
      await navigator.share({
        title: "Check out this picture!",
        text: "Look at this amazing image from the Grand Egyptian Museum!",
        files: [file],
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.warn("Share canceled.");
      } else {
        console.error("Error sharing:", error);
        // Fallback to sharing the URL if file sharing fails
        try {
          await navigator.share({
            title: "Check out this picture!",
            text: "Look at this amazing image from the Grand Egyptian Museum!",
            url: imageUrl,
          });
        } catch (urlError) {
          console.error("Error sharing URL:", urlError);
          alert("Failed to share the image.");
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <IconButton icon={FiShare2} label="SHARE" onClick={handleShare} />
  );
};

export default ShareButton;