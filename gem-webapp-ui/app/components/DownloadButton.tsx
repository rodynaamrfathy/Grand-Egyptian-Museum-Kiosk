"use client";
import React from "react";

interface DownloadButtonProps {
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = imageUrl.split("/").pop() || "image.jpg"; // Extracts filename or defaults to "image.jpg"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download the image.");
    }
  };

  return (
    <button onClick={handleDownload} className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-3 sm:mb-0">
      Download
    </button>
  );
};

export default DownloadButton;
