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
      
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
