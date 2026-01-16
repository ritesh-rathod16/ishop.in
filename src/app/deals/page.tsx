"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Clock, Zap } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  rating?: number;
  reviews?: number;
  brand?: string;
}

export default function DealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          const dealsProducts = data.products.filter((p: Product) => p.discount && p.discount > 0);
          setProducts(dealsProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />
      
      <main className="max-w-[1500px] mx-auto p-4">
        <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white p-6 rounded-lg mb-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-[#febd69]" />
            <h1 className="text-[32px] font-bold">Today&apos;s Deals</h1>
          </div>
          <p className="text-[16px] text-gray-300">Discover daily deals and limited-time offers</p>
          <div className="flex items-center gap-2 mt-4 text-[14px]">
            <Clock className="w-5 h-5 text-[#febd69]" />
            <span>Deals refresh in: <strong className="text-[#febd69]">12:34:56</strong></span>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {['All Deals', 'Lightning Deals', 'Best Deals', 'Electronics', 'Fashion', 'Home'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap ${
                idx === 0
                  ? 'bg-[#131921] text-white'
                  : 'bg-white text-[#0F1111] border border-[#D5D9D9] hover:bg-[#f7fafa]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#565959]">Loading deals...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <p className="text-[#565959] text-lg mb-4">No deals available at the moment</p>
            <Link href="/" className="text-[#007185] hover:text-[#c7511f] hover:underline">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="bg-white rounded shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
              >
                {product.discount && product.discount >= 50 && (
                  <div className="bg-[#CC0C39] text-white text-[12px] font-bold px-2 py-1">
                    DEAL OF THE DAY
                  </div>
                )}
                <div className="p-4">
                  <div className="h-[200px] flex items-center justify-center mb-3 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="max-h-[180px] w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {product.discount && (
                      <span className="bg-[#CC0C39] text-white text-[12px] font-bold px-2 py-0.5 rounded">
                        {product.discount}% off
                      </span>
                    )}
                    <span className="text-[#CC0C39] text-[12px] font-bold uppercase">Limited time deal</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[22px] text-[#0F1111] font-medium">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-[14px] text-[#565959] line-through">
                        M.R.P.: {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[14px] text-[#0F1111] line-clamp-2 group-hover:text-[#c7511f] mb-2">
                    {product.name}
                  </h3>

                  {product.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[12px] text-[#007185]">({product.reviews?.toLocaleString()})</span>
                    </div>
                  )}

                  <div className="mt-2 bg-[#f0f2f2] rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#CC0C39] h-full rounded-full"
                      style={{ width: `${Math.random() * 60 + 40}%` }}
                    ></div>
                  </div>
                  <p className="text-[12px] text-[#565959] mt-1">
                    {Math.floor(Math.random() * 50 + 20)}% claimed
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <FooterMain />
    </div>
  );
}
