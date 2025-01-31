import { use, useEffect, useState } from "react";
import cn from "../utils/TailwindMergeAndClsx";

interface IdleVideoLoopProps {
  zoomIn: boolean;
}

const IdleVideoLoop: React.FC<IdleVideoLoopProps> = ({ zoomIn }) => {
  const [scale, setScale] = useState(180);

  useEffect(() => {
    if (zoomIn) {
      setScale(5000);
    }
  }, [zoomIn]);

  return (
    <div className="absolute w-full h-full overflow-hidden">
      <video
        src="/loop_video.mp4"
        autoPlay
        playsInline
        loop
        muted
        className={cn(
          "rotate-90 h-full w-full transition-all ease-in duration-[600ms]",
          scale === 180 ? "scale-[180%]" : "scale-[5000%]"
        )}
      ></video>
    </div>
  );
};

export default IdleVideoLoop;
