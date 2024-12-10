"use client";
import React, { use, useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import SimliOpenAIPushToTalk from "./SimliOpenAIPushToTalk";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";

interface avatarSettings {
  name: string;
  openai_voice: "echo" | "alloy" | "shimmer";
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Frank",
  openai_voice: "echo",
  simli_faceid: "22d80762-decf-4625-bcf9-4c2c2179dc52",
  initialPrompt:
    `
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
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [interactionMode, setInteractionMode] = useState<
    "regular" | "pushToTalk" | undefined
  >("regular");

  useEffect(() => {
    const storedInteractionMode = localStorage.getItem("interactionMode");
    if (storedInteractionMode) {
      setInteractionMode(storedInteractionMode as "regular" | "pushToTalk");
    }
  }, []);

  const saveInteractionMode = (mode: "regular" | "pushToTalk") => {
    localStorage.setItem("interactionMode", mode);
    setInteractionMode(mode);
  }

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-white flex flex-col items-center font-abc-repro font-normal text-sm text-white">
        <div>
          <SimliOpenAI
            openai_voice={avatar.openai_voice}
            simli_faceid={avatar.simli_faceid}
            initialPrompt={avatar.initialPrompt}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
    </div>
  );
};

export default Demo;
