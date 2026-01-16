"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderNavigation from "@/components/sections/header-navigation";
import FooterMain from "@/components/sections/footer-main";
import Link from 'next/link';
import { Star } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          // Fallback to mock data if no results (likely DB connection issue)
          const mockProducts = [
            {
              _id: '1',
              name: 'Apple iPhone 15 Pro Max (256GB)',
              price: 159900,
              originalPrice: 179900,
              discount: 11,
              image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg',
              rating: 4.5,
              reviews: 2340,
              brand: 'Apple'
            },
            {
              _id: '2',
              name: 'Samsung Galaxy S24 Ultra 5G',
              price: 129999,
              originalPrice: 144999,
              discount: 10,
              image: 'https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg',
              rating: 4.3,
              reviews: 1850,
              brand: 'Samsung'
            }
          ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <HeaderNavigation />
      <main className="max-w-[1500px] mx-auto p-4">
        <div className="mb-4">
          <span className="text-[14px] text-[#565959]">1-16 of over 1,000 results for <span className="text-[#c45500] font-bold">"{query}"</span></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar filters (simplified) */}
          <div className="hidden md:block col-span-1 border-r pr-4">
            <h3 className="font-bold text-[14px] mb-2">Category</h3>
            <ul className="text-[14px] space-y-1 mb-4">
              <li className="hover:text-[#c45500] cursor-pointer">Electronics</li>
              <li className="hover:text-[#c45500] cursor-pointer">Mobiles & Accessories</li>
              <li className="hover:text-[#c45500] cursor-pointer">Computers & Accessories</li>
            </ul>
            
            <h3 className="font-bold text-[14px] mb-2">Customer Review</h3>
            <div className="space-y-1 mb-4">
              {[4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center text-[13px] hover:text-[#c45500] cursor-pointer">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < star ? "#febd69" : "none"} stroke={i < star ? "#febd69" : "#565959"} />
                    ))}
                  </div>
                  <span>& Up</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results grid */}
          <div className="col-span-1 md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#232f3e]"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="space-y-6">
                {products.map((product) => (
                  <div key={product._id} className="flex border rounded p-4 gap-6 hover:shadow-md transition-shadow">
                    <Link href={`/product/${product._id}`} className="w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                    </Link>
                    <div className="flex-grow">
                      <Link href={`/product/${product._id}`}>
                        <h2 className="text-[18px] font-medium text-[#0f1111] hover:text-[#c45500] cursor-pointer mb-1">
                          {product.name}
                        </h2>
                      </Link>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#febd69" : "none"} stroke={i < Math.floor(product.rating) ? "#febd69" : "#565959"} />
                          ))}
                        </div>
                        <span className="text-[#007185] text-[14px]">{product.reviews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[28px] text-[#0f1111] leading-none font-medium">
                          <span className="text-[13px] align-top mt-1 mr-1">₹</span>
                          {product.price.toLocaleString()}
                        </span>
                        <span className="text-[14px] text-[#565959] line-through">
                          M.R.P: ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-[14px] text-[#0f1111]">
                          ({product.discount}% off)
                        </span>
                      </div>
                      <div className="text-[14px] text-[#565959] mb-4">
                        FREE delivery by <span className="font-bold">Tomorrow, 12 March</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-2">No results for {query}</h2>
                <p className="text-[#565959]">Check your spelling or use more general terms</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterMain />
    </div>
  );
}
