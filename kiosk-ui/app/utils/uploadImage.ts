export const uploadImage = async (imageData: string) => {
    const blob = await fetch(imageData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "capturedImage.png");
  
    const response = await fetch("http://172.20.10.5:3000/api/upload-image", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Image upload failed");
    }
  
    const data = await response.json();
    return data.imageUrl;
  };
  