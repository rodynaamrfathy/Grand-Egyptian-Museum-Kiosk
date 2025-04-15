"use client";
import React from "react";
import IconButton from "./IconButton";

interface DownloadButtonProps {
  cardUrl: string;
  imageUrl: string;
  overlayText: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  cardUrl,
  imageUrl,
  overlayText,
}) => {
  const downloadFile = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  };

  const handleDownload = async () => {
    try {
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      await downloadFile(imageUrl, imageFilename);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = cardUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);

        const fontSize = Math.floor(canvas.width * 0.05);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "rgba(0,0,0,0.7)";
        ctx.shadowBlur = 8;

        ctx.fillText(overlayText, canvas.width / 2, canvas.height / 2);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "card_with_text.png";
          link.click();
          URL.revokeObjectURL(link.href);
        }, "image/png");
      };

      img.onerror = () => {
        alert("Failed to load the card image.");
      };
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Failed to download one or more images.");
    }
  };

  return (
    <IconButton
      iconPath="/images/Download.svg"
      label="DOWNLOAD"
      onClick={handleDownload}
    />
  );
};

export default DownloadButton;
