"use client";

// dark mode

import React from "react";

interface IconButtonProps {
  iconPath: string;
  label: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconPath, label, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        className="p-5 bg-[rgba(255,255,255,0.18)] text-white hover:bg-[rgba(255,255,255,0.3)] transition duration-200 w-15 h-15 flex items-center justify-center shadow-[0_4px_4px_#353434] rounded-[28px]">
        <img src={iconPath} alt={label} className="w-6 h-6" />
      </button>
      <span className="text-sm text-white text-center">{label}</span>
    </div>
  );
};

export default IconButton;


// light mode dec shadow

/*import React from "react";

interface IconButtonProps {
  iconPath: string;
  label: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconPath, label, onClick }) => {
  return (
  <div className="flex flex-col items-center gap-2 bg-white">
    <button
      onClick={onClick}
      className="p-5 bg-white text-black hover:bg-[rgba(255,255,255,0.8)] transition duration-200 w-15 h-15 flex items-center justify-center shadow-[0_2px_2px_#353434] rounded-[28px]"
    >
      <img
        src={iconPath}
        alt={label}
        className="w-6 h-6"
        style={{ filter: 'invert(47%) sepia(93%) saturate(565%) hue-rotate(359deg) brightness(98%) contrast(97%)' }}
      />
    </button>
    <span className="text-sm text-black text-center">{label}</span>
  </div>
  );
};

export default IconButton;*/