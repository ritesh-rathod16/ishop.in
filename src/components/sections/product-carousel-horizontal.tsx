"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  image: string;
  title: string;
  discountPrice?: string;
  originalPrice?: string;
  discountBadge?: string;
  tagline?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    image: "https://m.media-amazon.com/images/I/41S8eL6k61L._AC_SY200_.jpg",
    title: "Today's Deal: Smart Watch for Men and Women",
    discountPrice: "₹1,999",
    originalPrice: "₹4,999",
    discountBadge: "60% off",
    tagline: "Limited time deal"
  },
  {
    id: "2",
    image: "https://m.media-amazon.com/images/I/31S2OidFvAL._AC_SY200_.jpg",
    title: "Best Seller: Wireless Noise Cancelling Headphones",
    discountPrice: "₹12,490",
    originalPrice: "₹19,900",
    discountBadge: "37% off",
    tagline: "Top Brand"
  },
  {
    id: "3",
    image: "https://m.media-amazon.com/images/I/41-i2oM1fHL._AC_SY200_.jpg",
    title: "Recommended: Premium Tablet with Stylus Support",
    discountPrice: "₹32,999",
    originalPrice: "₹45,000",
    discountBadge: "27% off",
    tagline: "Great Indian Festival"
  },
  {
    id: "4",
    image: "https://m.media-amazon.com/images/I/41S8eL6k61L._AC_SY200_.jpg",
    title: "Fitness Tracker with Heart Rate Monitor",
    discountPrice: "₹2,499",
    originalPrice: "₹5,999",
    discountBadge: "58% off",
    tagline: "Best Deal"
  },
  {
    id: "5",
    image: "https://m.media-amazon.com/images/I/31S2OidFvAL._AC_SY200_.jpg",
    title: "Gaming Headset with 7.1 Surround Sound",
    discountPrice: "₹4,299",
    originalPrice: "₹6,999",
    discountBadge: "39% off",
    tagline: "Limited stock"
  },
  {
    id: "6",
    image: "https://m.media-amazon.com/images/I/41-i2oM1fHL._AC_SY200_.jpg",
    title: "Ultra HD Action Camera 4K",
    discountPrice: "₹8,990",
    originalPrice: "₹15,000",
    discountBadge: "40% off",
    tagline: "Prime Exclusive"
  },
  {
    id: "7",
    image: "https://m.media-amazon.com/images/I/41S8eL6k61L._AC_SY200_.jpg",
    title: "Bluetooth Speaker with 24H Playtime",
    discountPrice: "₹999",
    originalPrice: "₹2,999",
    discountBadge: "67% off",
    tagline: "Lightning Deal"
  }
];

const ProductCarouselHorizontal = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 800;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#E3E6E6] py-2 px-2 md:px-5">
      <div className="max-w-[1500px] mx-auto bg-white p-5 shadow-sm relative group">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-[21px] font-bold text-[#0F1111] leading-none mb-4">
            Today&apos;s Deals
          </h2>
          <a
            href="#"
            className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline"
          >
            See all deals
          </a>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-[#BBBFBF] rounded-sm w-[45px] h-[98px] flex items-center justify-center shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-white transition-colors invisible group-hover:visible"
            aria-label="Scroll left"
          >
            <ChevronLeft size={34} strokeWidth={1} className="text-[#0F1111]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[160px] md:w-[210px] snap-start cursor-pointer hover:opacity-90"
              >
                <div className="h-[200px] w-full flex items-center justify-center bg-[#F7F7F7] mb-3">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="max-h-[160px] w-auto object-contain"
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {product.discountBadge && (
                      <span className="bg-[#CC0C39] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm">
                        {product.discountBadge}
                      </span>
                    )}
                    <span className="text-[#CC0C39] text-[12px] font-bold uppercase tracking-tight">
                      {product.tagline}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-[18px] font-normal leading-none">
                      {product.discountPrice}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[12px] text-[#565959] line-through">
                        M.R.P.: {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] text-[#0F1111] line-clamp-1 leading-snug">
                    {product.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/90 border border-[#BBBFBF] rounded-sm w-[45px] h-[98px] flex items-center justify-center shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-white transition-colors invisible group-hover:visible"
            aria-label="Scroll right"
          >
            <ChevronRight size={34} strokeWidth={1} className="text-[#0F1111]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselHorizontal;
