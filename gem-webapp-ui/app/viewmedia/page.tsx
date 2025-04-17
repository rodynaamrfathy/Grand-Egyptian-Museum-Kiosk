"use client";
import { useState, useEffect } from "react";
import ShareButton from "../components/ShareButton";
import DownloadButton from "../components/DownloadButton";
import EditButton from "../components/EditButton";
import ImageFlip from "./ImageFlip";
import VideoBackground from "../components/VideoBackground";

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
    <div className="relative h-screen bg-black-100 text-white-900 px-4">
      <VideoBackground />

      <main className="relative z-10 h-full w-full flex flex-col items-center justify-between">
        <h2 className="text-[4vw] sm:text-[20px] md:text-[24px] font-medium text-center font-satoshi tracking-[0.22em] pt-2">
        <br />
          CAPTURE YOUR MEMORY
          <br />
        </h2>

        <div className="flex-1 flex items-center justify-center w-full max-w-[80vw] my-2 relative">
          {imageWithTextUrl ? (
            <div className="relative w-full max-w-[300px] aspect-[0.5968] flex items-center justify-center mx-auto">
              <div className="absolute w-[90%] h-[90%] inset-0 bg-black/50 transform translate-y-[4px] blur-[24.5px] scale-[1.2] -z-10 rounded-lg" />

              <div className="w-full h-full">
                <ImageFlip
                  imageUrl={baseImageUrl || ""}
                  cardUrl={cardUrl}
                  overlayText={editText}
                />
              </div>
            </div>
          ) : (
            <p className="text-white font-satoshi">Loading image...</p>
          )}
        </div>

        <div className="w-full max-w-md px-4 pb-4">
          <h2 className="text-[5vw] sm:text-[20px] md:text-[22px] font-bold mb-1 text-left font-satoshi tracking-[0.15em] px-5">
            CLICK!<br />
          </h2>
          <h2 className="text-[4vw] sm:text-[20px] md:text-[22px] font-medium mb-4 text-left font-satoshi tracking-[0.15em] px-5">
            TO VIEW YOUR IMAGE <br />
            ON THE BACK!
          </h2>

          <div className="flex justify-between flex-wrap px-4">
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
    </div>
  );
}
