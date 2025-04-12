"use client";
import React from "react";

interface DownloadButtonProps {
  imageUrl: string;
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
      // Download the main image
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      await downloadFile(imageUrl, imageFilename);

      // Download card.png from public folder
      const cardUrl = "/image/card.png";
      await downloadFile(cardUrl, "card.png");
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Failed to download one or more images.");
    }
  };

  return (
    <button onClick={handleDownload} className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-3 sm:mb-0">
      Download
    </button>
  );
};

export default DownloadButton;
