import Image from "next/image";
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-start bg-[url('/images/dark_mode_background.svg')] bg-cover bg-center">
      </main>
      <Footer />
    </div>
  );
}
