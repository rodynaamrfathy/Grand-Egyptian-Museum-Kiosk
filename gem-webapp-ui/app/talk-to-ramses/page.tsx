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
            token="gAAAAABoEilx-e1IXAfoA0YCJw9x5BPIS7XX3gLBAwBU5CX0CaQdVIoKxb_ujPQsYiHJKhYYTDOsqNhDKwND-mQ1ICkLIM3lssd0Pc_3IALuZJJUS39SO9VM8TA-hjh3_i4mgDMJ0T6FHNKJZ-dWp0LBjBuBx1kGb0cCCStH9UEVFzB_RyoAZkCNiEOe-xeQajdIEGw-xDdxeHNrlEJK_ektgoen_ekcjZc0Zm_iu2IofDuyMs61CTnyRT2spN9LiVVFEInv0Cz7jTm4JblvCFBtxnKYUH9vBR0G-K8rh_2F1bbqMBlMvzN9HUap4jWuw4GHzjrPW8bYERTLvYoIH3-RmsnFPIVLcqLFAQ-7xvnLOqplOxBiIY_rJ7QU9hhii1m-NcxcWNuZjvZMmVgz-OBGvrkY2D84iw=="
            agentid="1fffab0f-0d6f-49e3-bac3-68217cca2a1d"
            position="relative"
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
