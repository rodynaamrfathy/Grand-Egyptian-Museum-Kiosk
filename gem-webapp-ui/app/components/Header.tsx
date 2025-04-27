"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-[#141414] sticky top-0 z-40">
      <Image src="/images/img-3185-1.png" alt="GEM Logo" width={50} height={50} />
      <ChangeLanguageButton />
    </header>
  );
}

function ChangeLanguageButton() {
  return (
    <button className="text-2xl font-bold bg-orange-500 text-white rounded-[8px] w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition">
      ع
    </button>
  );
}