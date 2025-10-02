"use client";

import { useEffect, useState } from "react";

type LoopingTextProps = {
  texts: string[];
  interval?: number; // total time per text
  className?: string;
};

export default function LoopingText({
  texts,
  interval = 2500,
  className = "",
}: LoopingTextProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      // Start fade out
      setFade(false);

      // After fade-out, change text & fade back in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 300); // fade-out duration
    }, interval);

    return () => clearInterval(timer);
  }, [interval, texts.length]);

  const referenceText = texts.reduce(
    (longest, word) => (word.length > longest.length ? word : longest),
    ""
  );

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      {/* Invisible reference to lock dimensions */}
      <span className="invisible">{referenceText}</span>

      {/* Animated visible text */}
      <span
        className={`absolute transition-all duration-300 ease-in-out text-center ${
          fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{
          color: "#FFFFFF",
          textShadow: "2px 2px 8px rgba(0,0,0,0.7)", // subtle shadow
        }}
      >
        {texts[index]}
      </span>
    </div>
  );
}
