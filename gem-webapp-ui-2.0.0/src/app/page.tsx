"use client";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShareButton from "./components/ShareButton";
import EditButton from "./components/EditButton";
import { useRemoteImage } from "./hooks/useRemoteImage";
import { useCustomCard } from "./hooks/useCustomCard";
import { useState, useEffect } from "react";
import EmailPopup from "./components/EmailPopup";
import LottieAnimation from "./components/LottieAnimation"; // ✅ Import

export default function Home() {
  // Image
  const { imageBlob, loading, error } = useRemoteImage();
  // Custom Card
  const [editText, setEditText] = useState("edit text"); 
  const { customCardBlob, loading: cardLoading, error: cardError } = useCustomCard(editText);

  // Email Popup
  const [isEmailEntered, setIsEmailEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isEmailEntered ? "auto" : "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, [isEmailEntered]);

  // Blob URLs
  const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;
  const customCardUrl = customCardBlob ? URL.createObjectURL(customCardBlob) : null;

  return (
    <div className="flex flex-col min-h-screen font-cairo relative">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/dark_mode_background.svg')] bg-cover bg-center pb-50">
        <div className="max-w-md flex flex-col gap-6 mt-8 mx-auto items-center justify-center">
          
          {/* Image Section */}
          <div className="relative bg-transparent rounded-2xl p-4 flex flex-col items-center">
            {/* ✅ Show animation only if blobUrl exists */}
            {blobUrl && (
              <div className="absolute top-0 left-0 right-0 flex justify-center items-center z-20">
                <LottieAnimation />
              </div>
            )}

            {loading && <p className="text-white font-cairo">Loading image...</p>}
            {error && <p className="text-red-500 font-cairo">Error: {error}</p>}
            {blobUrl ? (
              <Image
                src={blobUrl}
                alt="Loaded from URL"
                width={400}
                height={250}
                className="rounded-xl object-cover"
              />
            ) : (
              <p className="text-white font-cairo text-center">
                Your Image will appear here!, might be a connection error check again later.
              </p>
            )}
            <p className="text-[#E87518] mt-4 text-xl sm:text-l md:text-xl font-bold text-center w-full">
              Long Press on Image to download!
            </p>
          </div>

          {/* Custom Card Section */}
          <div className="relative bg-transparent rounded-2xl p-4 flex flex-col items-center mt-1">
            {/* ✅ Show animation only if customCardUrl exists */}
            {customCardUrl && (
              <div className="absolute bottom-0 left-50 right-0 flex justify-center items-center z-20">
                <LottieAnimation />
              </div>
            )}

            {cardLoading && <p className="text-white font-cairo">Loading card template...</p>}
            {cardError && <p className="text-red-500 font-cairo">Error: {cardError}</p>}
            {customCardUrl ? (
              <Image
                src={customCardUrl}
                alt="Custom card with text"
                width={400}
                height={250}
                className="rounded-xl object-cover"
              />
            ) : (
              <p className="text-white font-cairo">Generating card...</p>
            )}
            <p className="text-[#E87518] mt-4 text-xl sm:text-l md:text-xl font-bold text-center w-full">
              Long Press on Image to download!
            </p>
          </div>
        </div>
      </main>
      <Footer />

      {/* Share Button & Edit Button */}
      <div className="fixed bottom-5 left-0 right-0 z-30 p-6 from-black to-transparent font-sans">
        <div className="max-w-md mx-auto space-y-3 flex flex-col items-center">
          {imageBlob && customCardBlob && (
            <ShareButton
              imageUrl={URL.createObjectURL(imageBlob)}
              cardBlob={customCardBlob}
            />
          )}
          <EditButton
            textToEdit={editText}
            onSave={(newText) => setEditText(newText)}
          />
        </div>
      </div>

      {/* Email Popup */}
      {!isEmailEntered && (
        <EmailPopup
          onSubmit={() => setIsEmailEntered(true)}
          imageName="booth_image.png"
          cardName="custom_card.png"
          kioskName="Ramses"
          filterName="default"
        />
      )}
    </div>
  );
}
