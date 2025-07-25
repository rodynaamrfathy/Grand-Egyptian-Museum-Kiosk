"use client";

import Image from "next/image";

export default function Header() {
  return (
  <header className="flex justify-between items-center p-4 bg-[#141414] top-0 z-40">
    <Image src="/images/LOGO.svg" alt="GEM Logo" width={80} height={80} />
    </header>
  );
}

