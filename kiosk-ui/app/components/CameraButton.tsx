import { Camera } from "lucide-react";

const CameraButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-orange-500 p-4 rounded-full shadow-lg hover:scale-110 transition-all"
    onClick={onClick}
  >
    <Camera size={32} className="text-white" />
  </button>
);

export default CameraButton;
