"use client";
import React from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";

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
  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

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
      // Download original image
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      await downloadFile(imageUrl, imageFilename);

      // Create card with text and date
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = cardUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Draw the card image
        ctx.drawImage(img, 0, 0);

        // Add text shadow styles
        //ctx.shadowColor = "rgba(0,0,0,0.7)";
        //ctx.shadowBlur = 8;

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
        ctx.shadowBlur = 4; // Less shadow for date
        ctx.fillText(getCurrentDate(), canvas.width * 0.82, canvas.height * 0.53);

        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (!blob) return;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "memory_card.png";
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

  const { t } = useTranslation();
  
  return (
  <IconButton
    iconPath="/images/Download.svg"
    label={t("buttons.download")}
    onClick={handleDownload}
  />
  );
};

export default DownloadButton;