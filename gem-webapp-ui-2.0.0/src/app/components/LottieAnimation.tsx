"use client";

import { useLottie, LottieOptions } from "lottie-react";
import animationData from "@/assets/LottieFiles/longpress.json";

export default function LottieAnimation() {
  const options: LottieOptions = {
    animationData,
    loop: true,
    autoplay: true,
    style: { height: 300, width: 300 },
  };

  const { View } = useLottie(options);

  return <div className="flex justify-center items-center">{View}</div>;
}
