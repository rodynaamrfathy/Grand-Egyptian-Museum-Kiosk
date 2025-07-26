import Image from "next/image";
import Header from "./components/Header"
import Footer from "./components/Footer"
import FixedBottomButtons from "./components/FixedBottomButtons";

export default function Home() {
  // Placeholder/demo image URLs
  const imageUrl = "/images/demo.jpg";
  const cardImageUrl = "/images/demo-card.jpg";
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/dark_mode_background.svg')] bg-cover bg-center pb-50">
        <div className="w-full max-w-md flex flex-col gap-6 mt-8">
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
            <Image src={imageUrl} alt="Image 1" width={400} height={250} className="rounded-xl object-cover" />
            <div className="mt-2 text-white text-center">Image 1</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
            <Image src={cardImageUrl} alt="Image 2" width={400} height={250} className="rounded-xl object-cover" />
            <div className="mt-2 text-white text-center">Image 2</div>
          </div>
        </div>
      </main>
      <Footer />
      <FixedBottomButtons />
    </div>
  );
}
