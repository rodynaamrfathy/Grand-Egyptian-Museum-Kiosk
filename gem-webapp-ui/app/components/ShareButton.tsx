"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";

interface ShareButtonProps {
  cardUrl: string;
  imageUrl: string;
  overlayText: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  cardUrl,
  imageUrl,
  overlayText,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const createCardWithText = async (): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = cardUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        // Draw the card image
        ctx.drawImage(img, 0, 0);

        // Calculate dynamic font sizes based on canvas width
        const mainTextSize = Math.floor(canvas.width * 0.09);
        const dateTextSize = Math.floor(canvas.width * 0.030);

        // Add main text
        ctx.font = `bold ${mainTextSize}px 'Mariam', sans-serif`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(overlayText, canvas.width / 2, canvas.height * 0.40);

        // Add date text
        ctx.font = `bold ${dateTextSize}px 'Averia', sans-serif`;
        ctx.fillStyle = "#393939";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.shadowBlur = 4;
        ctx.fillText(getCurrentDate(), canvas.width * 0.82, canvas.height * 0.53);

        // Convert to blob and create file
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas to blob conversion failed"));
            return;
          }
          const file = new File([blob], "memory_card.png", { type: "image/png" });
          resolve(file);
        }, "image/png");
      };

      img.onerror = () => {
        reject(new Error("Failed to load card image"));
      };
    });
  };

  const handleShare = async () => {
    if (isSharing) return;

    try {
      setIsSharing(true);

      // Create the card with text overlay
      const cardWithTextFile = await createCardWithText();

      // Fetch the original image
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "original_image.jpg", { 
        type: imageBlob.type 
      });

      // Check if sharing is supported
      if (!navigator.share || !navigator.canShare) {
        throw new Error("Web Share API not supported");
      }

      // Check if files can be shared
      if (!navigator.canShare({ files: [cardWithTextFile, imageFile] })) {
        throw new Error("Cannot share these files");
      }

      // Share both images
      await navigator.share({
        title: "My GEM Memory",
        text: "Here's what I created at the Grand Egyptian Museum!",
        files: [cardWithTextFile, imageFile],
      });
    } catch (error) {
      console.error("Sharing failed:", error);
      
      // Fallback 1: Try sharing just the card with text
      try {
        const cardWithTextFile = await createCardWithText();
        if (navigator.canShare?.({ files: [cardWithTextFile] })) {
          await navigator.share({
            title: "My GEM Memory Card",
            files: [cardWithTextFile],
          });
          return;
        }
      } catch (e) {
        console.error("Fallback 1 failed:", e);
      }

      // Fallback 2: Try sharing just the URL
      try {
        await navigator.share({
          title: "Check out my GEM Memory",
          text: overlayText,
          url: imageUrl,
        });
      } catch (e) {
        console.error("Fallback 2 failed:", e);
        
        // Final fallback: Copy URL to clipboard
        try {
          await navigator.clipboard.writeText(imageUrl);
          alert("Image URL copied to clipboard!");
        } catch (e) {
          console.error("Clipboard copy failed:", e);
          alert("Sharing failed. Please try another method.");
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <IconButton
      iconPath="/images/Share.svg"
      label="SHARE"
      onClick={handleShare}
    />
  );
};

export default ShareButton;