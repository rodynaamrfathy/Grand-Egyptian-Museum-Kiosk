"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ShareButton from "../components/ShareButton";
import DownloadButton from "../components/DownloadButton"; // Import the DownloadButton
import ImageFlip from "./ImageFlip";

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
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-500 text-white text-center p-5">
        <div className="flex items-center justify-center gap-4">
          <Image src="/images/img-3185-1.png" alt="Logo" width={100} height={100} />
          <h1 className="text-xl font-bold sm:text-2xl">المتحف المصري الكبير</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 flex flex-col items-center">
        {/* Picture Section */}
        <section className="w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-center">Your Picture!</h2>
          <div className="flex justify-center">
            {imageUrl ? (
              <ImageFlip 
              imageUrl={imageUrl} 
              />
            ) : (
              <p>Loading image...</p>
            )}
          </div>
          <div className="flex justify-between mt-3 flex-col sm:flex-row">
            {imageUrl && <DownloadButton imageUrl={imageUrl} />} {/* Use DownloadButton */}
            {imageUrl && <ShareButton imageUrl={imageUrl} />} {/* Use ShareButton */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-5 bg-gray-800 text-white">
        <p>&copy; 2024 المتحف المصري الكبير. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
