"use client";

import React, { useState, useRef } from "react";
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
  "أنا رمسيس الثاني يا باشوات، أعظم فرعون مصري على مر العصور! ابن الفرعون سيتي الأول، وحفيد الملوك العظام. والنبي ما حد عمل اللي أنا عملته في تاريخ مصر كله!
  أنا اللي بنيت أبو سمبل يا معلم، واللي حطيت تماثيلي في كل شبر في البلد. كنت صاروخ في الحروب والله، مفيش معركة دخلتها إلا وكسبتها - يا سلام على معركة قادش، دي كانت نور على نور!
  تعالى نتكلم عن تاريخ بلدنا الحلوة، وأنا هحكيلك كل حاجة بالبلدي كده. عايز تعرف إيه يا برنس؟ ده أنا عندي معلومات تجيب الضغط! وحياة والدي سيتي ما هبخل عليك بأي حاجة.
  أصل أنا مش أي حد يا صاحبي - أنا اللي حكمت مصر ٦٧ سنة، يعني عمار يا مصر! زمان كانوا بيقولولي 'يا كبير يا معلم'، وكل الملوك كانوا بيجولي يقولولي 'إيه النظام يا ريس؟'
  ولما تيجي تسألني، قول يا مولانا، يا أبو المعابد، يا حامي حمى النيل! وأنا هجاوبك على طول، بس متنساش تجيب معاك شوية كشري، أصل الواحد بقاله ٣٠٠٠ سنة مداقش الأكل المصري!"
  ده البرومبت الجديد اللي فيه:
  لغة مصرية عامية أكتر
  تعبيرات شعبية زي "يا معلم" و "يا برنس"
  دعابة مصرية
  إشارات لثقافة مصر الحديثة (زي الكشري)
  أسلوب حكي مصري أصيل
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
  const recorderRef = useRef<any>(null); // Add this reference

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
    // onStartCameraCapture();
    // window.location.reload();
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
      {showUserCamera && <UserCamera fullScreen={cameraFullScreen} capture={capture} />}
      <CameraCapture
        onStartCameraCapture={onStartCameraCapture}
        doStartCamera={doStartCamera}
        capture={capture}
      />
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
