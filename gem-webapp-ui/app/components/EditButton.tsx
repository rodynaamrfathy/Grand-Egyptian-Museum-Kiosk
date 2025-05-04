"use client";
import React, { useState } from "react";
import IconButton from "./IconButton";
import { useTranslation } from "react-i18next";

interface EditButtonProps {
  textToEdit: string;
  onSave?: (newText: string) => void;
  className?: string;
}

const MAX_LENGTH = 60;
const MAX_LINES = 3;
const CHARS_PER_LINE = 25;

const EditButton: React.FC<EditButtonProps> = ({ 
  textToEdit, 
  onSave, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(textToEdit);

  const handleClick = () => {
    setIsOpen(true);
    setText(""); // clear the textarea
  };  

  const handleSave = () => {
    setIsOpen(false);
    if (onSave) {
      onSave(text);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    // Enforce max length
    if (value.length > MAX_LENGTH) {
      value = value.slice(0, MAX_LENGTH);
    }

    // Auto-insert line breaks every 20 characters
    const regex = new RegExp(`.{1,${CHARS_PER_LINE}}`, "g");
    const lines = value.match(regex) || [];

    setText(lines.slice(0, MAX_LINES).join("\n"));
  };

  const { t } = useTranslation();

  return (
    <>
      <IconButton
        iconPath="/images/Write.svg"
        label={t("buttons.write")}
        onClick={handleClick}
      />
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#AFAFAF]/20 border border-white/10 
                          backdrop-blur-lg 
                          shadow-[0_4px_4px_rgba(0,0,0,0.25)] 
                          p-4 rounded-[32px] max-w-sm w-full text-white">
            <h3 className="font-bold mb-3 text-lg text-white text-center">
              {t("headers.editText")}
            </h3>
            <textarea
              className="w-full p-2 rounded-[16px] bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none"
              rows={3}
              maxLength={MAX_LENGTH + MAX_LINES} // slightly over to account for newlines
              value={text}
              placeholder={t("edit.placeholder")}
              onChange={handleTextChange}
            />
            <div className="text-right text-sm text-white/60 mt-1">
              {text.replace(/\n/g, "").length}/{MAX_LENGTH} {t("edit.chars")}
            </div>
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="mx-5 px-3 py-1.5 bg-white/20 border border-white/30 text-white rounded-[16px] hover:bg-white/30 transition"
              >
                {t("buttons.cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-white text-black rounded-[16px] hover:bg-blue-500 hover:text-white transition disabled:opacity-40"
                disabled={!text.trim()}
              >
                {t("buttons.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditButton;
