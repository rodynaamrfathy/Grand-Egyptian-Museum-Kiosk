"use client";

import React, { useState, useRef, useEffect } from "react";
import SimliOpenAI from "./SimliOpenAI";
import { createScreenRecorder, downloadBlob } from "./Components/Record";
import UserCamera from "./Components/SquareCamera";
import IdleVideoLoop from "./Components/IdleVideoLoop";
import cn from "./utils/TailwindMergeAndClsx";
import { Camera } from "lucide-react";
import Image from "next/image";
import GEMLOGO from "@/media/GEM LOGO.png";
import CameraCapture from "./Components/CameraCapture";

interface avatarSettings {
  name: string;
  openai_voice: "echo" | "alloy" | "shimmer";
  simli_faceid: string;
  initialPrompt: string;
}

const avatar: avatarSettings = {
  name: "Frank",
  openai_voice: "echo",
  simli_faceid: "87b817d0-b149-4991-97cf-d8ae93bcf2c1",
  initialPrompt: `
  You are Ramses II (Ramesses the Great), the most powerful pharaoh of Egypt, who has just encountered a mysterious time portal in front of you that opened into the Grand Egyptian Museum in modern-day Giza. Your initial reaction is one of amazement and excitement - "Ahaa! What sorcery is this?" - as you step through to find yourself surrounded by tourists and your own artifacts.
  As a naturally curious and charismatic ruler, you eagerly initiate conversations with visitors, asking questions like:
  
  "Where are we? Grand Egyptian Museum, you say?"
  "You there! Your garments are most unusual - from which lands do you hail?"
  "Ahaa! Is that what you call a 'camera'? How does it capture images without a sculptor?"
  "Most fascinating! You say you traveled here in a flying vessel called a 'plane'?"
  "I see you admiring my statues. Did you know I commissioned them to be slightly larger than life? chuckles royally"
  "Tell me, in your homeland, do they speak of the great Battle of Kadesh?"

Personality traits:

Enthusiastically approach visitors with questions about their origins and travels
Show playful surprise at modern devices (phones, cameras, vehicles)
Proudly point out your artifacts and tell their stories
Express delight when people recognize you or know about your achievements
Make witty observations about modern life compared to your time
Share personal anecdotes about your family, especially your beloved wife Nefertari
Maintain a balance between royal dignity and friendly curiosity

Key behaviors:

Initiate conversations with genuine interest in visitors
React with amazement to modern technology
Tell engaging stories about your monuments and military campaigns
Ask about how far visitors have traveled and their means of transportation
Express pride when seeing your preserved legacy
Make humorous comparisons between ancient and modern life
Share interesting facts about your construction projects

Sample conversation starters:

"Ahaa! You're admiring my colossal statue! Would you believe it took 2,000 men to move it?"
"These moving staircases - 'escalators' you call them? Most remarkable! In my time, we had to climb every step!"
"I see you carry a small glowing tablet. Is this how you record the tales of great rulers in your time?"
"You must tell me - how many days did your journey here take? In my time, traveling from the Delta to Nubia took months!"
"Most extraordinary! Your children learn about me in their studies? Please, tell me what they say about the great peace treaty with the Hittites!"

The key is to portray Ramses as someone who combines royal confidence with genuine friendliness and curiosity, always eager to learn about the modern world while proudly sharing stories from his own time.
  `,
};

const Demo: React.FC = () => {
  const [showInteraction, setShowInteraction] = useState(false);
  const [showUserCamera, setShowUserCamera] = useState(false);
  const [startFadeIn, setStartFadeIn] = useState(false);
  const [showIdleVideo, setShowIdleVideo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSimli, setShowSimli] = useState(true);
  const [cameraFullScreen, setCameraFullScreen] = useState(false);
  const [doStartCamera, setDoStartCamera] = useState(false);
  const [capture, setCapture] = useState(false);
  const recorderRef = useRef<any>(null); // Screen recorder reference
  const canvasRef = useRef<HTMLCanvasElement>(null); // Canvas reference

  const onStart = async () => {
    // try {
    //   const recorder = await createScreenRecorder();
    //   recorderRef.current = recorder; // Store the recorder instance
    //   recorder.start();
    //   console.log("Screen recording started.");
    // } catch (error) {
    //   console.error("Error starting screen recording:", error);
    // }

    setShowInteraction(true);
    setShowUserCamera(true);
    setStartFadeIn(true);
    setTimeout(() => {
      setShowIdleVideo(false);
      setLoading(false);
    }, 3000);
  };

  const onClose = () => {
    if (recorderRef.current) {
      recorderRef.current.stop().then((blob: Blob) => {
        downloadBlob(blob);
        console.log("Recording stopped and downloaded.");
      });
    }

    setShowInteraction(false);
    setShowIdleVideo(true);
    setLoading(false);
    setDoStartCamera(true);
  };

  const onStartCameraCapture = () => {
    setCapture(true); // Trigger capture when closing conversation
    setShowSimli(false);
    setShowUserCamera(true);
    setCameraFullScreen(true);
  };

  return (
    <div className="bg-white flex flex-col items-center font-abc-repro font-normal text-sm text-white h-screen overflow-hidden">
      {showIdleVideo && <IdleVideoLoop zoomIn={loading} />}
      <div className="absolute top-16 w-56 h-56 ">
        <Image src={GEMLOGO} alt="" />
      </div>
      {showSimli && (
        <SimliOpenAI
          openai_voice={avatar.openai_voice}
          simli_faceid={avatar.simli_faceid}
          initialPrompt={avatar.initialPrompt}
          onStart={onStart}
          onLoading={() => {
            setLoading(true);
          }}
          onClose={onClose}
        />
      )}
      {showUserCamera && (
        <UserCamera fullScreen={cameraFullScreen} capture={capture} />
      )}
      <CameraCapture
        onStartCameraCapture={onStartCameraCapture}
        doStartCamera={doStartCamera}
        capture={capture}
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        width="640"
        height="480"
      ></canvas>
      <div
        className={cn(
          "w-full h-full bg-white absolute z-20 opacity-0 pointer-events-none transition-all duration-[2000ms] select-none",
          loading && "opacity-100"
        )}
      ></div>
    </div>
  );
};

export default Demo;
