"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Home, ChevronRight } from 'lucide-react';

const categories = ['All', 'Kitchen Appliances', 'Cookware', 'Furniture', 'Home Decor', 'Bedding', 'Storage', 'Cleaning'];

const homeProducts = [
  { id: 'h1', name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 8999, originalPrice: 12999, discount: 31, rating: 4.5, reviews: 23450, image: 'https://m.media-amazon.com/images/I/71V1LrY1MSL._SX679_.jpg', category: 'Kitchen Appliances', brand: 'Instant Pot' },
  { id: 'h2', name: 'Dyson V15 Detect Cordless Vacuum Cleaner', price: 62900, originalPrice: 72900, discount: 14, rating: 4.6, reviews: 4560, image: 'https://m.media-amazon.com/images/I/61KNXhtPbKL._SX679_.jpg', category: 'Cleaning', brand: 'Dyson' },
  { id: 'h3', name: 'Philips Air Fryer HD9200/90', price: 6999, originalPrice: 9995, discount: 30, rating: 4.4, reviews: 21340, image: 'https://m.media-amazon.com/images/I/51Y29MZbq4L._SX679_.jpg', category: 'Kitchen Appliances', brand: 'Philips' },
  { id: 'h4', name: 'Prestige Iris 750W Mixer Grinder', price: 3299, originalPrice: 5495, discount: 40, rating: 4.2, reviews: 34560, image: 'https://m.media-amazon.com/images/I/51R4x0CzKIL._SX679_.jpg', category: 'Kitchen Appliances', brand: 'Prestige' },
  { id: 'h5', name: 'Samsung 253L Frost Free Double Door Refrigerator', price: 26990, originalPrice: 35990, discount: 25, rating: 4.3, reviews: 8970, image: 'https://m.media-amazon.com/images/I/71K3HIc8aJL._SX679_.jpg', category: 'Kitchen Appliances', brand: 'Samsung' },
  { id: 'h6', name: 'Hawkins Stainless Steel Pressure Cooker 5L', price: 2499, originalPrice: 3499, discount: 29, rating: 4.5, reviews: 45670, image: 'https://m.media-amazon.com/images/I/71uVA89FKTL._SX679_.jpg', category: 'Cookware', brand: 'Hawkins' },
  { id: 'h7', name: 'IKEA MALM Bed Frame Queen Size', price: 15999, originalPrice: 19999, discount: 20, rating: 4.3, reviews: 3450, image: 'https://m.media-amazon.com/images/I/71HBSNMKvnL._SX679_.jpg', category: 'Furniture', brand: 'IKEA' },
  { id: 'h8', name: 'Pigeon Non-Stick Cookware Set 7 Pcs', price: 1499, originalPrice: 2999, discount: 50, rating: 4.1, reviews: 23450, image: 'https://m.media-amazon.com/images/I/71KJV1fKmjL._SX679_.jpg', category: 'Cookware', brand: 'Pigeon' },
  { id: 'h9', name: 'Solimo 100% Cotton Double Bedsheet', price: 799, originalPrice: 1499, discount: 47, rating: 4.0, reviews: 56780, image: 'https://m.media-amazon.com/images/I/81xp7JKAH4L._SX679_.jpg', category: 'Bedding', brand: 'Solimo' },
  { id: 'h10', name: 'Godrej Interio Study Table', price: 8999, originalPrice: 12999, discount: 31, rating: 4.2, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71bKTHxvPwL._SX679_.jpg', category: 'Furniture', brand: 'Godrej' },
  { id: 'h11', name: 'Butterfly Rapid Glass Top Gas Stove 3 Burner', price: 3999, originalPrice: 5999, discount: 33, rating: 4.3, reviews: 12340, image: 'https://m.media-amazon.com/images/I/61qL2qLvVdL._SX679_.jpg', category: 'Kitchen Appliances', brand: 'Butterfly' },
  { id: 'h12', name: 'Milton Thermosteel Flask 1000ml', price: 799, originalPrice: 1299, discount: 39, rating: 4.4, reviews: 34560, image: 'https://m.media-amazon.com/images/I/61tL8H9zUBL._SX679_.jpg', category: 'Storage', brand: 'Milton' },
  { id: 'h13', name: 'Urban Ladder Sheesham Wood Coffee Table', price: 12999, originalPrice: 18999, discount: 32, rating: 4.4, reviews: 1890, image: 'https://m.media-amazon.com/images/I/61l0LhMu5hL._SX679_.jpg', category: 'Furniture', brand: 'Urban Ladder' },
  { id: 'h14', name: 'Borosil Glass Lunch Box Set of 4', price: 1299, originalPrice: 1999, discount: 35, rating: 4.3, reviews: 8970, image: 'https://m.media-amazon.com/images/I/71V0SQA2lYL._SX679_.jpg', category: 'Storage', brand: 'Borosil' },
  { id: 'h15', name: 'Wipro LED Bulb 9W Pack of 6', price: 499, originalPrice: 899, discount: 45, rating: 4.2, reviews: 45670, image: 'https://m.media-amazon.com/images/I/61XNRtlPqGL._SX679_.jpg', category: 'Home Decor', brand: 'Wipro' },
  { id: 'h16', name: 'Scotch-Brite Heavy Duty Scrub Sponge Pack of 6', price: 199, originalPrice: 299, discount: 33, rating: 4.1, reviews: 78900, image: 'https://m.media-amazon.com/images/I/71QSJhJlY6L._SX679_.jpg', category: 'Cleaning', brand: 'Scotch-Brite' },
];

export default function HomeKitchenPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? homeProducts 
    : homeProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Home & Kitchen</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Home className="w-10 h-10" />
            Home & Kitchen
          </h1>
          <p className="text-lg opacity-90">Everything for your home at great prices</p>
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
                  ? 'bg-orange-500 text-white'
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
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
