import { QRCodeSVG } from "qrcode.react";
import cn from "@/utils/TailwindMergeAndClsx";

const QRCodeDisplay = () => (
  <div
    className={cn(
      "bg-white absolute scale-75 z-30 p-2 rounded-lg shadow-lg flex flex-col items-center transition-all duration-1000 opacity-100 bottom-8"
    )}
  >
    <h2 className="text-md text-black font-bold mb-4">Scan and Download</h2>
    <QRCodeSVG value="http://172.20.10.5:3000" />
  </div>
);

export default QRCodeDisplay;
