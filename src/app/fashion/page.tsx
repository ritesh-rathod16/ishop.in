"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Sparkles, ChevronRight } from 'lucide-react';

const categories = ['All', 'Men', 'Women', 'Kids', 'Footwear', 'Watches', 'Bags', 'Accessories'];

const fashionProducts = [
  { id: 'f1', name: 'Nike Air Max 270 Running Shoes', price: 9995, originalPrice: 13995, discount: 29, rating: 4.2, reviews: 3420, image: 'https://m.media-amazon.com/images/I/71DUW2gU9uL._UX695_.jpg', category: 'Footwear', brand: 'Nike', isNew: false },
  { id: 'f2', name: "Levi's Men's 511 Slim Fit Jeans", price: 2799, originalPrice: 3999, discount: 30, rating: 4.1, reviews: 15670, image: 'https://m.media-amazon.com/images/I/71i0T-SU6QL._UY879_.jpg', category: 'Men', brand: "Levi's", isNew: false },
  { id: 'f3', name: 'Adidas Men Ultraboost Running Shoes', price: 12999, originalPrice: 19999, discount: 35, rating: 4.5, reviews: 5670, image: 'https://m.media-amazon.com/images/I/71P-1TrOvzL._UX695_.jpg', category: 'Footwear', brand: 'Adidas', isNew: true },
  { id: 'f4', name: 'Fossil Gen 6 Smartwatch for Men', price: 19995, originalPrice: 29995, discount: 33, rating: 4.3, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71MQRqCQMtL._UX679_.jpg', category: 'Watches', brand: 'Fossil', isNew: true },
  { id: 'f5', name: 'Peter England Men Formal Shirt', price: 1299, originalPrice: 1999, discount: 35, rating: 4.0, reviews: 8900, image: 'https://m.media-amazon.com/images/I/61bKJEiJ5mL._UX679_.jpg', category: 'Men', brand: 'Peter England', isNew: false },
  { id: 'f6', name: 'Puma Women Running Shoes', price: 3499, originalPrice: 5999, discount: 42, rating: 4.2, reviews: 4560, image: 'https://m.media-amazon.com/images/I/71bAMhDY9wL._UX695_.jpg', category: 'Footwear', brand: 'Puma', isNew: false },
  { id: 'f7', name: 'Allen Solly Women Formal Trousers', price: 1899, originalPrice: 2999, discount: 37, rating: 4.1, reviews: 3210, image: 'https://m.media-amazon.com/images/I/51mWGVJ6VdL._UY879_.jpg', category: 'Women', brand: 'Allen Solly', isNew: false },
  { id: 'f8', name: 'US Polo Assn Men Polo T-Shirt', price: 999, originalPrice: 1899, discount: 47, rating: 4.0, reviews: 12340, image: 'https://m.media-amazon.com/images/I/61hh4tbYLpL._UX679_.jpg', category: 'Men', brand: 'US Polo', isNew: false },
  { id: 'f9', name: 'Titan Analog Watch for Women', price: 4995, originalPrice: 7495, discount: 33, rating: 4.4, reviews: 5670, image: 'https://m.media-amazon.com/images/I/71qlRyGb1qL._UY879_.jpg', category: 'Watches', brand: 'Titan', isNew: true },
  { id: 'f10', name: 'Wildcraft Laptop Backpack', price: 1499, originalPrice: 2495, discount: 40, rating: 4.2, reviews: 7890, image: 'https://m.media-amazon.com/images/I/71cWJKRqh7L._SX679_.jpg', category: 'Bags', brand: 'Wildcraft', isNew: false },
  { id: 'f11', name: 'Fabindia Women Kurta Set', price: 2499, originalPrice: 3999, discount: 38, rating: 4.3, reviews: 4560, image: 'https://m.media-amazon.com/images/I/71XKEk+M7IL._UY879_.jpg', category: 'Women', brand: 'Fabindia', isNew: true },
  { id: 'f12', name: "Skechers Men's Go Walk Shoes", price: 4999, originalPrice: 7999, discount: 38, rating: 4.4, reviews: 9870, image: 'https://m.media-amazon.com/images/I/81GNQH5U1kL._UX695_.jpg', category: 'Footwear', brand: 'Skechers', isNew: false },
  { id: 'f13', name: 'Tommy Hilfiger Men Leather Belt', price: 1999, originalPrice: 3499, discount: 43, rating: 4.2, reviews: 3450, image: 'https://m.media-amazon.com/images/I/71HMqZj7LCL._UX679_.jpg', category: 'Accessories', brand: 'Tommy Hilfiger', isNew: false },
  { id: 'f14', name: 'UCB Kids T-Shirt Pack of 3', price: 899, originalPrice: 1499, discount: 40, rating: 4.1, reviews: 5670, image: 'https://m.media-amazon.com/images/I/71kCZyQ6VnL._UX679_.jpg', category: 'Kids', brand: 'UCB', isNew: false },
  { id: 'f15', name: 'Lavie Women Handbag', price: 1799, originalPrice: 3199, discount: 44, rating: 4.0, reviews: 6780, image: 'https://m.media-amazon.com/images/I/71Xg8PFZ8ZL._SX679_.jpg', category: 'Bags', brand: 'Lavie', isNew: true },
  { id: 'f16', name: 'Ray-Ban Aviator Sunglasses', price: 6990, originalPrice: 8490, discount: 18, rating: 4.6, reviews: 12340, image: 'https://m.media-amazon.com/images/I/41SzNHVP0GL._UX679_.jpg', category: 'Accessories', brand: 'Ray-Ban', isNew: false },
];

export default function FashionPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? fashionProducts 
    : fashionProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Fashion</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="w-10 h-10" />
            Fashion Store
          </h1>
          <p className="text-lg opacity-90">Trending styles for Men, Women & Kids</p>
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
            {['Nike', 'Adidas', 'Puma', "Levi's", 'H&M', 'Zara', 'UCB', 'Tommy Hilfiger'].map((brand) => (
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
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative"
            >
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">NEW</span>
              )}
              <div className="h-56 p-4 flex items-center justify-center bg-gray-50">
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
