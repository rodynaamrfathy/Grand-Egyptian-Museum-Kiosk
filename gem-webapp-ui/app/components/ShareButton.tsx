"use client";
import React from "react";
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
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const createCardWithText = async (): Promise<Blob> => {
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
        ctx.fillText(getCurrentDate(), canvas.width * 0.82, canvas.height * 0.53);

        // Convert to blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Could not create blob from canvas"));
            return;
          }
          resolve(blob);
        }, "image/png");
      };

      img.onerror = () => {
        reject(new Error("Failed to load the card image."));
      };
    });
  };

  const handleShare = async () => {
    try {
      // Create the card with text
      const cardBlob = await createCardWithText();
      const cardFile = new File([cardBlob], "memory_card.png", { type: "image/png" });

      // Fetch the original image
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      const imageFile = new File([imageBlob], imageFilename, { type: imageBlob.type });

      // Prepare share data
      const shareData = {
        title: "Check out these images!",
        text: "I wanted to share these with you",
        files: [cardFile, imageFile],
      };

      // Use Web Share API if available
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support sharing files
        const cardUrl = URL.createObjectURL(cardBlob);
        const imageUrl = URL.createObjectURL(imageBlob);
        
        // Open new window with both images or implement your own fallback
        window.open(cardUrl, '_blank');
        window.open(imageUrl, '_blank');
        
        // Clean up
        setTimeout(() => {
          URL.revokeObjectURL(cardUrl);
          URL.revokeObjectURL(imageUrl);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share the images. " + (error instanceof Error ? error.message : String(error)));
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