"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, Sparkles, ChevronRight } from 'lucide-react';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Books', 'Beauty', 'Toys', 'Sports'];

const newReleases = [
  { id: 'n1', name: 'Apple iPhone 16 Pro Max (256GB) - Desert Titanium', price: 174900, originalPrice: 174900, discount: 0, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: 'Just launched' },
  { id: 'n2', name: 'Samsung Galaxy Z Fold 6 5G (512GB)', price: 164999, originalPrice: 179999, discount: 8, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: '2 days ago' },
  { id: 'n3', name: 'Sony WH-1000XM6 Wireless Headphones', price: 29990, originalPrice: 34990, discount: 14, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: '1 week ago' },
  { id: 'n4', name: 'Nike Air Jordan 1 Low SE - New Colorway', price: 12995, originalPrice: 12995, discount: 0, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71DUW2gU9uL._UX695_.jpg', category: 'Fashion', isNew: true, releaseDate: '3 days ago' },
  { id: 'n5', name: 'Apple MacBook Pro M4 14" Laptop', price: 169900, originalPrice: 169900, discount: 0, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: 'Just launched' },
  { id: 'n6', name: 'Dyson Airwrap Complete Long - New Edition', price: 49900, originalPrice: 52900, discount: 6, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/61KNXhtPbKL._SX679_.jpg', category: 'Beauty', isNew: true, releaseDate: '5 days ago' },
  { id: 'n7', name: 'The Psychology of Success - New Book', price: 499, originalPrice: 699, discount: 29, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg', category: 'Books', isNew: true, releaseDate: '1 week ago' },
  { id: 'n8', name: 'PlayStation 5 Pro Console', price: 69990, originalPrice: 69990, discount: 0, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: 'Coming soon' },
  { id: 'n9', name: 'Adidas Ultraboost 24 Running Shoes', price: 16999, originalPrice: 19999, discount: 15, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71P-1TrOvzL._UX695_.jpg', category: 'Fashion', isNew: true, releaseDate: '4 days ago' },
  { id: 'n10', name: 'LEGO Star Wars Ultimate Collection', price: 14999, originalPrice: 17999, discount: 17, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/51G1aOiJi+L._SY466_.jpg', category: 'Toys', isNew: true, releaseDate: '1 week ago' },
  { id: 'n11', name: 'Google Pixel 9 Pro (256GB)', price: 109999, originalPrice: 109999, discount: 0, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71LFgCk-XpL._SX679_.jpg', category: 'Electronics', isNew: true, releaseDate: '2 weeks ago' },
  { id: 'n12', name: 'Instant Pot Pro Plus 6Qt', price: 12999, originalPrice: 15999, discount: 19, rating: 0, reviews: 0, image: 'https://m.media-amazon.com/images/I/71V1LrY1MSL._SX679_.jpg', category: 'Home', isNew: true, releaseDate: '1 week ago' },
];

export default function NewReleasesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? newReleases 
    : newReleases.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>New Releases</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="w-10 h-10" />
            New Releases
          </h1>
          <p className="text-lg opacity-90">Discover the latest products just added to iShop</p>
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
                  ? 'bg-emerald-500 text-white'
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
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative"
            >
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
                <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded">{product.releaseDate}</span>
              </div>
              <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#c45500] mb-2">{product.name}</h3>
                {product.reviews > 0 ? (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="bg-[#067D62] text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      {product.rating} <Star className="w-3 h-3 fill-white" />
                    </span>
                    <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mb-2">Be the first to review</p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium">₹{product.price.toLocaleString()}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="text-xs text-[#CC0C39]">{product.discount}% off</span>
                    </>
                  )}
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
