"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Cpu, ChevronRight } from 'lucide-react';

const categories = ['All', 'Mobiles', 'Laptops', 'TVs', 'Audio', 'Cameras', 'Wearables', 'Gaming', 'Accessories'];

const electronicsProducts = [
  { id: 'e1', name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium', price: 159900, originalPrice: 179900, discount: 11, rating: 4.5, reviews: 2340, image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg', category: 'Mobiles', brand: 'Apple' },
  { id: 'e2', name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone', price: 129999, originalPrice: 144999, discount: 10, rating: 4.3, reviews: 1850, image: 'https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg', category: 'Mobiles', brand: 'Samsung' },
  { id: 'e3', name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: 26990, originalPrice: 34990, discount: 23, rating: 4.6, reviews: 5420, image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg', category: 'Audio', brand: 'Sony' },
  { id: 'e4', name: 'Apple MacBook Air M3 Chip 13.6" Laptop', price: 114900, originalPrice: 119900, discount: 4, rating: 4.7, reviews: 890, image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg', category: 'Laptops', brand: 'Apple' },
  { id: 'e5', name: 'LG 55" 4K Ultra HD Smart OLED TV', price: 119990, originalPrice: 159990, discount: 25, rating: 4.4, reviews: 1230, image: 'https://m.media-amazon.com/images/I/81lACTkCOeL._SX679_.jpg', category: 'TVs', brand: 'LG' },
  { id: 'e6', name: 'boAt Airdopes 141 TWS Earbuds', price: 1299, originalPrice: 4490, discount: 71, rating: 3.9, reviews: 89450, image: 'https://m.media-amazon.com/images/I/51Q+JytbfCL._SX679_.jpg', category: 'Audio', brand: 'boAt' },
  { id: 'e7', name: 'PlayStation 5 Console (Disc Edition)', price: 49990, originalPrice: 54990, discount: 9, rating: 4.8, reviews: 12340, image: 'https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg', category: 'Gaming', brand: 'Sony' },
  { id: 'e8', name: 'Canon EOS R50 Mirrorless Camera', price: 69990, originalPrice: 79990, discount: 13, rating: 4.5, reviews: 560, image: 'https://m.media-amazon.com/images/I/61V9cz2ZmXL._SX679_.jpg', category: 'Cameras', brand: 'Canon' },
  { id: 'e9', name: 'Apple Watch Series 9 GPS 45mm', price: 44900, originalPrice: 49900, discount: 10, rating: 4.6, reviews: 3450, image: 'https://m.media-amazon.com/images/I/81+jNVOUsJL._SX679_.jpg', category: 'Wearables', brand: 'Apple' },
  { id: 'e10', name: 'Samsung Galaxy Watch 6 Classic 47mm', price: 34999, originalPrice: 44999, discount: 22, rating: 4.3, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71JU-bUt-sL._SX679_.jpg', category: 'Wearables', brand: 'Samsung' },
  { id: 'e11', name: 'JBL Flip 6 Portable Bluetooth Speaker', price: 9999, originalPrice: 14999, discount: 33, rating: 4.5, reviews: 8900, image: 'https://m.media-amazon.com/images/I/71r3e5L2bEL._SX679_.jpg', category: 'Audio', brand: 'JBL' },
  { id: 'e12', name: 'Dell Inspiron 15 Laptop Intel i5 12th Gen', price: 54990, originalPrice: 69990, discount: 21, rating: 4.2, reviews: 4560, image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg', category: 'Laptops', brand: 'Dell' },
  { id: 'e13', name: 'OnePlus Nord CE 4 Lite 5G (8GB RAM, 128GB)', price: 19999, originalPrice: 24999, discount: 20, rating: 4.2, reviews: 3450, image: 'https://m.media-amazon.com/images/I/71nYM8LSLBL._SX679_.jpg', category: 'Mobiles', brand: 'OnePlus' },
  { id: 'e14', name: 'Fire-Boltt Phoenix Smart Watch', price: 1499, originalPrice: 8999, discount: 83, rating: 4.0, reviews: 45230, image: 'https://m.media-amazon.com/images/I/61Iop+zPu8L._SX679_.jpg', category: 'Wearables', brand: 'Fire-Boltt' },
  { id: 'e15', name: 'Sony PlayStation 5 DualSense Controller', price: 5990, originalPrice: 6990, discount: 14, rating: 4.7, reviews: 8900, image: 'https://m.media-amazon.com/images/I/61Vo3YBWzEL._SX679_.jpg', category: 'Gaming', brand: 'Sony' },
  { id: 'e16', name: 'GoPro HERO12 Black Action Camera', price: 44990, originalPrice: 49990, discount: 10, rating: 4.5, reviews: 1230, image: 'https://m.media-amazon.com/images/I/61p2fow-SBL._SX679_.jpg', category: 'Cameras', brand: 'GoPro' },
];

export default function ElectronicsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? electronicsProducts 
    : electronicsProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Electronics</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Cpu className="w-10 h-10 text-[#febd69]" />
            Electronics Store
          </h1>
          <p className="text-lg opacity-90">Latest gadgets and devices at best prices</p>
        </div>
      </div>

      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#232f3e] text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Shop by Brand</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {['Apple', 'Samsung', 'Sony', 'LG', 'OnePlus', 'boAt', 'JBL', 'Dell', 'HP'].map((brand) => (
              <div key={brand} className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center hover:shadow-md cursor-pointer transition-shadow">
                <span className="font-bold text-sm text-center">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Showing {filteredProducts.length} products</p>
          <select className="border rounded-lg px-4 py-2 text-sm">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Customer Rating</option>
            <option>Discount</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#c45500] mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="bg-[#067D62] text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    {product.rating} <Star className="w-3 h-3 fill-white" />
                  </span>
                  <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-xs text-[#CC0C39]">{product.discount}% off</span>
                </div>
                <p className="text-xs text-[#007600] mt-2">FREE Delivery</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
