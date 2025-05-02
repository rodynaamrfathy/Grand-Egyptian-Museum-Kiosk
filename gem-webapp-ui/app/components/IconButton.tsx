"use client";

import React from "react";
import Image from "next/image";

interface IconButtonProps {
  iconPath: string;
  label: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconPath, label, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-2">
    <button onClick={onClick} className="custom-button">  

        <Image
          src={iconPath}
          alt={label}
          width={26}
          height={26}
        />
      </button>
      <span className="text-l text-white text-center leading-[150%]">{label}</span>
      </div>
  );
};

export default IconButton;
