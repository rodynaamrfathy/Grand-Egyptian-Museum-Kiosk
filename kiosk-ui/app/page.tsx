"use client";
import CameraCapture from "./components/CameraCapture.tsx";

const Page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <CameraCapture />
    </div>
  );
};

export default Page;
