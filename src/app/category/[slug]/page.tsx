"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Filter } from 'lucide-react';

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

const categoryTitles: Record<string, string> = {
  'electronics': 'Electronics',
  'fashion': 'Fashion',
  'home-kitchen': 'Home & Kitchen',
  'mobiles': 'Mobiles & Smartphones',
  'best-sellers': 'Best Sellers',
  'fresh': 'Fresh Groceries',
  'minitv': 'iShop miniTV',
  'appliances': 'Appliances',
  'gaming': 'Gaming',
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = categoryTitles[slug] || slug;
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

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
        <div className="flex gap-4">
          <aside className="w-[220px] flex-shrink-0 hidden lg:block">
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="text-[16px] font-bold text-[#0F1111] mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              
              <div className="border-t pt-3">
                <h4 className="text-[14px] font-bold text-[#0F1111] mb-2">Customer Reviews</h4>
                {[4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < stars ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-[12px] ml-1">& Up</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="border-t pt-3 mt-3">
                <h4 className="text-[14px] font-bold text-[#0F1111] mb-2">Price</h4>
                <div className="space-y-1 text-[13px]">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    Under ₹1,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    ₹1,000 - ₹5,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    ₹5,000 - ₹10,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    ₹10,000 - ₹20,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                    <input type="checkbox" className="w-4 h-4" />
                    Over ₹20,000
                  </label>
                </div>
              </div>

              <div className="border-t pt-3 mt-3">
                <h4 className="text-[14px] font-bold text-[#0F1111] mb-2">Discount</h4>
                <div className="space-y-1 text-[13px]">
                  {['10%', '25%', '35%', '50%'].map((discount) => (
                    <label key={discount} className="flex items-center gap-2 cursor-pointer hover:text-[#c7511f]">
                      <input type="checkbox" className="w-4 h-4" />
                      {discount} Off or more
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h1 className="text-[24px] font-bold text-[#0F1111]">
                {categoryTitles[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-[14px] text-[#565959]">
                {loading ? 'Loading...' : `${products.length} results`}
              </p>
            </div>

            {loading ? (
              <div className="bg-white p-8 rounded shadow-sm text-center">
                <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-[#565959]">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white p-8 rounded shadow-sm text-center">
                <p className="text-[#565959] text-lg mb-4">No products found in this category</p>
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
                    className="bg-white p-4 rounded shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="h-[200px] flex items-center justify-center mb-3 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="max-h-[180px] w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-[14px] text-[#0F1111] line-clamp-2 group-hover:text-[#c7511f] mb-2">
                      {product.name}
                    </h3>
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-1">
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-[18px] text-[#0F1111]">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-[12px] text-[#565959] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="text-[12px] text-[#CC0C39]">({product.discount}% off)</span>
                    )}
                    <p className="text-[12px] text-[#565959] mt-1">FREE Delivery by iShop</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <FooterMain />
    </div>
  );
}
