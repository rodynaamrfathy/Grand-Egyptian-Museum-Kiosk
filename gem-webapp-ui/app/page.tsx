"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    // Extract the image URL from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get("image");

    if (imageUrl) {
      // Extract the image name from the image URL
      const name = imageUrl.split('/').pop();
      setImageName(name || "");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-500 text-white text-center p-5">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Image src="/images/img-3185-1.png" alt="Logo" width={100} height={100} />
          <h1 className="text-xl font-bold sm:text-2xl"> Grand Egyptian Museum</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="space-y-6 text-center sm:space-y-0 sm:flex sm:gap-8 sm:flex-row">
          {/* View Media Button */}
          <Link
            // Send the image URL as a query parameter to viewmedia
            href={`/viewmedia?image=http://172.20.10.5:3000/uploads/${imageName}`}
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
