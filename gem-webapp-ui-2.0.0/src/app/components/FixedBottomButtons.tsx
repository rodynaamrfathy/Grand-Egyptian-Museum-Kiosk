"use client";

import ShareButton from "./ShareButton";
import EditButton from "./EditButton";

interface FixedBottomButtonsProps {
  isFooterVisible?: boolean;
}

export default function FixedBottomButtons({ isFooterVisible }: FixedBottomButtonsProps) {
  return (
    <div className={`${isFooterVisible ? 'static' : 'fixed bottom-0 left-0 right-0'} z-30 p-6 bg-gradient-to-t from-black to-transparent`}>
      <div className="max-w-md mx-auto space-y-3 flex flex-col items-center">
        <ShareButton />
        <EditButton />
      </div>
    </div>
  );
} 