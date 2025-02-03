const serverIp = process.env.NEXT_PUBLIC_SERVER_IP;

export const uploadImage = async (imageData: string) => {
  try {
    const blob = await fetch(imageData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "capturedImage.png");

    const response = await fetch(`http://${serverIp}:3000/api/upload-image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload Response:", data); 

    if (!data.imageUrl) {
      throw new Error("Server did not return an image URL.");
    }

    return data.imageUrl;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};
