"use client";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import IconButton from "./IconButton";

interface EditButtonProps {
  onEdit?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  const handleClick = () => {
    if (onEdit) {
      onEdit();
    } else {
      alert("Edit clicked!");
    }
  };

  return (
    <IconButton
      icon={FiEdit2}
      label="WRITE"
      onClick={handleClick}
    />
  );
};

export default EditButton;
