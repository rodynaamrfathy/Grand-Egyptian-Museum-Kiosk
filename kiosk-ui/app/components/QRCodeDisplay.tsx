import { QRCodeSVG } from "qrcode.react";

const QRCodeDisplay = ({ imageUrl }: { imageUrl: string }) => {
  const qrCodeUrl = `http://localhost:3002/viewmedia?image=${encodeURIComponent(imageUrl)}`;

  return (
    <div className="bg-white absolute scale-75 z-30 p-2 rounded-lg shadow-lg flex flex-col items-center transition-all duration-1000 opacity-100 bottom-8">
      <h2 className="text-md text-black font-bold mb-4">Scan and Download</h2>
      <QRCodeSVG value={qrCodeUrl} />
    </div>
  );
};

export default QRCodeDisplay;
