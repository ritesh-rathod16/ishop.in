"use client";

import React from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { useAuth } from '@/context/AuthContext';
import { Package, Search } from 'lucide-react';

export default function OrdersPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <main className="max-w-[1200px] mx-auto p-4">
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <main className="max-w-[1200px] mx-auto p-4">
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-[24px] text-[#0F1111] mb-2">Sign in to view your orders</h2>
            <p className="text-[14px] text-[#565959] mb-4">
              Track, return, or buy things again
            </p>
            <Link 
              href="/login"
              className="inline-block px-8 py-2 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] hover:from-[#f5d78e] hover:to-[#eeb933]"
            >
              Sign in
            </Link>
          </div>
        </main>
        <FooterMain />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />
      
      <main className="max-w-[1200px] mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-[28px] font-normal text-[#0F1111]">Your Orders</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search all orders"
                className="w-full pl-10 pr-4 py-2 border border-[#a6a6a6] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600]"
              />
            </div>
            <button className="px-4 py-2 bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] border border-[#adb1b8] rounded text-[13px] text-[#0F1111] hover:from-[#e7eaf0] hover:to-[#d9dce1]">
              Search Orders
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
          {['Orders', 'Buy Again', 'Not Yet Shipped', 'Cancelled Orders'].map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-2 text-[14px] whitespace-nowrap border-b-2 ${
                idx === 0
                  ? 'text-[#c7511f] border-[#c7511f]'
                  : 'text-[#0F1111] border-transparent hover:text-[#c7511f]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded shadow-sm text-center">
          <Package className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h2 className="text-[20px] text-[#0F1111] mb-2">No orders yet</h2>
          <p className="text-[14px] text-[#565959] mb-4">
            Looks like you haven&apos;t placed any orders yet. Start shopping to see your orders here!
          </p>
          <Link 
            href="/"
            className="inline-block px-6 py-2 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] hover:from-[#f5d78e] hover:to-[#eeb933]"
          >
            Start Shopping
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-[18px] font-bold text-[#0F1111] mb-4">Digital Orders and Subscriptions</h2>
          <div className="bg-white p-4 rounded shadow-sm">
            <p className="text-[14px] text-[#565959]">
              View your digital orders, subscriptions, and payment settings in{' '}
              <a href="#" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Digital Orders
              </a>
            </p>
          </div>
        </div>
      </main>

      <FooterMain />
    </div>
  );
}
