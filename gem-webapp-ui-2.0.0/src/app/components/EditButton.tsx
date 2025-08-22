"use client";
import { Edit } from 'lucide-react';
import React, { useState } from 'react';

interface EditButtonProps {
  className?: string;
}

const MAX_LENGTH = 60;
const MAX_LINES = 3;
const CHARS_PER_LINE = 25;

export default function EditButton({ className }: EditButtonProps) {
  // Placeholder/demo value
  const [text, setText] = useState("Edit me!");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditOpen(true);
    setText(""); // clear the textarea
  };
  const handleEditSave = () => {
    setIsEditOpen(false);
    // You can add onSave logic here
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (value.length > MAX_LENGTH) value = value.slice(0, MAX_LENGTH);
    const regex = new RegExp(`.{1,${CHARS_PER_LINE}}`, "g");
    const lines = value.match(regex) || [];
    setText(lines.slice(0, MAX_LINES).join("\n"));
  };

  return (
    <>
      <button
        onClick={handleEditClick}
        className={`w-full rounded-2xl py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur bg-white/10 border border-white/20 font-sans ${className || ''}`}
      >
        <Edit className="w-5 h-5 text-white" />
        <span className="text-white font-medium font-sans">Write</span>
      </button>
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#AFAFAF]/20 border border-white/10 backdrop-blur-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-4 rounded-[32px] max-w-sm w-full text-white font-sans">
            <h3 className="font-bold mb-3 text-lg text-white text-center font-sans">Edit Text</h3>
            <textarea
              className="w-full p-2 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none font-sans"
              rows={3}
              maxLength={MAX_LENGTH + MAX_LINES}
              value={text}
              placeholder="Edit your text here..."
              onChange={handleTextChange}
            />
            <div className="text-right text-sm text-white/60 mt-1 font-sans">
              {text.replace(/\n/g, "").length}/{MAX_LENGTH} chars
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="mx-5 px-3 py-1.5 bg-white/20 border border-white/30 text-white rounded-[16px] hover:bg-white/30 transition font-sans"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-3 py-1.5 bg-white text-black rounded-[16px] hover:bg-blue-500 hover:text-white transition disabled:opacity-40 font-sans"
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
} 