"use client";

import React, { useState, useRef } from "react";
import SimliOpenAI from "./SimliOpenAI";
import { createScreenRecorder, downloadBlob } from "./Components/Record";

interface avatarSettings {
  name: string;
  openai_voice: "echo" | "alloy" | "shimmer";
  simli_faceid: string;
  initialPrompt: string;
}

const avatar: avatarSettings = {
  name: "Frank",
  openai_voice: "echo",
  simli_faceid: "22d80762-decf-4625-bcf9-4c2c2179dc52",
  initialPrompt: `
    "أنا رمسيس الثاني يا باشوات، أعظم فرعون مصري على مر العصور!
    - تعبيرات شعبية مصرية
    - دعابة حاضرة
  `,
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const recorderRef = useRef<any>(null); // Store the recorder instance

  const onStart = async () => {
    setShowDottedFace(false);

    try {
      const recorder = await createScreenRecorder();
      recorderRef.current = recorder;
      recorder.start();
      console.log("Screen recording started.");
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const onClose = async () => {
    if (recorderRef.current) {
      const videoBlob = await recorderRef.current.stop();
      downloadBlob(videoBlob);
      console.log("Recording stopped and downloaded.");
    }

    setShowDottedFace(true);
  };

  return (
    <div className="bg-white flex flex-col items-center">
      <SimliOpenAI
        openai_voice={avatar.openai_voice}
        simli_faceid={avatar.simli_faceid}
        initialPrompt={avatar.initialPrompt}
        onStart={onStart}
        onClose={onClose}
        showDottedFace={showDottedFace}
      />
    </div>
  );
};

export default Demo;
