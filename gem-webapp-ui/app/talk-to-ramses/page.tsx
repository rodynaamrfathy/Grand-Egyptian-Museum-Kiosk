// @ts-nocheck
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TalkToRamses() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-[url('/images/dark_mode_background.svg')] dark:bg-[url('/images/dark_mode_background.svg')] bg-cover bg-center">
        <div className=" h-[700px] w-full flex justify-center items-center overflow-hidden">
          <simli-widget
            token="gAAAAABoHNahL3wvjSqZMZK3iF7Kh95DQPG_0xlUijJ9Gwticnz6ceLcjE9QdAD4P7XQgXkaKHrDT_OjEDjOymEa1kiRhGCe0BkROeuX2sl09WEk5TeT6Bfw4GatNgptHZgt6ZNEhUj80ycvFiRpRtdPtpyf2heXVFK_6ywuf_F9lQlVl3C17E0yxWrc8RDxTl8E8GyyjlD47DUYwAR3eafJOBgi2jvZai-uhl642D_l8vvuNGbFJs7I7NO7D7pxEuPyDw-OEMy92mjoP4bzue1_IH0VLLLgZzBff7vQulnJ6EuZSAI1GZXve8eAjRkhALiKrMOD-7Z8d_5mLaNbznvz2V0bcViWfGRH_hpuWdpPzYykikVB0xZvL1-qUHoTjwFaysm38_Tmqrnka8AUFXrveynLZsUbUA=="
            agentid="1fffab0f-0d6f-49e3-bac3-68217cca2a1d"
            position="relative"
            customimage=""
            customtext="Call Ramses"
          ></simli-widget>
          <script
            src="https://app.simli.com/simli-widget/index.js"
            async
            type="text/javascript"
          ></script>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
