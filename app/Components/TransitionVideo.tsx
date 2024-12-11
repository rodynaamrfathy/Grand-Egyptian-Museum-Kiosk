
const TransitionVideo = () => {

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <video
        src="/transition.mp4"
        autoPlay
        playsInline
        loop
        // className="w-full h-full object-cover"
        className=" rotate-90 h-full w-full scale-[180%]"
      ></video>
    </div>
  );
};

export default TransitionVideo;
