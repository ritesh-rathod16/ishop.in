"use client";

import { useState, useEffect } from "react";
import HeaderNavigation from "@/components/sections/header-navigation";
import HeroCarousel from "@/components/sections/hero-carousel";
import CategoryGridCards from "@/components/sections/category-grid-cards";
import ProductRow from "@/components/sections/ProductRow";
import FooterMain from "@/components/sections/footer-main";
import Link from "next/link";

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
}

interface HomepageData {
  todaysDeals: Product[];
  mobilePhones: Product[];
  fashionProducts: Product[];
  bestsellers: Product[];
  homeKitchen: Product[];
  computers: Product[];
  gaming: Product[];
  sponsoredProducts: Product[];
}

const fallbackDeals: Product[] = [
  { id: 'd1', image: 'https://m.media-amazon.com/images/I/51Q+JytbfCL._SX679_.jpg', title: 'boAt Airdopes 141 TWS Earbuds with 42H Playtime', price: 1299, originalPrice: 4490, discount: 71, rating: 3.9, reviews: 89450, prime: true, badge: '71% off' },
  { id: 'd2', image: 'https://m.media-amazon.com/images/I/61Iop+zPu8L._SX679_.jpg', title: 'Fire-Boltt Phoenix Smart Watch 1.3" Display', price: 1499, originalPrice: 8999, discount: 83, rating: 4.0, reviews: 45230, prime: true, badge: '83% off' },
  { id: 'd3', image: 'https://m.media-amazon.com/images/I/71r3e5L2bEL._SX679_.jpg', title: 'JBL Flip 6 Portable Bluetooth Speaker IP67', price: 9999, originalPrice: 14999, discount: 33, rating: 4.5, reviews: 8900, prime: true, badge: '33% off' },
  { id: 'd4', image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg', title: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: 26990, originalPrice: 34990, discount: 23, rating: 4.6, reviews: 5420, prime: true, badge: '23% off' },
];

export default function Home() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products/homepage');
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error('Failed to fetch homepage products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const todaysDeals = data?.todaysDeals || fallbackDeals;
  const mobilePhones = data?.mobilePhones || [];
  const fashionProducts = data?.fashionProducts || [];
  const bestsellers = data?.bestsellers || [];
  const homeKitchen = data?.homeKitchen || [];
  const computers = data?.computers || [];
  const gaming = data?.gaming || [];
  const sponsoredProducts = data?.sponsoredProducts || [];

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />
      <main>
        <HeroCarousel />
        <CategoryGridCards />
        
        <div className="max-w-[1500px] mx-auto px-2 md:px-5 space-y-4 pb-8">
          <ProductRow 
            title="Today's Deals" 
            seeAllLink="/deals" 
            products={todaysDeals} 
            variant="deals"
            showTimer={true}
          />

          <ProductRow 
            title="Best Sellers in Mobiles" 
            seeAllLink="/mobiles" 
            products={mobilePhones} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <ProductRow 
                title="Up to 60% off | Fashion & Accessories" 
                seeAllLink="/fashion" 
                products={fashionProducts} 
              />
            </div>
            <div className="bg-white p-5 shadow-sm">
              <h2 className="text-[21px] font-bold text-[#0F1111] mb-3">Sign in for the best experience</h2>
              <Link href="/login" className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-center py-2 rounded-lg text-sm font-medium mb-3">
                Sign in securely
              </Link>
              <Link href="/register" className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline">
                Create an account
              </Link>
              <div className="mt-6 border-t pt-4">
                <h3 className="font-bold text-sm mb-2">iShop Prime Benefits</h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>✓ FREE Delivery on orders over ₹499</li>
                  <li>✓ Exclusive deals & early access</li>
                  <li>✓ Prime Video streaming</li>
                  <li>✓ Prime Music ad-free</li>
                </ul>
                <Link href="/prime" className="text-xs text-[#007185] hover:underline mt-2 block">
                  Try Prime →
                </Link>
              </div>
            </div>
          </div>

          <ProductRow 
            title="Inspired by your browsing history" 
            seeAllLink="/bestsellers" 
            products={bestsellers} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Deals in Electronics', link: '/electronics', image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg' },
              { title: 'Beauty picks', link: '/beauty', image: 'https://m.media-amazon.com/images/I/71XKEk+M7IL._UY879_.jpg' },
              { title: 'New arrivals in Toys', link: '/new-releases', image: 'https://m.media-amazon.com/images/I/51G1aOiJi+L._SY466_.jpg' },
              { title: 'Top picks in Books', link: '/books', image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg' },
            ].map((item, idx) => (
              <Link key={idx} href={item.link} className="bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-[#0F1111] mb-3">{item.title}</h3>
                <div className="h-48 bg-[#F7F7F7] flex items-center justify-center mb-3">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-[13px] text-[#007185] hover:text-[#C7511F]">See more</span>
              </Link>
            ))}
          </div>

          <ProductRow 
            title="Up to 40% off | Home & Kitchen" 
            seeAllLink="/home-kitchen" 
            products={homeKitchen} 
          />

          <ProductRow 
            title="Computers & Accessories" 
            seeAllLink="/computers" 
            products={computers} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Gaming accessories', items: ['Controllers', 'Headsets', 'Keyboards', 'Monitors'], link: '/gaming' },
              { title: 'Automotive essentials', items: ['Car accessories', 'Bike accessories', 'Car care', 'Helmets'], link: '/automotive' },
              { title: 'Pet supplies', items: ['Dog food', 'Cat food', 'Pet toys', 'Accessories'], link: '/pets' },
              { title: 'Baby products', items: ['Diapers', 'Baby food', 'Strollers', 'Baby care'], link: '/baby' },
            ].map((section, idx) => (
              <div key={idx} className="bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-[#0F1111] mb-3">{section.title}</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {section.items.map((item, i) => (
                    <Link key={i} href={`${section.link}?category=${item.toLowerCase().replace(' ', '-')}`} className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline py-1">
                      {item}
                    </Link>
                  ))}
                </div>
                <Link href={section.link} className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline">
                  See all
                </Link>
              </div>
            ))}
          </div>

          <ProductRow 
            title="Gaming Zone | Up to 30% off" 
            seeAllLink="/gaming" 
            products={gaming} 
          />

          <ProductRow 
            title="Sponsored products related to your recent views" 
            seeAllLink="/search" 
            products={sponsoredProducts} 
            variant="sponsored"
          />

          <div className="bg-white p-5 shadow-sm">
            <h2 className="text-[21px] font-bold text-[#0F1111] mb-4">Popular brands</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'boAt', 'OnePlus', 'LG', 'Dell', 'HP', 'Philips', 'Prestige', 'Titan', 'Fossil', 'Puma', "Levi's"].map((brand, idx) => (
                <Link key={idx} href={`/search?q=${brand.toLowerCase()}`} className="bg-[#F7F7F7] p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                  <span className="text-sm font-medium text-[#0F1111]">{brand}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] rounded-lg p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-3">Become an iShop Seller</h2>
              <p className="text-gray-300 mb-6">Reach millions of customers and grow your business with India&apos;s most trusted marketplace</p>
              <div className="flex justify-center gap-4">
                <Link href="/sell" className="bg-[#febd69] hover:bg-[#f3a847] text-[#0F1111] px-6 py-3 rounded-lg font-bold">
                  Start Selling
                </Link>
                <Link href="/sell" className="border border-white/50 hover:bg-white/10 px-6 py-3 rounded-lg font-medium">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterMain />
    </div>
  );
}
