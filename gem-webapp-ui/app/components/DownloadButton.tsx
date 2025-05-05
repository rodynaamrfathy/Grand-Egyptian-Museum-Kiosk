"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";

interface DownloadButtonProps {
  imageUrl: string;
  cardBlob: Blob;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ cardBlob, imageUrl }) => {
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");

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
      setStatus("downloading");

      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFilename = imageUrl.split("/").pop() || "image.jpg";
      
      await downloadFile(imageBlob, imageFilename);

      setTimeout(async () => {
        await downloadFile(cardBlob, "memory_card.png");
        setStatus("done");
        setTimeout(() => setStatus("idle"), 2000);
      }, 500);
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Failed to download one or more images.");
      setStatus("idle");
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <IconButton
        iconPath="/images/Download.svg"
        label={t("buttons.download")}
        onClick={handleDownload}
      />

      {/* Overlay Popup */}
      {status !== "idle" && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-xl z-50 shadow-lg text-lg">
          {status === "downloading" ? t("status.downloading") : t("status.downloaded")}
        </div>
      )}
    </>
  );
};

export default DownloadButton;
