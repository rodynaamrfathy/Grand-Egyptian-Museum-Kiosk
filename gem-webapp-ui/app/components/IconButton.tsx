import React from "react";

const IconButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center m-2"
    >
      <div className="bg-[#2a2a2a] rounded-xl w-16 h-16 flex items-center justify-center shadow-md">
        <Icon className="text-white w-6 h-6" />
      </div>
      <span className="text-xs text-white mt-1 tracking-wider">{label}</span>
    </button>
  );
};

export default IconButton;
