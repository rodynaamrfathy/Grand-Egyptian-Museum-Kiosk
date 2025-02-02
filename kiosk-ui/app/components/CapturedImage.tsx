import Image from "next/image";
import { RefreshCw, Check } from "lucide-react";

const CapturedImage = ({ image, onRetake, onDone }: { image: string, onRetake: () => void, onDone: () => void }) => (
  <div className="absolute w-full h-full flex flex-col items-center justify-center bg-black">
    <Image src={image} alt="Captured" width={640} height={480} className="rounded-lg shadow-lg" />
    <div className="mt-4 flex gap-4">
      <button
        className="bg-gray-700 text-white p-3 rounded-full shadow hover:scale-110"
        onClick={onRetake} // Restart countdown and retake photo
      >
        <RefreshCw size={24} />
      </button>
      <button
        className="bg-green-500 text-white p-3 rounded-full shadow hover:scale-110"
        onClick={onDone} // Show QR code then return to screensaver
      >
        <Check size={24} />
      </button>
    </div>
  </div>
);

export default CapturedImage;
