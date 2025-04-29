"use client";

import { useRef, useState } from "react";

interface Slide {
  imageUrl: string;
}

interface SlidingBannerProps {
  slides: Slide[];
}

const SlidingBanner: React.FC<SlidingBannerProps> = ({ slides }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
      setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }
  };

  return (
    <section className="relative w-full aspect-[396/114] overflow-hidden" dir="ltr">
      {/* Arrows */}
      <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl">❮</button>
      <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white text-2xl">❯</button>

      {/* Scrollable Slides */}
      <div
        ref={scrollRef}
        className="w-full h-full overflow-x-auto flex snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full aspect-[396/114] bg-cover bg-center flex flex-col items-center justify-center text-center text-white px-4 snap-start"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          ></div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-1 rounded-full ${activeIndex === index ? 'bg-[#EE7103]' : 'bg-gray-400'}`}
          ></span>
        ))}
      </div>
    </section>

  );
};

export default SlidingBanner;
