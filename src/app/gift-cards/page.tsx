"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Gift, ChevronRight, Mail, Printer, CreditCard } from 'lucide-react';

const occasions = ['Birthday', 'Wedding', 'Anniversary', 'Thank You', 'Congratulations', 'Festival', 'Corporate'];
const amounts = [500, 1000, 2000, 5000, 10000, 25000];

const giftCardDesigns = [
  { id: 1, name: 'Birthday Celebration', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_birthday_noto_702x336._CB642654651_.png', occasion: 'Birthday' },
  { id: 2, name: 'Wedding Wishes', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_wedding_traditional_702x336._CB642654651_.png', occasion: 'Wedding' },
  { id: 3, name: 'Thank You', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_thankyou_noto_702x336._CB642654651_.png', occasion: 'Thank You' },
  { id: 4, name: 'Congratulations', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_congrats_noto_702x336._CB642654651_.png', occasion: 'Congratulations' },
  { id: 5, name: 'Diwali Festival', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_diwali_702x336._CB642654651_.png', occasion: 'Festival' },
  { id: 6, name: 'Corporate Gift', image: 'https://m.media-amazon.com/images/G/31/gc/designs/livepreview/amazon_logo_702x336._CB642654651_.png', occasion: 'Corporate' },
];

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [deliveryType, setDeliveryType] = useState<'email' | 'print' | 'physical'>('email');

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-[#febd69] to-[#f3a847] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4 text-[#0F1111]">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Gift Cards</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-[#0F1111]">
            <Gift className="w-10 h-10" />
            iShop Gift Cards
          </h1>
          <p className="text-lg text-[#0F1111]/80">The perfect gift for any occasion - never expires!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Choose a Design</h2>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['All', ...occasions].map((occ) => (
                  <button key={occ} className="px-4 py-1 rounded-full text-sm border hover:border-[#febd69] whitespace-nowrap">
                    {occ}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {giftCardDesigns.map((design) => (
                  <div key={design.id} className="border-2 rounded-lg overflow-hidden cursor-pointer hover:border-[#febd69] transition-colors group">
                    <div className="aspect-[2/1] bg-gradient-to-br from-[#febd69] to-[#f3a847] flex items-center justify-center">
                      <div className="text-center p-4">
                        <Gift className="w-8 h-8 mx-auto mb-2 text-[#232f3e]" />
                        <p className="text-sm font-bold text-[#232f3e]">{design.name}</p>
                      </div>
                    </div>
                    <p className="p-2 text-xs text-center text-gray-500">{design.occasion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Select Amount</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                    className={`py-3 rounded-lg border-2 font-medium transition-colors ${
                      selectedAmount === amount && !customAmount
                        ? 'border-[#febd69] bg-[#fef8e8]'
                        : 'border-gray-200 hover:border-[#febd69]'
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Or enter custom amount:</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    placeholder="100 - 50,000"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                    className="pl-8 pr-4 py-2 border-2 rounded-lg w-40 focus:outline-none focus:border-[#febd69]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setDeliveryType('email')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    deliveryType === 'email' ? 'border-[#febd69] bg-[#fef8e8]' : 'border-gray-200 hover:border-[#febd69]'
                  }`}
                >
                  <Mail className="w-8 h-8 mx-auto mb-2 text-[#232f3e]" />
                  <h3 className="font-bold">Email Delivery</h3>
                  <p className="text-xs text-gray-500">Instant delivery to recipient</p>
                </button>
                <button
                  onClick={() => setDeliveryType('print')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    deliveryType === 'print' ? 'border-[#febd69] bg-[#fef8e8]' : 'border-gray-200 hover:border-[#febd69]'
                  }`}
                >
                  <Printer className="w-8 h-8 mx-auto mb-2 text-[#232f3e]" />
                  <h3 className="font-bold">Print at Home</h3>
                  <p className="text-xs text-gray-500">Download PDF to print</p>
                </button>
                <button
                  onClick={() => setDeliveryType('physical')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    deliveryType === 'physical' ? 'border-[#febd69] bg-[#fef8e8]' : 'border-gray-200 hover:border-[#febd69]'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#232f3e]" />
                  <h3 className="font-bold">Physical Card</h3>
                  <p className="text-xs text-gray-500">Shipped in gift box</p>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4">Gift Card Preview</h3>
              <div className="aspect-[2/1] bg-gradient-to-br from-[#febd69] to-[#f3a847] rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Gift className="w-12 h-12 mx-auto mb-2 text-[#232f3e]" />
                  <p className="text-2xl font-bold text-[#232f3e]">₹{(customAmount || selectedAmount).toLocaleString()}</p>
                  <p className="text-sm text-[#232f3e]/70">iShop Gift Card</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Recipient's Name" className="w-full p-3 border rounded-lg" />
                <input type="email" placeholder="Recipient's Email" className="w-full p-3 border rounded-lg" />
                <textarea placeholder="Add a personal message (optional)" className="w-full p-3 border rounded-lg h-24 resize-none"></textarea>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Gift Card Value</span>
                  <span className="font-bold">₹{(customAmount || selectedAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span>{deliveryType === 'physical' ? '₹49' : 'FREE'}</span>
                </div>
              </div>

              <button className="w-full bg-[#febd69] hover:bg-[#f3a847] py-3 rounded-lg font-bold text-lg">
                Buy Gift Card
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>• Never expires</p>
                <p>• Valid on millions of products</p>
                <p>• Non-refundable</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="font-bold mb-3">Check Gift Card Balance</h3>
              <input type="text" placeholder="Enter gift card code" className="w-full p-3 border rounded-lg mb-3" />
              <button className="w-full border-2 border-[#232f3e] py-2 rounded-lg font-medium hover:bg-gray-50">
                Check Balance
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Why iShop Gift Cards?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Never Expires', desc: 'Your gift card balance never expires' },
              { title: 'Millions of Products', desc: 'Redeemable on iShop.in entire catalog' },
              { title: 'Easy to Send', desc: 'Email, print, or ship in minutes' },
              { title: 'Bulk Orders', desc: 'Corporate gifting available' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-[#febd69] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6 text-[#232f3e]" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
