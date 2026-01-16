"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, ChevronRight, ChevronDown, SlidersHorizontal, Grid, List } from 'lucide-react';

const brands = ['Apple', 'Samsung', 'OnePlus', 'Realme', 'Redmi', 'Vivo', 'OPPO', 'Motorola', 'Google', 'Nothing'];
const priceRanges = ['Under ₹10,000', '₹10,000 - ₹20,000', '₹20,000 - ₹30,000', '₹30,000 - ₹50,000', '₹50,000 - ₹1,00,000', 'Above ₹1,00,000'];
const ramOptions = ['4 GB', '6 GB', '8 GB', '12 GB', '16 GB'];
const storageOptions = ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'];

const mobiles = [
  { id: '1', name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium', price: 159900, originalPrice: 179900, discount: 11, rating: 4.5, reviews: 2340, image: 'https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg', brand: 'Apple', ram: '8 GB', storage: '256 GB', display: '6.7"', camera: '48 MP', battery: '4422 mAh', os: 'iOS 17' },
  { id: '2', name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone (256GB)', price: 129999, originalPrice: 144999, discount: 10, rating: 4.3, reviews: 1850, image: 'https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg', brand: 'Samsung', ram: '12 GB', storage: '256 GB', display: '6.8"', camera: '200 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '3', name: 'OnePlus 12 5G (16GB RAM, 512GB Storage)', price: 69999, originalPrice: 74999, discount: 7, rating: 4.4, reviews: 3200, image: 'https://m.media-amazon.com/images/I/71nYM8LSLBL._SX679_.jpg', brand: 'OnePlus', ram: '16 GB', storage: '512 GB', display: '6.82"', camera: '50 MP', battery: '5400 mAh', os: 'Android 14' },
  { id: '4', name: 'iPhone 15 (128GB) - Blue', price: 79900, originalPrice: 79900, discount: 0, rating: 4.6, reviews: 4500, image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg', brand: 'Apple', ram: '6 GB', storage: '128 GB', display: '6.1"', camera: '48 MP', battery: '3349 mAh', os: 'iOS 17' },
  { id: '5', name: 'Samsung Galaxy S23 FE 5G (8GB, 128GB)', price: 39999, originalPrice: 59999, discount: 33, rating: 4.2, reviews: 2100, image: 'https://m.media-amazon.com/images/I/41pWADM7lIL._SX679_.jpg', brand: 'Samsung', ram: '8 GB', storage: '128 GB', display: '6.4"', camera: '50 MP', battery: '4500 mAh', os: 'Android 14' },
  { id: '6', name: 'OnePlus Nord CE 4 Lite 5G (8GB RAM, 128GB)', price: 19999, originalPrice: 24999, discount: 20, rating: 4.2, reviews: 3450, image: 'https://m.media-amazon.com/images/I/71nYM8LSLBL._SX679_.jpg', brand: 'OnePlus', ram: '8 GB', storage: '128 GB', display: '6.67"', camera: '50 MP', battery: '5500 mAh', os: 'Android 14' },
  { id: '7', name: 'Realme 12 Pro+ 5G (12GB RAM, 256GB)', price: 29999, originalPrice: 34999, discount: 14, rating: 4.3, reviews: 1890, image: 'https://m.media-amazon.com/images/I/71lL5AODqAL._SX679_.jpg', brand: 'Realme', ram: '12 GB', storage: '256 GB', display: '6.7"', camera: '64 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '8', name: 'Redmi Note 13 Pro+ 5G (12GB RAM, 512GB)', price: 32999, originalPrice: 36999, discount: 11, rating: 4.1, reviews: 5670, image: 'https://m.media-amazon.com/images/I/51tQJ5oylKL._SX679_.jpg', brand: 'Redmi', ram: '12 GB', storage: '512 GB', display: '6.67"', camera: '200 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '9', name: 'Google Pixel 8 Pro (12GB RAM, 256GB)', price: 99999, originalPrice: 106999, discount: 7, rating: 4.5, reviews: 980, image: 'https://m.media-amazon.com/images/I/71LFgCk-XpL._SX679_.jpg', brand: 'Google', ram: '12 GB', storage: '256 GB', display: '6.7"', camera: '50 MP', battery: '5050 mAh', os: 'Android 14' },
  { id: '10', name: 'Nothing Phone (2a) (8GB RAM, 128GB)', price: 23999, originalPrice: 27999, discount: 14, rating: 4.3, reviews: 2340, image: 'https://m.media-amazon.com/images/I/61eBuA1DRSL._SX679_.jpg', brand: 'Nothing', ram: '8 GB', storage: '128 GB', display: '6.7"', camera: '50 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '11', name: 'Vivo V30 Pro 5G (12GB RAM, 256GB)', price: 46999, originalPrice: 51999, discount: 10, rating: 4.2, reviews: 1230, image: 'https://m.media-amazon.com/images/I/61Zb7x0oCML._SX679_.jpg', brand: 'Vivo', ram: '12 GB', storage: '256 GB', display: '6.78"', camera: '50 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '12', name: 'OPPO Reno11 Pro 5G (12GB RAM, 256GB)', price: 39999, originalPrice: 44999, discount: 11, rating: 4.1, reviews: 890, image: 'https://m.media-amazon.com/images/I/71Nj9qykmRL._SX679_.jpg', brand: 'OPPO', ram: '12 GB', storage: '256 GB', display: '6.7"', camera: '50 MP', battery: '4600 mAh', os: 'Android 14' },
  { id: '13', name: 'Motorola Edge 50 Pro 5G (12GB RAM, 256GB)', price: 35999, originalPrice: 39999, discount: 10, rating: 4.3, reviews: 1560, image: 'https://m.media-amazon.com/images/I/51Hs3JiCq9L._SX679_.jpg', brand: 'Motorola', ram: '12 GB', storage: '256 GB', display: '6.7"', camera: '50 MP', battery: '4500 mAh', os: 'Android 14' },
  { id: '14', name: 'Redmi 13C 5G (4GB RAM, 128GB)', price: 10999, originalPrice: 12999, discount: 15, rating: 4.0, reviews: 8900, image: 'https://m.media-amazon.com/images/I/41p3F6rKWZL._SX679_.jpg', brand: 'Redmi', ram: '4 GB', storage: '128 GB', display: '6.74"', camera: '50 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '15', name: 'Realme Narzo 70 Pro 5G (8GB RAM, 128GB)', price: 18999, originalPrice: 21999, discount: 14, rating: 4.2, reviews: 2340, image: 'https://m.media-amazon.com/images/I/71H0G+zNTBL._SX679_.jpg', brand: 'Realme', ram: '8 GB', storage: '128 GB', display: '6.67"', camera: '50 MP', battery: '5000 mAh', os: 'Android 14' },
  { id: '16', name: 'Samsung Galaxy A55 5G (8GB RAM, 256GB)', price: 39999, originalPrice: 45999, discount: 13, rating: 4.3, reviews: 1670, image: 'https://m.media-amazon.com/images/I/71RJZcb9rPL._SX679_.jpg', brand: 'Samsung', ram: '8 GB', storage: '256 GB', display: '6.6"', camera: '50 MP', battery: '5000 mAh', os: 'Android 14' },
];

export default function MobilesPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredMobiles = mobiles.filter(mobile => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(mobile.brand)) return false;
    if (selectedRam.length > 0 && !selectedRam.includes(mobile.ram)) return false;
    return true;
  });

  const sortedMobiles = [...filteredMobiles].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'discount': return b.discount - a.discount;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#007185] hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/electronics" className="text-[#007185] hover:underline">Electronics</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span>Mobiles & Smartphones</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold mb-2">Mobile Phones</h1>
          <p className="text-gray-600 text-sm">Showing {sortedMobiles.length} results</p>
        </div>

        <div className="flex gap-4">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-lg p-4 sticky top-4">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h3>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-3">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-[#c45500]">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-bold mb-3">Price</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-[#c45500]">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-bold mb-3">RAM</h4>
                <div className="space-y-2">
                  {ramOptions.map(ram => (
                    <label key={ram} className="flex items-center gap-2 cursor-pointer hover:text-[#c45500]">
                      <input
                        type="checkbox"
                        checked={selectedRam.includes(ram)}
                        onChange={() => setSelectedRam(prev => prev.includes(ram) ? prev.filter(r => r !== ram) : [...prev, ram])}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{ram}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-bold mb-3">Storage</h4>
                <div className="space-y-2">
                  {storageOptions.map(storage => (
                    <label key={storage} className="flex items-center gap-2 cursor-pointer hover:text-[#c45500]">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{storage}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-bold mb-3">Customer Reviews</h4>
                {[4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer hover:text-[#c45500] mb-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < stars ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-lg p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Avg. Customer Review</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>
              {sortedMobiles.map(mobile => (
                <Link
                  key={mobile.id}
                  href={`/product/${mobile.id}`}
                  className={`bg-white rounded-lg p-4 hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                >
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48 mb-4'} flex items-center justify-center`}>
                    <img src={mobile.image} alt={mobile.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 hover:text-[#c45500] mb-2">{mobile.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="bg-[#067D62] text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                        {mobile.rating} <Star className="w-3 h-3 fill-white" />
                      </span>
                      <span className="text-xs text-gray-500">({mobile.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xl font-medium">₹{mobile.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">₹{mobile.originalPrice.toLocaleString()}</span>
                      <span className="text-sm text-[#CC0C39]">{mobile.discount}% off</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>{mobile.display} Display • {mobile.camera} Camera</p>
                      <p>{mobile.ram} RAM • {mobile.storage} Storage</p>
                      <p>{mobile.battery} Battery • {mobile.os}</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs bg-[#232f3e] text-white px-2 py-0.5 rounded">Exchange</span>
                      <span className="text-xs text-[#007600]">FREE Delivery</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">No Cost EMI from ₹{Math.floor(mobile.price/12).toLocaleString()}/month</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
