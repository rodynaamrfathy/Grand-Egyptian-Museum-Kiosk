"use client";

import { useState, useEffect } from "react";
import ShareButton from "../components/ShareButton";
import DownloadButton from "../components/DownloadButton";
import EditButton from "../components/EditButton";
import ImageFlip from "./ImageFlip";
import VideoBackground from "../components/VideoBackground";

export default function ViewMedia() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrlFromUrl = urlParams.get("image");
    if (imageUrlFromUrl) {
      setImageUrl(imageUrlFromUrl);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black-100 text-white-900">
      <VideoBackground />
      
      <main className="relative z-10 flex-1 p-5 flex flex-col items-center mt-10">
        {/* Title - Medium 20px */}
        <h2 className="text-[20px] font-medium mb-6 text-center font-satoshi tracking-[0.22em]">
          CAPTURE YOUR MEMORY
        </h2>

        <div className="w-full max-w-md flex justify-center mb-8 relative">
          {imageUrl ? (
            <div className="relative">
              {/* Shadow box */}
              <div className="absolute w-[336px] h-[479px] inset-0 bg-black/50 transform translate-y-[4px] blur-[24.5px] scale-[1.2] -z-10 rounded-lg" />
              
              {/* Image */}
              <div className="">
              <ImageFlip imageUrl={imageUrl} />
              </div>
            </div>
          ) : (
            <p className="text-white font-satoshi">Loading image...</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md px-7">
          {/* Bold 22px */}
          <h2 className="text-[22px] font-bold mb-1 text-left font-satoshi tracking-[0.15em]">
            CLICK!
          </h2>
          {/* Medium 22px */}
          <h2 className="text-[22px] font-medium mb-6 text-left font-satoshi tracking-[0.15em]">
            TO VIEW YOUR IMAGE <br/>
            ON THE BACK!
          </h2>
          
          {/* Buttons - Regular 16px */}
          <div className="flex justify-between mt-4">
            {imageUrl && (
              <DownloadButton 
                imageUrl={imageUrl} 
                className="mr-2 font-satoshi text-[16px] font-normal" 
              />
            )}
            {imageUrl && (
              <ShareButton 
                imageUrl={imageUrl} 
                className="mx-2 font-satoshi text-[16px] font-normal" 
              />
            )}
            <EditButton className="ml-2 font-satoshi text-[16px] font-normal" />
          </div>
        </div>
      </main>
    </div>
  );
}