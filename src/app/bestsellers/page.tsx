"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const categories = [
  'All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Books', 'Toys', 'Sports', 'Grocery', 'Baby', 'Pet Supplies'
];

const bestsellers = [
  { id: '1', rank: 1, name: 'boAt Airdopes 141 TWS Earbuds with 42H Playtime', price: 1299, originalPrice: 4490, discount: 71, rating: 3.9, reviews: 89450, image: 'https://m.media-amazon.com/images/I/51Q+JytbfCL._SX679_.jpg', category: 'Electronics' },
  { id: '2', rank: 2, name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium', price: 159900, originalPrice: 179900, discount: 11, rating: 4.5, reviews: 2340, image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg', category: 'Electronics' },
  { id: '3', rank: 3, name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone', price: 129999, originalPrice: 144999, discount: 10, rating: 4.3, reviews: 1850, image: 'https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg', category: 'Electronics' },
  { id: '4', rank: 4, name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 26990, originalPrice: 34990, discount: 23, rating: 4.6, reviews: 5420, image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg', category: 'Electronics' },
  { id: '5', rank: 5, name: 'Apple MacBook Air M3 Chip 13.6" Laptop', price: 114900, originalPrice: 119900, discount: 4, rating: 4.7, reviews: 890, image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg', category: 'Computers' },
  { id: '6', rank: 6, name: 'LG 55" 4K Ultra HD Smart OLED TV', price: 119990, originalPrice: 159990, discount: 25, rating: 4.4, reviews: 1230, image: 'https://m.media-amazon.com/images/I/81lACTkCOeL._SX679_.jpg', category: 'Electronics' },
  { id: '7', rank: 7, name: 'Nike Air Max 270 Running Shoes', price: 9995, originalPrice: 13995, discount: 29, rating: 4.2, reviews: 3420, image: 'https://m.media-amazon.com/images/I/71DUW2gU9uL._UX695_.jpg', category: 'Fashion' },
  { id: '8', rank: 8, name: "Levi's Men's 511 Slim Fit Jeans", price: 2799, originalPrice: 3999, discount: 30, rating: 4.1, reviews: 15670, image: 'https://m.media-amazon.com/images/I/71i0T-SU6QL._UY879_.jpg', category: 'Fashion' },
  { id: '9', rank: 9, name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 8999, originalPrice: 12999, discount: 31, rating: 4.5, reviews: 23450, image: 'https://m.media-amazon.com/images/I/71V1LrY1MSL._SX679_.jpg', category: 'Home & Kitchen' },
  { id: '10', rank: 10, name: 'Dyson V15 Detect Cordless Vacuum Cleaner', price: 62900, originalPrice: 72900, discount: 14, rating: 4.6, reviews: 4560, image: 'https://m.media-amazon.com/images/I/61KNXhtPbKL._SX679_.jpg', category: 'Home & Kitchen' },
  { id: '11', rank: 11, name: 'PlayStation 5 Console (Disc Edition)', price: 49990, originalPrice: 54990, discount: 9, rating: 4.8, reviews: 12340, image: 'https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg', category: 'Gaming' },
  { id: '12', rank: 12, name: 'Fire-Boltt Phoenix Smart Watch', price: 1499, originalPrice: 8999, discount: 83, rating: 4.0, reviews: 45230, image: 'https://m.media-amazon.com/images/I/61Iop+zPu8L._SX679_.jpg', category: 'Electronics' },
  { id: '13', rank: 13, name: 'Atomic Habits by James Clear', price: 399, originalPrice: 799, discount: 50, rating: 4.7, reviews: 156000, image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg', category: 'Books' },
  { id: '14', rank: 14, name: 'Samsung 253L Frost Free Double Door Refrigerator', price: 26990, originalPrice: 35990, discount: 25, rating: 4.3, reviews: 8970, image: 'https://m.media-amazon.com/images/I/71K3HIc8aJL._SX679_.jpg', category: 'Appliances' },
  { id: '15', rank: 15, name: 'OnePlus Nord CE 4 Lite 5G (8GB RAM, 128GB)', price: 19999, originalPrice: 24999, discount: 20, rating: 4.2, reviews: 3450, image: 'https://m.media-amazon.com/images/I/71nYM8LSLBL._SX679_.jpg', category: 'Electronics' },
  { id: '16', rank: 16, name: 'Noise ColorFit Pro 5 Smartwatch', price: 3999, originalPrice: 7999, discount: 50, rating: 4.1, reviews: 18900, image: 'https://m.media-amazon.com/images/I/61RJZynP6TL._SX679_.jpg', category: 'Electronics' },
  { id: '17', rank: 17, name: 'Philips Air Fryer HD9200/90', price: 6999, originalPrice: 9995, discount: 30, rating: 4.4, reviews: 21340, image: 'https://m.media-amazon.com/images/I/51Y29MZbq4L._SX679_.jpg', category: 'Home & Kitchen' },
  { id: '18', rank: 18, name: 'Prestige Iris 750W Mixer Grinder', price: 3299, originalPrice: 5495, discount: 40, rating: 4.2, reviews: 34560, image: 'https://m.media-amazon.com/images/I/51R4x0CzKIL._SX679_.jpg', category: 'Home & Kitchen' },
  { id: '19', rank: 19, name: 'Adidas Men Ultraboost Running Shoes', price: 12999, originalPrice: 19999, discount: 35, rating: 4.5, reviews: 5670, image: 'https://m.media-amazon.com/images/I/71P-1TrOvzL._UX695_.jpg', category: 'Fashion' },
  { id: '20', rank: 20, name: 'JBL Flip 6 Portable Bluetooth Speaker', price: 9999, originalPrice: 14999, discount: 33, rating: 4.5, reviews: 8900, image: 'https://m.media-amazon.com/images/I/71r3e5L2bEL._SX679_.jpg', category: 'Electronics' },
];

export default function BestsellersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [timeFrame, setTimeFrame] = useState('daily');

  const filteredProducts = selectedCategory === 'All' 
    ? bestsellers 
    : bestsellers.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <HeaderNavigation />
      
      <div className="bg-[#232f3e] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#febd69]">Best Sellers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="text-[#febd69]" />
              iShop Best Sellers
            </h1>
            <p className="text-gray-600 mt-1">Our most popular products based on sales. Updated hourly.</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Last updated: 2 minutes ago</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['hourly', 'daily', 'weekly', 'monthly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-4 py-2 rounded-full text-sm capitalize whitespace-nowrap ${
                timeFrame === tf
                  ? 'bg-[#232f3e] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tf} Rankings
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4 sticky top-4">
              <h3 className="font-bold mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded text-sm ${
                      selectedCategory === cat
                        ? 'bg-[#febd69] font-medium'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow relative group"
                >
                  <div className="absolute top-2 left-2 z-10">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                      product.rank <= 3 ? 'bg-[#CC0C39]' : product.rank <= 10 ? 'bg-[#febd69] text-[#0F1111]' : 'bg-gray-400'
                    }`}>
                      #{product.rank}
                    </span>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-[#c45500] mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#007185]">({product.reviews.toLocaleString()})</span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs text-[#CC0C39]">({product.discount}% off)</span>
                  </div>

                  <div className="mt-2 text-xs text-[#007600]">FREE Delivery</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#232f3e] to-[#37475a] rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">New & Trending</h2>
          <p className="text-gray-300 mb-6">Discover products that are gaining popularity right now</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {bestsellers.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-lg p-3 text-[#0F1111] hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="h-24 w-full object-contain mb-2" />
                <p className="text-xs line-clamp-2">{product.name}</p>
                <p className="text-sm font-bold mt-1">₹{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
