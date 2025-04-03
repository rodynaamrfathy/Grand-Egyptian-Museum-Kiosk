"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL

  useEffect(() => {
    // Extract the image URL from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const queryImageUrl = urlParams.get("image");

    if (queryImageUrl) {
      setImageUrl(queryImageUrl); // Set the image URL
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-500 text-white text-center p-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Image src="/images/img-3185-1.png" alt="Logo" width={100} height={100} />
          <h1 className="text-xl font-bold sm:text-2xl">Grand Egyptian Museum</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="space-y-6 text-center sm:space-y-0 sm:flex sm:gap-8 sm:flex-row">
          {/* View Media Button */}
          <Link
            href={imageUrl ? `/viewmedia?image=${imageUrl}` : "/"} // Dynamically set the URL if imageUrl is available
            className="flex items-center justify-center text-white bg-orange-500 w-32 h-32 text-lg font-bold rounded-full shadow-lg transition hover:bg-orange-700"
          >
            View Media
          </Link>

          {/* Talk to Ramses Button */}
          <Link
            href="/talk-to-ramses"
            className="flex items-center justify-center text-white bg-blue-500 w-32 h-32 text-lg font-bold rounded-full shadow-lg transition hover:bg-blue-700"
          >
            Talk to Ramses
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-5 bg-gray-800 text-white">
        <p>&copy; 2024 المتحف المصري الكبير. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
