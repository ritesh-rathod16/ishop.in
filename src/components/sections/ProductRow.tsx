"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Zap, Clock } from "lucide-react";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  prime?: boolean;
  badge?: string;
  countdown?: string;
}

interface ProductRowProps {
  title: string;
  seeAllLink: string;
  products: Product[];
  variant?: 'default' | 'deals' | 'sponsored' | 'compact';
  showTimer?: boolean;
}

const ProductRow: React.FC<ProductRowProps> = ({ 
  title, 
  seeAllLink, 
  products, 
  variant = 'default',
  showTimer = false 
}) => {
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
    <div className="bg-white p-5 shadow-sm relative group">
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[21px] font-bold text-[#0F1111] leading-none">
            {title}
          </h2>
          {showTimer && (
            <div className="flex items-center gap-1 text-[#CC0C39] text-sm">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Ends in 05:23:45</span>
            </div>
          )}
        </div>
        <Link
          href={seeAllLink}
          className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline"
        >
          See all deals
        </Link>
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
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={`flex-none snap-start cursor-pointer group/card ${
                variant === 'compact' ? 'w-[140px]' : 'w-[180px] md:w-[220px]'
              }`}
            >
              <div className={`relative bg-[#F7F7F7] flex items-center justify-center ${
                variant === 'compact' ? 'h-[140px]' : 'h-[200px]'
              }`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[85%] w-auto object-contain group-hover/card:scale-105 transition-transform"
                />
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
                    {product.badge}
                  </span>
                )}
                {product.prime && (
                  <span className="absolute bottom-2 left-2 bg-[#232f3e] text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Zap className="w-3 h-3 fill-[#febd69] text-[#febd69]" /> Prime
                  </span>
                )}
              </div>
              
              <div className="mt-2 space-y-1">
                {product.discount && variant === 'deals' && (
                  <div className="flex items-center gap-2">
                    <span className="bg-[#CC0C39] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.discount}% off
                    </span>
                    <span className="text-[#CC0C39] text-[11px] font-medium uppercase">
                      Limited time
                    </span>
                  </div>
                )}
                
                <div className="flex items-baseline gap-1">
                  <span className="text-[18px] font-medium">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-[12px] text-[#565959] line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-[13px] text-[#0F1111] line-clamp-2 leading-snug group-hover/card:text-[#C7511F]">
                  {product.title}
                </p>

                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating!) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    {product.reviews && (
                      <span className="text-[12px] text-[#007185]">({product.reviews.toLocaleString()})</span>
                    )}
                  </div>
                )}

                {variant === 'sponsored' && (
                  <span className="text-[10px] text-gray-400">Sponsored</span>
                )}
              </div>
            </Link>
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
  );
};

export default ProductRow;
