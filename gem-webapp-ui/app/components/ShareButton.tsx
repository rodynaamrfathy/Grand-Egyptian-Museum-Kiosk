"use client";
import React from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";


interface ShareButtonProps {
  cardBlob: Blob;
  imageUrl: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ cardBlob, imageUrl }) => {
  const handleShare = async () => {
    try {
      const cardFile = new File([cardBlob], "memory_card.png", { type: "image/png" });

      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "image.jpg", { type: imageBlob.type });

      const shareData = {
        title: "Check out these images!",
        text: "I wanted to share these with you",
        files: [cardFile, imageFile],
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const cardUrl = URL.createObjectURL(cardBlob);
        const imgUrl = URL.createObjectURL(imageBlob);

        window.open(cardUrl, "_blank");
        window.open(imgUrl, "_blank");

        setTimeout(() => {
          URL.revokeObjectURL(cardUrl);
          URL.revokeObjectURL(imgUrl);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share the images.");
    }
  };
  const { t } = useTranslation();

  return (
    <IconButton
      iconPath="/images/Share.svg"
      label={t("buttons.share")}
      onClick={handleShare}
    />
  );
};

export default ShareButton;
