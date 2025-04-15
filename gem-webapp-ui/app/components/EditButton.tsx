"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";

interface EditButtonProps {
  textToEdit: string;
  onSave?: (newText: string) => void;
  className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  textToEdit, 
  onSave, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(textToEdit);

  const handleClick = () => {
    setIsOpen(true);
    setText(textToEdit);
  };

  const handleSave = () => {
    setIsOpen(false);
    if (onSave) {
      onSave(text);
    }
  };

  return (
    <>
      <IconButton
        iconPath="/images/Write.svg" 
        label="WRITE"
        onClick={handleClick}
      />
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#AFAFAF]/20 border border-white/10 
                          backdrop-blur-lg 
                          shadow-[0_4px_4px_rgba(0,0,0,0.25)] 
                          p-4 rounded-[32px] max-w-sm w-full text-white">
            <h3 className="font-bold mb-3 text-lg text-white text-center">
              Edit Your Text
            </h3>
            <textarea
              className="w-full p-2 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none"
              rows={3}
              value={text}
              placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 bg-white/20 border border-white/30 text-white rounded-[16px] hover:bg-white/30 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-white text-black rounded-[16px] hover:bg-blue-500 hover:text-white transition disabled:opacity-40"
                disabled={!text.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;
