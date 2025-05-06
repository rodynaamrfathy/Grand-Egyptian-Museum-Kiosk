"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";
import JSZip from "jszip";


interface DownloadButtonProps {
  firstInput: Blob;
  blobInput: Blob;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  firstInput,
  blobInput,
}) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");

  const handleDownload = async () => {
    try {
      setStatus("downloading");
  
      const zip = new JSZip();
      zip.file("photo.png", firstInput);
      zip.file("card.png", blobInput);
  
      const zipBlob = await zip.generateAsync({ type: "blob" });
  
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "YourGemMemory.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  
      setStatus("done");
      setTimeout(() => setStatus("idle"), 10000);
    } catch (error) {
      console.error("Download error:", error);
      setStatus("idle");
    }
  };

  return (
    <>
      <IconButton
        iconPath="/images/Download.svg"
        label={t("buttons.download")}
        onClick={handleDownload}
      />

      {status !== "idle" && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-3 rounded-xl z-50 shadow-lg text-lg">
          {status === "downloading"
            ? t("status.downloading")
            : t("status.downloaded")}
        </div>
      )}
    </>
  );
};

export default DownloadButton;
