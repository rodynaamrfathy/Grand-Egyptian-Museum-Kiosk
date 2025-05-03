"use client";
import React from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";


interface DownloadButtonProps {
  cardBlob: Blob;
  imageUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ cardBlob, imageUrl }) => {
  const downloadFile = async (blob: Blob, filename: string) => {
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
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      await downloadFile(imageBlob, imageFilename);
      await downloadFile(cardBlob, "memory_card.png");
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
