"use client";

import React from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Truck, Play, Music, Book, Gamepad2, ShoppingBag, CheckCircle2, Star, Zap } from 'lucide-react';

const primeBenefits = [
  { icon: Truck, title: 'Free & Fast Delivery', desc: 'Unlimited FREE Same-Day, One-Day and Two-Day delivery on eligible items', color: 'bg-blue-500' },
  { icon: Play, title: 'Prime Video', desc: 'Watch latest movies, TV shows and iShop Originals on any device', color: 'bg-purple-500' },
  { icon: Music, title: 'Prime Music', desc: 'Ad-free access to 100 million songs and top podcasts', color: 'bg-pink-500' },
  { icon: Book, title: 'Prime Reading', desc: 'Free access to hundreds of eBooks, magazines and comics', color: 'bg-green-500' },
  { icon: Gamepad2, title: 'Prime Gaming', desc: 'Free games, in-game content and a Twitch subscription', color: 'bg-orange-500' },
  { icon: ShoppingBag, title: 'Exclusive Deals', desc: 'Early access to Lightning Deals and exclusive member discounts', color: 'bg-red-500' },
];

const shows = [
  { title: 'Mirzapur', image: 'https://m.media-amazon.com/images/S/pv-target-images/7e8fa3e6f21c2d0c3c96e5c2e2d8b5c9c3f1e8d5._UR1920,1080_.jpg' },
  { title: 'The Family Man', image: 'https://m.media-amazon.com/images/S/pv-target-images/9e5f5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c._UR1920,1080_.jpg' },
  { title: 'Panchayat', image: 'https://m.media-amazon.com/images/S/pv-target-images/5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c._UR1920,1080_.jpg' },
  { title: 'Made in Heaven', image: 'https://m.media-amazon.com/images/S/pv-target-images/1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c._UR1920,1080_.jpg' },
];

export default function PrimePage() {
  return (
    <div className="min-h-screen bg-[#0F1111]">
      <HeaderNavigation />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00A8E1]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-[#00A8E1] px-4 py-1 rounded-full text-sm font-bold mb-6">
              <Zap className="w-4 h-4" />
              iShop Prime
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              One membership.<br />
              <span className="text-[#00A8E1]">Endless benefits.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Free delivery, exclusive deals, movies, TV shows, music, and more. All included with your Prime membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] px-8 py-4 rounded-lg font-bold text-lg">
                Start your 30-day free trial
              </button>
              <button className="border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg">
                ₹1,499/year or ₹299/month
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">Cancel anytime. Terms apply.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Everything included with Prime</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primeBenefits.map((benefit, idx) => (
              <div key={idx} className="bg-[#232f3e] rounded-xl p-6 hover:bg-[#2d3a4a] transition-colors">
                <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-8 h-8 text-[#00A8E1]" />
            <h2 className="text-3xl font-bold text-white">Prime Video</h2>
          </div>
          <p className="text-gray-400 mb-8 max-w-2xl">Stream blockbuster movies, binge-worthy series, and award-winning iShop Originals. Watch anytime, anywhere.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Mirzapur S3', 'The Family Man', 'Panchayat S3', 'Made in Heaven'].map((show, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold">{show}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="text-[#00A8E1] hover:underline font-medium">
              Explore all shows and movies →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#1DB954]/20 to-[#191414] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-8 h-8 text-[#1DB954]" />
                <h2 className="text-3xl font-bold text-white">Prime Music</h2>
              </div>
              <p className="text-gray-400 mb-6">Ad-free music streaming with unlimited skips. Access 100 million songs and top podcasts.</p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#1DB954]" /> Ad-free listening</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#1DB954]" /> Offline playback</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#1DB954]" /> High-quality audio</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#1DB954]" /> Unlimited skips</li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0F1111] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Choose your plan</h2>
          <p className="text-gray-400 text-center mb-12">Start with a 30-day free trial, cancel anytime</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-[#232f3e] rounded-xl p-8 border-2 border-transparent hover:border-[#00A8E1] transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">₹299</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-6">Flexible monthly plan, cancel anytime</p>
              <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-3 rounded-lg font-bold">
                Start Free Trial
              </button>
            </div>
            <div className="bg-[#232f3e] rounded-xl p-8 border-2 border-[#00A8E1] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00A8E1] text-white px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Annual</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">₹1,499</span>
                <span className="text-gray-400">/year</span>
              </div>
              <p className="text-[#00A8E1] text-sm mb-4">Save ₹2,089 vs monthly</p>
              <p className="text-gray-400 mb-6">Best value - just ₹125/month</p>
              <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-3 rounded-lg font-bold">
                Start Free Trial
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            By signing up, you agree to the <a href="#" className="text-[#00A8E1] hover:underline">Prime Terms of Service</a>.
          </p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why customers love Prime</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rating: 4.8, reviews: '12M+', text: 'Fast delivery is amazing! Got my order in just 6 hours.' },
              { rating: 4.9, reviews: '8M+', text: 'Prime Video has the best original shows. Mirzapur is legendary!' },
              { rating: 4.7, reviews: '5M+', text: 'The exclusive deals during sales saved me thousands!' },
            ].map((review, idx) => (
              <div key={idx} className="bg-[#232f3e] rounded-xl p-6">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFA41C] text-[#FFA41C]" />
                  ))}
                </div>
                <p className="text-white font-bold">{review.rating}</p>
                <p className="text-gray-400 text-sm mb-3">{review.reviews} reviews</p>
                <p className="text-gray-300 text-sm italic">&quot;{review.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#00A8E1] to-[#0066FF] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to start your Prime journey?</h2>
          <p className="text-lg mb-6 opacity-90">Join millions of satisfied Prime members today</p>
          <button className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] px-8 py-4 rounded-lg font-bold text-lg">
            Try Prime FREE for 30 days
          </button>
        </div>
      </div>

      <div className="bg-[#0F1111]">
        <FooterMain />
      </div>
    </div>
  );
}
