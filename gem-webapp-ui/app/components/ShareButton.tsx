"use client";
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import IconButton from "./IconButton";

interface ShareButtonProps {
  imageUrl: string;      // user image with overlay text
  cardUrl: string;       // card image without text
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ imageUrl, cardUrl }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!imageUrl || !cardUrl) {
      alert("Missing images to share.");
      return;
    }

    if (!navigator.share || !navigator.canShare) {
      alert("Sharing is not supported on this browser.");
      return;
    }

    if (isSharing) return;

    try {
      setIsSharing(true);

      // Fetch both images
      const [textImgRes, cardImgRes] = await Promise.all([
        fetch(imageUrl),
        fetch(cardUrl),
      ]);

      const [textBlob, cardBlob] = await Promise.all([
        textImgRes.blob(),
        cardImgRes.blob(),
      ]);

      // Now corrected: card is plain, image has overlay text
      const textImageFile = new File([textBlob], "memory-with-text.png", { type: "image/png" });
      const plainCardFile = new File([cardBlob], "museum-card.png", { type: "image/png" });

      if (!navigator.canShare({ files: [textImageFile, plainCardFile] })) {
        alert("Sharing multiple files is not supported on this device.");
        return;
      }

      await navigator.share({
        title: "My GEM Memory",
        text: "Here's what I created at the Grand Egyptian Museum!",
        files: [textImageFile, plainCardFile],
      });
    } catch (error) {
      console.error("Sharing failed:", error);
      try {
        await navigator.share({
          title: "Check this out!",
          url: imageUrl,
        });
      } catch {
        try {
          await navigator.clipboard.writeText(imageUrl);
          alert("Image URL copied to clipboard!");
        } catch {
          alert("Failed to share or copy.");
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return <IconButton icon={FiShare2} label="SHARE" onClick={handleShare} />;
};

export default ShareButton;
