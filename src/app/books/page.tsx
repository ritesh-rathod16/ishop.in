"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Star, BookOpen, ChevronRight, Headphones } from 'lucide-react';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Children', 'Academic', 'Comics', 'Audiobooks'];

const books = [
  { id: 'b1', name: 'Atomic Habits by James Clear', price: 399, originalPrice: 799, discount: 50, rating: 4.7, reviews: 156000, image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg', category: 'Self-Help', author: 'James Clear', format: 'Paperback' },
  { id: 'b2', name: 'The Psychology of Money by Morgan Housel', price: 299, originalPrice: 499, discount: 40, rating: 4.6, reviews: 89000, image: 'https://m.media-amazon.com/images/I/71TRUbzcvaL._SY466_.jpg', category: 'Business', author: 'Morgan Housel', format: 'Paperback' },
  { id: 'b3', name: 'Rich Dad Poor Dad by Robert Kiyosaki', price: 299, originalPrice: 499, discount: 40, rating: 4.5, reviews: 234000, image: 'https://m.media-amazon.com/images/I/81BE7eeKzAL._SY466_.jpg', category: 'Business', author: 'Robert Kiyosaki', format: 'Paperback' },
  { id: 'b4', name: 'Ikigai: The Japanese Secret to a Long and Happy Life', price: 249, originalPrice: 450, discount: 45, rating: 4.4, reviews: 67000, image: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._SY466_.jpg', category: 'Self-Help', author: 'Héctor García', format: 'Paperback' },
  { id: 'b5', name: 'The Alchemist by Paulo Coelho', price: 299, originalPrice: 399, discount: 25, rating: 4.6, reviews: 189000, image: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL._SY466_.jpg', category: 'Fiction', author: 'Paulo Coelho', format: 'Paperback' },
  { id: 'b6', name: 'Sapiens: A Brief History of Humankind', price: 399, originalPrice: 799, discount: 50, rating: 4.6, reviews: 78000, image: 'https://m.media-amazon.com/images/I/713jIoMO3UL._SY466_.jpg', category: 'Non-Fiction', author: 'Yuval Noah Harari', format: 'Paperback' },
  { id: 'b7', name: 'Think and Grow Rich by Napoleon Hill', price: 199, originalPrice: 399, discount: 50, rating: 4.5, reviews: 123000, image: 'https://m.media-amazon.com/images/I/71UypkUjStL._SY466_.jpg', category: 'Business', author: 'Napoleon Hill', format: 'Paperback' },
  { id: 'b8', name: 'The Subtle Art of Not Giving a F*ck', price: 349, originalPrice: 599, discount: 42, rating: 4.3, reviews: 95000, image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY466_.jpg', category: 'Self-Help', author: 'Mark Manson', format: 'Paperback' },
  { id: 'b9', name: 'Harry Potter Box Set (7 Books)', price: 2499, originalPrice: 4999, discount: 50, rating: 4.8, reviews: 67000, image: 'https://m.media-amazon.com/images/I/71rOzy4cyAL._SY466_.jpg', category: 'Fiction', author: 'J.K. Rowling', format: 'Paperback' },
  { id: 'b10', name: 'Wings of Fire by APJ Abdul Kalam', price: 199, originalPrice: 350, discount: 43, rating: 4.6, reviews: 45000, image: 'https://m.media-amazon.com/images/I/81Oi4ixLhKL._SY466_.jpg', category: 'Non-Fiction', author: 'APJ Abdul Kalam', format: 'Paperback' },
  { id: 'b11', name: 'NCERT Mathematics Class 12', price: 299, originalPrice: 450, discount: 34, rating: 4.4, reviews: 23000, image: 'https://m.media-amazon.com/images/I/81R+3l9GLML._SY466_.jpg', category: 'Academic', author: 'NCERT', format: 'Paperback' },
  { id: 'b12', name: 'Diary of a Wimpy Kid Box Set', price: 1999, originalPrice: 3499, discount: 43, rating: 4.7, reviews: 34000, image: 'https://m.media-amazon.com/images/I/51G1aOiJi+L._SY466_.jpg', category: 'Children', author: 'Jeff Kinney', format: 'Paperback' },
  { id: 'b13', name: 'One Piece Vol. 1-23 Box Set', price: 8999, originalPrice: 12999, discount: 31, rating: 4.9, reviews: 12000, image: 'https://m.media-amazon.com/images/I/71LKnOEw4rL._SY466_.jpg', category: 'Comics', author: 'Eiichiro Oda', format: 'Paperback' },
  { id: 'b14', name: 'Atomic Habits - Audiobook', price: 499, originalPrice: 899, discount: 44, rating: 4.8, reviews: 23000, image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg', category: 'Audiobooks', author: 'James Clear', format: 'Audiobook' },
  { id: 'b15', name: 'The Power of Your Subconscious Mind', price: 149, originalPrice: 299, discount: 50, rating: 4.4, reviews: 89000, image: 'https://m.media-amazon.com/images/I/51kQGxsB4oL._SY466_.jpg', category: 'Self-Help', author: 'Joseph Murphy', format: 'Paperback' },
  { id: 'b16', name: 'You Can Win by Shiv Khera', price: 199, originalPrice: 399, discount: 50, rating: 4.3, reviews: 56000, image: 'https://m.media-amazon.com/images/I/71Cp2d6HW8L._SY466_.jpg', category: 'Self-Help', author: 'Shiv Khera', format: 'Paperback' },
];

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(b => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Books</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            Books Store
          </h1>
          <p className="text-lg opacity-90">Millions of books at your fingertips</p>
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
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Headphones className="w-8 h-8 text-[#febd69]" />
            <h2 className="text-xl font-bold">Kindle Unlimited</h2>
          </div>
          <p className="text-gray-300 mb-4">Read millions of eBooks and audiobooks with Kindle Unlimited - ₹169/month</p>
          <button className="bg-[#febd69] hover:bg-[#f3a847] text-[#0F1111] px-6 py-2 rounded font-bold">
            Try FREE for 30 days
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <Link
              key={book.id}
              href={`/product/${book.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-56 p-4 flex items-center justify-center bg-gray-50">
                <img src={book.image} alt={book.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#c45500] mb-1">{book.name}</h3>
                <p className="text-xs text-gray-500 mb-2">by {book.author}</p>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-[#007185]">({book.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-medium">₹{book.price}</span>
                  <span className="text-xs text-gray-500 line-through">₹{book.originalPrice}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{book.format}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
