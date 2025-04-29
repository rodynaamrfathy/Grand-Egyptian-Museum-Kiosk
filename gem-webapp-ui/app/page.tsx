"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SlidingBanner from "./components/SlidingBanner";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [animateButtons, setAnimateButtons] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryImageUrl = urlParams.get("image");
    if (queryImageUrl) {
      setImageUrl(queryImageUrl);
    }

    const timeout = setTimeout(() => {
      setAnimateButtons(false);
    }, 3150);

    return () => clearTimeout(timeout);
  }, []);

  const handlePhotoBoothClick = (e: React.MouseEvent) => {
    if (!imageUrl) {
      e.preventDefault();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {showAlert && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white z-50 p-6">
          <div className="bg-gray-800 rounded-2xl w-[60%] p-6 flex flex-col items-center relative">
            <button onClick={() => setShowAlert(false)} className="absolute top-2 right-2 text-white text-2xl font-bold">&times;</button>
            <Image src="/images/photo-booth-banner.png" alt="Photo Booth" width={200} height={150} />
            <p className="mt-4 text-xl font-bold text-center">Looks like you want to try the Photo Booth!</p>
          </div>
        </div>
      )}

      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-[url('/images/light_mode_background.svg')] dark:bg-[url('/images/dark_mode_background.svg')] bg-cover bg-center">
        <div className="flex flex-col space-y-5 md:space-y-8">
          <SlidingBanner
            slides={[
              { imageUrl: "/images/ScrollBanner.svg" },
              { imageUrl: "/images/ScrollBanner2.svg" }
            ]}
          />

          {/* Highlight Text Section */}
          <section className="text-center px-4">
            <h2 className="text-[#333333] text-3xl md:text-4xl font-bold leading-snug">
              THE HOUSE OF <br />
              OVER <span className="text-[#E87518]">100,000</span> ARTIFACTS
            </h2>
          </section>

          {/* Ramesses Rewind Section */}
          <section className="relative w-full h-[32vw] max-h-[130px] flex items-center justify-center text-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/King_Ramses.svg)' }}
            ></div>
            <div className="absolute inset-0">
              <Image src="/images/overlay.png" alt="Overlay" layout="fill" objectFit="cover" />
            </div>

            <Link href="/talk-to-ramses" className="relative z-10 group">
              <div className={`relative w-[80vw] max-w-[355px] h-auto ${animateButtons ? 'animate-pulse' : 'transition-all duration-500'}`}>
                <Image
                  src="/images/button1.svg"
                  alt="Meet Ramses Button"
                  width={355}
                  height={63}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg md:text-xl font-greta group-hover:scale-105 transition-transform duration-300">
                  MEET RAMSES
                </span>
              </div>
            </Link>
          </section>

          {/* Photo Booth Section */}
          <section className="relative w-full h-[32vw] max-h-[130px] flex items-center justify-center text-white">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/photo-booth-banner.svg)' }}
            ></div>
            <div className="absolute inset-0">
              <Image src="/images/overlay.png" alt="Overlay" layout="fill" objectFit="cover" />
            </div>

            <Link
              href={imageUrl ? `/viewmedia?image=${imageUrl}` : "#"}
              onClick={handlePhotoBoothClick}
              className="relative z-10 group"
            >
              <div className={`relative w-[80vw] max-w-[355px] h-auto ${animateButtons ? 'animate-pulse' : 'transition-all duration-500'}`}>
                <Image
                  src="/images/button2.svg"
                  alt="Photo Booth Button"
                  width={355}
                  height={63}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg md:text-xl font-greta group-hover:scale-105 transition-transform duration-300">
                  PHOTO BOOTH
                </span>
              </div>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
