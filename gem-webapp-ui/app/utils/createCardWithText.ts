export const createCardWithText = (
    cardUrl: string,
    overlayText: string,
    dateString: string
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = cardUrl;
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context could not be created"));
          return;
        }
  
        // Draw card
        ctx.drawImage(img, 0, 0);
  
        // Main overlay text
        const mainSize = Math.floor(canvas.width * 0.09);
        const dateSize = Math.floor(canvas.width * 0.03);
  
        ctx.font = `bold ${mainSize}px 'Mariam', sans-serif`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(overlayText, canvas.width / 2, canvas.height * 0.40);
  
        // Date
        ctx.font = `bold ${dateSize}px 'Averia', sans-serif`;
        ctx.fillStyle = "#393939";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(dateString, canvas.width * 0.82, canvas.height * 0.53);
  
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Blob creation failed"));
          } else {
            resolve(blob);
          }
        }, "image/png");
      };
  
      img.onerror = () => reject(new Error("Image failed to load"));
    });
  };
  