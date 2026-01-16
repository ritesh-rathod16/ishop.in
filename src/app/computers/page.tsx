"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Monitor, ChevronRight } from 'lucide-react';

const categories = ['All', 'Laptops', 'Desktops', 'Monitors', 'Keyboards', 'Mice', 'Storage', 'Networking', 'Accessories'];

const computers = [
  { id: 'c1', name: 'Apple MacBook Air M3 Chip 13.6" Laptop', price: 114900, originalPrice: 119900, discount: 4, rating: 4.7, reviews: 890, image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg', category: 'Laptops', brand: 'Apple', specs: 'M3 Chip • 8GB RAM • 256GB SSD' },
  { id: 'c2', name: 'Dell Inspiron 15 Laptop Intel i5 12th Gen', price: 54990, originalPrice: 69990, discount: 21, rating: 4.2, reviews: 4560, image: 'https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg', category: 'Laptops', brand: 'Dell', specs: 'i5-1235U • 8GB RAM • 512GB SSD' },
  { id: 'c3', name: 'ASUS ROG Strix G16 Gaming Laptop', price: 129990, originalPrice: 149990, discount: 13, rating: 4.5, reviews: 1230, image: 'https://m.media-amazon.com/images/I/81GrCeuCzxL._SX679_.jpg', category: 'Laptops', brand: 'ASUS', specs: 'i7-13650HX • RTX 4060 • 16GB RAM' },
  { id: 'c4', name: 'HP Pavilion Gaming Desktop PC', price: 74990, originalPrice: 89990, discount: 17, rating: 4.3, reviews: 890, image: 'https://m.media-amazon.com/images/I/71LXKEX1wSL._SX679_.jpg', category: 'Desktops', brand: 'HP', specs: 'i5-12400F • RTX 3060 • 16GB RAM' },
  { id: 'c5', name: 'LG UltraGear 27" QHD Gaming Monitor', price: 24999, originalPrice: 34999, discount: 29, rating: 4.6, reviews: 3450, image: 'https://m.media-amazon.com/images/I/81MP2t-pdOL._SX679_.jpg', category: 'Monitors', brand: 'LG', specs: '27" QHD • 165Hz • 1ms • IPS' },
  { id: 'c6', name: 'Logitech MX Keys Wireless Keyboard', price: 12995, originalPrice: 14995, discount: 13, rating: 4.5, reviews: 5670, image: 'https://m.media-amazon.com/images/I/71gOLjpVLbL._SX679_.jpg', category: 'Keyboards', brand: 'Logitech', specs: 'Wireless • Backlit • Multi-device' },
  { id: 'c7', name: 'Logitech MX Master 3S Wireless Mouse', price: 9995, originalPrice: 11995, discount: 17, rating: 4.7, reviews: 7890, image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._SX679_.jpg', category: 'Mice', brand: 'Logitech', specs: '8K DPI • Quiet Clicks • USB-C' },
  { id: 'c8', name: 'Samsung 990 PRO 2TB NVMe SSD', price: 16999, originalPrice: 22999, discount: 26, rating: 4.8, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71k9rnDCdQL._SX679_.jpg', category: 'Storage', brand: 'Samsung', specs: '7450MB/s Read • PCIe 4.0' },
  { id: 'c9', name: 'Lenovo IdeaPad Slim 3 Laptop', price: 42990, originalPrice: 56990, discount: 25, rating: 4.1, reviews: 6780, image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg', category: 'Laptops', brand: 'Lenovo', specs: 'Ryzen 5 7520U • 8GB RAM • 512GB SSD' },
  { id: 'c10', name: 'BenQ MOBIUZ 27" 4K Gaming Monitor', price: 54999, originalPrice: 64999, discount: 15, rating: 4.6, reviews: 890, image: 'https://m.media-amazon.com/images/I/81sU4mEcwtL._SX679_.jpg', category: 'Monitors', brand: 'BenQ', specs: '27" 4K • 144Hz • 1ms • HDR' },
  { id: 'c11', name: 'Razer BlackWidow V4 Pro Keyboard', price: 22999, originalPrice: 27999, discount: 18, rating: 4.5, reviews: 1230, image: 'https://m.media-amazon.com/images/I/71JqOQjVQRL._SX679_.jpg', category: 'Keyboards', brand: 'Razer', specs: 'Mechanical • RGB • Wrist Rest' },
  { id: 'c12', name: 'WD Black 4TB Gaming HDD', price: 9999, originalPrice: 13999, discount: 29, rating: 4.4, reviews: 4560, image: 'https://m.media-amazon.com/images/I/71Sb2KoZLzL._SX679_.jpg', category: 'Storage', brand: 'WD', specs: '7200RPM • 256MB Cache' },
  { id: 'c13', name: 'ASUS WiFi 6 Router AX3000', price: 8999, originalPrice: 11999, discount: 25, rating: 4.3, reviews: 3450, image: 'https://m.media-amazon.com/images/I/61VqMp-qRXL._SX679_.jpg', category: 'Networking', brand: 'ASUS', specs: 'WiFi 6 • AX3000 • MU-MIMO' },
  { id: 'c14', name: 'Seagate Expansion 2TB Portable HDD', price: 5499, originalPrice: 7499, discount: 27, rating: 4.2, reviews: 23450, image: 'https://m.media-amazon.com/images/I/81tjLksKixL._SX679_.jpg', category: 'Storage', brand: 'Seagate', specs: '2TB • USB 3.0 • Portable' },
  { id: 'c15', name: 'Corsair K70 RGB Pro Mechanical Keyboard', price: 15999, originalPrice: 19999, discount: 20, rating: 4.6, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71OlC8or4vL._SX679_.jpg', category: 'Keyboards', brand: 'Corsair', specs: 'Cherry MX • RGB • Aluminum' },
  { id: 'c16', name: 'SteelSeries Aerox 3 Wireless Gaming Mouse', price: 7999, originalPrice: 10999, discount: 27, rating: 4.4, reviews: 1890, image: 'https://m.media-amazon.com/images/I/61t+pE0DNCL._SX679_.jpg', category: 'Mice', brand: 'SteelSeries', specs: '18K DPI • 68g • 200hr Battery' },
];

export default function ComputersPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? computers 
    : computers.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Computers</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Monitor className="w-10 h-10 text-cyan-400" />
            Computers & Accessories
          </h1>
          <p className="text-lg opacity-90">Laptops, desktops, peripherals & more</p>
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
                  ? 'bg-slate-800 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
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
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#c45500] mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{product.specs}</p>
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
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
