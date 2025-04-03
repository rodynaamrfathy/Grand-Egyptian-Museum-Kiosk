"use client";
import React, { useState } from "react";

interface ShareButtonProps {
  imageUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl }) => {
  const [isSharing, setIsSharing] = useState(false);  // Track sharing state

  const handleShare = async () => {
    console.log("navigator.share available:", !!navigator.share);

    if (!imageUrl) {
      alert("No image to share.");
      return;
    }

    if (navigator.share) {
      if (isSharing) {
        console.warn("A share action is already in progress.");
        return; // Prevent share if already in progress
      }

      try {
        setIsSharing(true); // Set sharing in progress
        await navigator.share({
          title: "Check out this picture!",
          text: "Look at this amazing image from the Grand Egyptian Museum!",
          url: imageUrl, // Must be HTTPS
        });
        console.log("Shared successfully!");
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("Share action was canceled by the user.");
        } else {
          console.error("Error sharing:", error);
        }
      } finally {
        setIsSharing(false); // Reset sharing state after completion
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <button onClick={handleShare} className="bg-orange-500 text-white px-4 py-2 rounded-lg" disabled={isSharing}>
      {isSharing ? "Sharing..." : "Share"}
    </button>
  );
};

export default ShareButton;
