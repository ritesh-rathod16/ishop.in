"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselItems = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
    alt: "Featured Promotion 1",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg",
    alt: "Featured Promotion 2",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/81KqASAnj6L._SX3000_.jpg",
    alt: "Featured Promotion 3",
  },
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  return (
    <div 
      id="gw-desktop-herotator"
      className="relative w-full overflow-hidden group"
      style={{ height: "600px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="min-w-full h-full relative">
            <a href="#" className="block w-full h-full">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-[300px] w-[80px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF9900] z-20 group/btn"
        aria-label="Previous slide"
      >
        <div className="p-4 border-2 border-transparent group-hover/btn:border-white group-focus/btn:border-white rounded-sm">
          <ChevronLeft className="w-12 h-12 text-black/80 font-thin" strokeWidth={1} />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-[300px] w-[80px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF9900] z-20 group/btn"
        aria-label="Next slide"
      >
        <div className="p-4 border-2 border-transparent group-hover/btn:border-white group-focus/btn:border-white rounded-sm">
          <ChevronRight className="w-12 h-12 text-black/80 font-thin" strokeWidth={1} />
        </div>
      </button>

      <div 
        className="absolute bottom-0 left-0 right-0 h-[300px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(227, 230, 230, 0) 0%, rgba(227, 230, 230, 1) 100%)"
        }}
      />
      
      <div className="sr-only" aria-live="polite">
        Slide {currentIndex + 1} of {carouselItems.length}
      </div>
    </div>
  );
};

export default HeroCarousel;
