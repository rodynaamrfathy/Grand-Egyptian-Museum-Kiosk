import { Camera } from "lucide-react";
import { use, useEffect, useState } from "react";

interface CameraCaptureProps {
  onStartCameraCapture(): void;
  doStartCamera: boolean;
}

const CameraCapture = ({
  onStartCameraCapture,
  doStartCamera,
}: CameraCaptureProps) => {
  const [startCamera, setStartCamera] = useState(false);

  useEffect(() => {
    if (doStartCamera) {
      startCameraCapture();
    }
  }, [doStartCamera]);

  const startCameraCapture = () => {
    onStartCameraCapture();
    setStartCamera(true);
  };

  return (
    <>
      {!startCamera && (
        <div
          className="absolute z-20 w-20 rounded-r-full h-12 bg-[#ea7204] animate-pulse hover:opacity-15 left-0 bottom-8 flex justify-center items-center"
          onClick={startCameraCapture}
        >
          <Camera />
        </div>
      )}
      {startCamera && (
        <div className=" absolute h-screen w-full from-white to-[#ea7204] bg-gradient-to-t"></div>
      )}
    </>
  );
};

export default CameraCapture;
