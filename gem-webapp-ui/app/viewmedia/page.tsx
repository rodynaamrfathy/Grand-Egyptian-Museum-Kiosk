import Image from "next/image";

export default function ViewMedia() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-500 text-white text-center p-5">
        <div className="flex items-center justify-center gap-4">
          <Image src="/images/img-3185-1.png" alt="Logo" width={100} height={100} />
          <h1 className="text-xl font-bold sm:text-2xl">المتحف المصري الكبير</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 flex flex-col items-center">
        {/* Video Section */}
        <section className="mb-10 w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-center">Play Video</h2>
          <div className="flex justify-center">
            <video controls className="w-full rounded-lg shadow-lg">
              <source src="/videos/sample-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex justify-between mt-3 flex-col sm:flex-row">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-3 sm:mb-0">Download</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Share</button>
          </div>
        </section>

        {/* Picture Section */}
        <section className="w-full max-w-md">
          <h2 className="text-lg font-bold mb-2 text-center">Your Picture!</h2>
          <div className="flex justify-center">
            <Image
              src="/images/sample-image.jpg"
              alt="Sample Picture"
              width={400}
              height={300}
              className="rounded-lg shadow-lg w-full sm:w-96"
            />
          </div>
          <div className="flex justify-between mt-3 flex-col sm:flex-row">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-3 sm:mb-0">Download</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Share</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-5 bg-gray-800 text-white">
        <p>&copy; 2024 المتحف المصري الكبير. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
