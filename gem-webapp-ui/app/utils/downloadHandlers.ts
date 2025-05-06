export const onFirstAction = async (input: string): Promise<void> => {
    try {
      const response = await fetch(input);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${input}`);
      }
  
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = objectUrl;
  
      const filename = input.split("/").pop() || "downloaded-image.jpg";
      link.download = filename;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Download failed in onFirstAction:", error);
      alert("Failed to download the image from the provided URL.");
    }
  };
  

export const onSecondAction = (blob: Blob): void => {
    console.log("Second action triggered with blob:", blob);
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "MemoryCard.png"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  