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

  const cardUrl = "https://res.cloudinary.com/dynfn6e5m/image/upload/v1744666061/uploads/1744666061594.png";

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
    <div className="relative h-screen bg-black-100 text-white-900 overflow-hidden">
      <VideoBackground />

      <main className="relative z-10 h-full w-full p-4 flex flex-col items-center justify-between">
        <h2 className="text-[4vw] sm:text-[20px] font-medium text-center font-satoshi tracking-[0.22em] pt-2">
          CAPTURE YOUR MEMORY
        </h2>

        <div className="flex-1 flex items-center justify-center w-full max-w-[90vw] my-2 relative">
          {imageWithTextUrl ? (
            <div className="relative w-full h-full max-w-[336px] max-h-[479px] flex items-center justify-center">
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
          <h2 className="text-[5vw] sm:text-[22px] font-bold mb-1 text-left font-satoshi tracking-[0.15em]">
            CLICK!
          </h2>
          <h2 className="text-[5vw] sm:text-[22px] font-medium mb-4 text-left font-satoshi tracking-[0.15em]">
            TO VIEW YOUR IMAGE <br />
            ON THE BACK!
          </h2>

          <div className="flex justify-between">
          {imageWithTextUrl && (
              <ShareButton
              imageUrl={baseImageUrl || ""}
              cardUrl={imageWithTextUrl}
              className="mx-2 font-satoshi text-[4vw] sm:text-[16px] font-normal"
            />            
            )}
            
          {imageWithTextUrl && (
              <DownloadButton
                imageUrl={baseImageUrl || ""}
                cardUrl={cardUrl}
                overlayText={editText}
              />
            )}
            
            <EditButton
              textToEdit={editText}
              onSave={handleTextUpdate}
              className="ml-2 font-satoshi text-[4vw] sm:text-[16px] font-normal"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
