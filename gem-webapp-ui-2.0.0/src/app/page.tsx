'use client';
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedBottomButtons from "./components/FixedBottomButtons";
import { fetchImageAsBlob, useRemoteImage } from "./hooks/useRemoteImage";
import { useEffect, useState } from "react";

const cardTemplateUrl =
  "https://res.cloudinary.com/dynfn6e5m/image/upload/v1746278397/uploads/1746278397692.png";


export default function Home() {
  const { imageBlob, loading, error } = useRemoteImage();

  // for the image
  const [templateBlob, setTemplateBlob] = useState<Blob | null>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);
  const [templateLoading, setTemplateLoading] = useState(false);

  // Fetch card template image
  useEffect(() => {
    setTemplateLoading(true);
    fetchImageAsBlob(cardTemplateUrl)
      .then(setTemplateBlob)
      .catch((err) => setTemplateError(err.message))
      .finally(() => setTemplateLoading(false));
  }, []);

  // Helper to convert blob to object URL for <Image />
  const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : null;
  // for the card
  const templateBlobUrl = templateBlob ? URL.createObjectURL(templateBlob) : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/dark_mode_background.svg')] bg-cover bg-center pb-50">
        <div className="max-w-md flex flex-col gap-6 mt-8 mx-auto items-center justify-center">
          {/* Booth image */}
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
            {loading && <p className="text-white">Loading image...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {loading && <p className="text-white">Loading image...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {blobUrl ? (
              <Image src={blobUrl} alt="Loaded from URL" width={400} height={250} className="rounded-xl object-cover" />
            ) : (
              <p className="text-white">No image found in URL parameters.</p>
            )}
          </div>

        {/* Card template image */}
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center mt-10">
            {templateLoading && <p className="text-white">Loading card template...</p>}
            {templateError && <p className="text-red-500">Error: {templateError}</p>}
            {templateBlobUrl && (
              <Image
                src={templateBlobUrl}
                alt="Card template"
                width={400}
                height={250}
                className="rounded-xl object-cover"
              />
            )}
          </div>
          </div>
      </main>
      <Footer />
      <FixedBottomButtons />
    </div>
  );
}
