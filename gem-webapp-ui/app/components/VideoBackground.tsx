"use client";
import React, { useState } from "react";

const VideoBackground = () => {
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoError = () => {
    setVideoFailed(true);
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video (hidden if failed or unsupported) */}
      {!videoFailed ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={handleVideoError}
          className="w-full h-full object-cover"
        >
          <source src="/background-video.mp4" type="video/mp4" />
          <source src="/background-video.webm" type="video/webm" />
        </video>
      ) : (
        // Fallback SVG image (for SVG-based usage)
        <svg className="w-full h-full">
          <image
            href="/background-fallback.jpg" // SVG uses 'href' instead of 'src'
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice" // Equivalent to 'object-cover'
          />
        </svg>
      )}

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
};

export default VideoBackground;