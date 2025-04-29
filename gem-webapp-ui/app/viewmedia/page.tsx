"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ShareButton from "../components/ShareButton";
import DownloadButton from "../components/DownloadButton";
import EditButton from "../components/EditButton";
import ImageFlip from "./ImageFlip";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../../lib/i18n"; 

export default function ViewMedia() {
  const { t } = useTranslation();

  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [imageWithTextUrl, setImageWithTextUrl] = useState<string | null>(null);
  const [editText, setEditText] = useState(t("edit.defaultText"));

  const cardUrl = "https://res.cloudinary.com/dynfn6e5m/image/upload/v1744844090/card1_rfpr2p.png";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrlFromUrl = urlParams.get("image");
    if (imageUrlFromUrl) {
      setBaseImageUrl(imageUrlFromUrl);
      setImageWithTextUrl(getCloudinaryImageWithText(cardUrl, editText));
    }
  }, [editText]);

  const getCloudinaryImageWithText = (baseUrl: string, text: string): string => {
    const encodedText = encodeURIComponent(text);
    const overlay = `l_text:arial_40:${encodedText},co_rgb:ffffff,g_center,y_30/fl_layer_apply`;
    return baseUrl.replace("/upload/", `/upload/${overlay}/`);
  };

  const handleTextUpdate = (newText: string) => {
    setEditText(newText);
    if (baseImageUrl) {
      const newUrl = getCloudinaryImageWithText(baseImageUrl, newText);
      setImageWithTextUrl(newUrl);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/images/dark_mode_background.svg')] bg-cover bg-center">
        {/* Marquee Section */}
        <div className="relative w-full overflow-hidden pt-4 pb-0">
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <span
                key={idx}
                className="text-white text-[4vw] sm:text-[26px] md:text-[30px] font-medium font-satoshi tracking-[0.22em] pr-10"
              >
                {Array.from({ length: 20 }, () => `${t("marquee.keepMemories")} - `).join("")}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center w-full px-4">
          <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[380px] md:max-w-[500px]">
            {imageWithTextUrl ? (
              <div className="relative w-full aspect-[0.5968] flex items-center justify-center">
                <div className="w-full h-full">
                  <ImageFlip
                    imageUrl={baseImageUrl || ""}
                    cardUrl={cardUrl}
                    overlayText={editText}
                  />
                </div>
              </div>
            ) : (
              <p className="text-white font-satoshi">{t("loading")}</p>
            )}

            <h2 className="text-[#E87518] text-[3vw] sm:text-[10px] md:text-[12px] font-bold mt-[-3rem] mb-4 text-center font-satoshi tracking-[0.15em]">
              {t("flipInstruction")}
            </h2>
          </div>
        </div>

        <div className="flex-grow" />

        <div className="w-full max-w-md px-12 pb-0 mt-5px">
        <div className="flex justify-between flex-wrap px-1 gap-x-[2px] gap-y-[4px]">
          {imageWithTextUrl && (
            <ShareButton
              imageUrl={baseImageUrl || ""}
              cardUrl={cardUrl}
              overlayText={editText}
              className="mx-1 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
            />
          )}
          {imageWithTextUrl && (
            <DownloadButton
              imageUrl={baseImageUrl || ""}
              cardUrl={cardUrl}
              overlayText={editText}
              className="mx-1 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
            />
          )}
          <EditButton
            textToEdit={editText}
            onSave={handleTextUpdate}
            className="mx-1 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
          />
        </div>
      </div>

      </main>

      <Footer />
    </div>
  );
}
