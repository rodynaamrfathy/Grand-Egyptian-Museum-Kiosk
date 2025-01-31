export default function VideoBox(props: any) {
  return (
    <div className="fixed inset-0 flex -left-44 rounded-sm overflow-hidden items-center h-full aspect-square justify-center">
      <video
        ref={props.video}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      ></video>
      <audio ref={props.audio} autoPlay></audio>
    </div>
  );
}
