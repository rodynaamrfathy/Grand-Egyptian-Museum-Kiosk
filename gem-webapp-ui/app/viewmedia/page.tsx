"use client";
import { useState, useEffect } from "react";
import ShareButton from "../components/ShareButton";
import DownloadButton from "../components/DownloadButton";
import EditButton from "../components/EditButton";
import ImageFlip from "./ImageFlip";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ViewMedia() {
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [imageWithTextUrl, setImageWithTextUrl] = useState<string | null>(null);
  const [editText, setEditText] = useState("Customize Your Memory");

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

      {/* Main content area with flex-grow */}
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/images/dark_mode_background.svg')] dark:bg-[url('/images/light_mode_background.svg')] bg-cover bg-center">
        {/* Marquee Section */}
        <div className="relative w-full overflow-hidden pt-4 pb-0">
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {/* Duplicate content for seamless loop */}
            {[...Array(2)].map((_, idx) => (
              <span
                key={idx}
                className="text-white text-[4vw] sm:text-[26px] md:text-[30px] font-medium font-satoshi tracking-[0.22em] pr-10"
              >
                {Array.from({ length: 20 }, () => "KEEP MEMORIES ALIVE - ").join("")}
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
                    disableShadow
                  />
                </div>
              </div>
            ) : (
              <p className="text-white font-satoshi">Loading image...</p>
            )}

            <h2 className="text-[#E87518] text-[3vw] sm:text-[10px] md:text-[12px] font-bold mt-[-3rem] mb-4 text-center font-satoshi tracking-[0.15em]">
              CLICK ON THE PHOTO TO FLIP
            </h2>
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow" />
        
        {/* Button Section pinned above the Footer */}
        <div className="w-full max-w-md px-4 pb-6">
          <div className="flex justify-between flex-wrap px-1 gap-x-0.5 gap-y-1">
            {imageWithTextUrl && (
              <ShareButton
                imageUrl={baseImageUrl || ""}
                cardUrl={cardUrl}
                overlayText={editText}
                className="mx-2 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
              />
            )}
            {imageWithTextUrl && (
              <DownloadButton
                imageUrl={baseImageUrl || ""}
                cardUrl={cardUrl}
                overlayText={editText}
                className="mx-2 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
              />
            )}
            <EditButton
              textToEdit={editText}
              onSave={handleTextUpdate}
              className="ml-2 font-satoshi text-[5vw] sm:text-[16px] md:text-[18px] font-normal"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
