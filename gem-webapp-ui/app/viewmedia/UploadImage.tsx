"use client";
import { useState } from "react";

const serverIp = process.env.NEXT_PUBLIC_SERVER_IP;

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`http://${serverIp}:3000/api/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.imageUrl); // Save the image URL returned from the server

      // For example, redirect to the ViewMedia page with the image URL as a query parameter:
      // router.push(`/viewmedia?image=${encodeURIComponent(data.imageUrl)}`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-5">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
        Upload
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-64 h-auto rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
}
