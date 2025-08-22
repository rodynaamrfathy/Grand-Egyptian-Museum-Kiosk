"use client";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShareButton from "./components/ShareButton";
import EditButton from "./components/EditButton";
import { useRemoteImage } from "./hooks/useRemoteImage";
import { useCustomCard } from "./hooks/useCustomCard";
import { useState } from "react";

export default function Home() {
  const { imageBlob, loading, error } = useRemoteImage();
  const [editText, setEditText] = useState("edit text"); // now editable

  const {
    customCardBlob,
    loading: cardLoading,
    error: cardError,
  } = useCustomCard(editText);

  const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;
  const customCardUrl = customCardBlob ? URL.createObjectURL(customCardBlob) : null;

  return (
    <div className="flex flex-col min-h-screen font-cairo">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/dark_mode_background.svg')] bg-cover bg-center pb-50">
        <div className="max-w-md flex flex-col gap-6 mt-8 mx-auto items-center justify-center">
          
          {/* Booth image */}
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
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
              <p className="text-white font-cairo">No image found in URL parameters.</p>
            )}
          </div>

          {/* Custom card */}
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center mt-10">
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
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Buttons */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-black to-transparent font-sans">
        <div className="max-w-md mx-auto space-y-3 flex flex-col items-center">
          <ShareButton />
          <EditButton 
            textToEdit={editText} 
            onSave={(newText) => setEditText(newText)} 
          />
        </div>
      </div>
    </div>
  );
}
