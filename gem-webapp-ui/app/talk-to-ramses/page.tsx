import React from "react";

export default function TalkToRamses() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-500 text-white text-center p-5 w-full">
        <h1 className="text-xl font-bold sm:text-2xl">Talk to Ramses</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 flex flex-col items-center w-full sm:w-3/4 md:w-1/2">
        <h2 className="text-lg font-bold mb-2 text-center">Welcome to Ramses!</h2>
        <p className="text-center mb-4">Ask Ramses anything about Ancient Egypt.</p>

        {/* Chat interface or content can go here */}
      </main>

      {/* Footer */}
      <footer className="text-center p-5 bg-gray-800 text-white w-full">
        <p>&copy; 2024 المتحف المصري الكبير. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
