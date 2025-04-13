"use client";
import React from "react";
import { FiDownload } from "react-icons/fi";
import IconButton from "./IconButton";

interface DownloadButtonProps {
  imageUrl: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
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

      const cardUrl = "/image/card.png";
      await downloadFile(cardUrl, "card.png");
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Failed to download one or more images.");
    }
  };

  return (
    <IconButton icon={FiDownload} label="DOWNLOAD" onClick={handleDownload} />
  );
};

export default DownloadButton;
