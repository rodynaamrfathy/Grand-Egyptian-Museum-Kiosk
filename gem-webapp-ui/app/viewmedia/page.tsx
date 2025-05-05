"use client";
import loadDynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShareButton from '../components/ShareButton';
import DownloadButton from '../components/DownloadButton';
import EditButton from '../components/EditButton';
import { createCardWithText } from '../utils/createCardWithText';
import '../../lib/i18n';

export const dynamic = 'force-dynamic';

const ImageFlip = loadDynamic(() => import('./ImageFlip'), { ssr: false });

export default function ViewMedia() {
  const { t } = useTranslation();
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [editText, setEditText] = useState(t('edit.defaultText'));
  const [cardBlob, setCardBlob] = useState<Blob | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);

  const cardTemplateUrl = "https://res.cloudinary.com/dynfn6e5m/image/upload/v1746278397/uploads/1746278397692.png";

  const getCurrentDate = () => {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  };
  const [currentDate] = useState(getCurrentDate());

  const updateCard = async (text: string) => {
    setEditText(text);
    const blob = await createCardWithText(cardTemplateUrl, text, currentDate);
    setCardBlob(blob);
    setCardImageUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrlFromUrl = urlParams.get("image");
    if (imageUrlFromUrl) {
      setBaseImageUrl(imageUrlFromUrl);
      updateCard(editText);
    }
    document.fonts.load("bold 24px 'ArabicCustom'").then(() => {
      console.log("ArabicCustom font loaded");
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/images/dark_mode_background.svg')] bg-cover bg-center">
        <div className="relative w-full overflow-hidden pt-4 pb-0">
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <span
                key={idx}
                className="text-white text-[3vw] sm:text-[26px] md:text-[30px] tracking-[0.22em] pr-10"
              >
                {Array.from({ length: 20 }, () => `${t("marquee.keepMemories")} - `).join("")}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center w-full px-4">
          <div className="flex flex-col items-center justify-center w-full max-w-[90vw] sm:max-w-[380px] md:max-w-[500px]">
            {cardImageUrl ? (
              <div className="relative w-full aspect-[0.5968] flex items-center justify-center">
                <ImageFlip
                  imageUrl={baseImageUrl || ""}
                  cardImageUrl={cardImageUrl}
                  overlayText={editText}
                  currentDate={currentDate}
                />
              </div>
            ) : (
              <p className="text-white font-satoshi">{t("loading")}</p>
            )}

            <h2 className="text-[#E87518] text-[2.5vw] sm:text-[10px] md:text-[12px] mt-[-3rem] mb-4 text-center tracking-[0.15em] leading-none">
              {t("flipInstruction")}
            </h2>
          </div>
        </div>

        <div className="flex-grow" />

        <div className="w-full max-w-md px-12 pb-0 mt-5px">
          <div className="flex justify-between flex-wrap px-1 gap-x-[2px] gap-y-[4px]">
            {cardBlob && (
              <>
                <ShareButton cardBlob={cardBlob} imageUrl={baseImageUrl!} />
                <DownloadButton cardBlob={cardBlob} imageUrl={baseImageUrl!} />
              </>
            )}
            <EditButton textToEdit={editText} onSave={updateCard} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
