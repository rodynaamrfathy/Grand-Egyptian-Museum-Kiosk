"use client";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
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
    setText(textToEdit); // Reset to original text when opening
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
        icon={FiEdit2}
        label="EDIT TEXT"
        onClick={handleClick}
      />
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-black font-bold mb-4">Edit Your Text</h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!text.trim()} // Disable if empty
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