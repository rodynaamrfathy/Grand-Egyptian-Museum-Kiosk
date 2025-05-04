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
      const dpr = window.devicePixelRatio || 1;

      const canvas = document.createElement("canvas");
      canvas.width = img.width * dpr;
      canvas.height = img.height * dpr;
      canvas.style.width = `${img.width}px`;
      canvas.style.height = `${img.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context could not be created"));
        return;
      }

      ctx.scale(dpr, dpr); // handle high DPI screens

      // Draw card
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Font selection
      const mainSize = Math.floor(img.width * 0.09);
      const dateSize = Math.floor(img.width * 0.03);
      const isArabic = /[\u0600-\u06FF]/.test(overlayText); // Detect Arabic

      const mainFont = isArabic ? 'ArabicCustom' : 'Mariam';
      const dateFont = 'Averia';

      // Main overlay text
      ctx.font = `bold ${mainSize}px '${mainFont}', serif`;
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(overlayText, img.width / 2, img.height * 0.40);

      // Date
      ctx.font = `bold ${dateSize}px '${dateFont}', sans-serif`;
      ctx.fillStyle = "#393939";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText(dateString, img.width * 0.82, img.height * 0.53);

      // Export
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
