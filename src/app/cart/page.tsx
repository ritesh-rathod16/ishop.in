"use client";

import React from 'react';
import HeaderNavigation from "@/components/sections/header-navigation";
import FooterMain from "@/components/sections/footer-main";
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShieldCheck, ChevronDown } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <HeaderNavigation />
      <main className="max-w-[1500px] mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
        <div className="flex-grow bg-white p-6 rounded-sm shadow-sm">
          <div className="border-b pb-4 mb-4">
            <h1 className="text-[28px] font-medium">Shopping Cart</h1>
            {cart.length > 0 && (
              <p className="text-[#007185] text-[14px] hover:underline cursor-pointer">Deselect all items</p>
            )}
            <div className="text-right text-[14px] text-[#565959] mt-[-20px] hidden md:block">Price</div>
          </div>

          {cart.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-bold mb-4">Your iShop Cart is empty.</h2>
              <p className="mb-6">Check your Saved for later items below or continue shopping.</p>
              <Link href="/" className="bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-lg text-[14px] shadow-sm">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-6">
                  <div className="w-[180px] h-[180px] flex-shrink-0 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between gap-4 mb-1">
                      <h3 className="text-[18px] font-medium leading-tight">
                        <Link href={`/product/${item.id}`} className="hover:text-[#c45500]">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="text-[18px] font-bold">₹{item.price.toLocaleString()}</div>
                    </div>
                    <p className="text-[#007600] text-[12px] mb-1">In stock</p>
                    <p className="text-[12px] text-[#565959] mb-4">Eligible for FREE Shipping</p>
                    
                    <div className="flex items-center gap-4 text-[13px]">
                      <div className="flex items-center border rounded-lg bg-[#F0F2F2] shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2 hover:bg-[#E3E6E6] border-r"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2 hover:bg-[#E3E6E6] border-l"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="h-4 w-[1px] bg-[#DDD]"></div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#007185] hover:underline"
                      >
                        Delete
                      </button>
                      <div className="h-4 w-[1px] bg-[#DDD]"></div>
                      <button className="text-[#007185] hover:underline">Save for later</button>
                      <div className="h-4 w-[1px] bg-[#DDD]"></div>
                      <button className="text-[#007185] hover:underline">See more like this</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right text-[18px]">
                Subtotal ({cartCount} items): <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-[300px] space-y-4">
          <div className="bg-white p-5 rounded-sm shadow-sm">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-5 h-5 bg-[#067D62] rounded-full flex items-center justify-center text-white text-[12px]">✓</div>
              <p className="text-[12px] text-[#067D62]">Your order is eligible for FREE Delivery. Select this option at checkout.</p>
            </div>
            
            <div className="text-[18px] mb-4">
              Subtotal ({cartCount} items): <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" id="gift" />
              <label htmlFor="gift" className="text-[14px]">This order contains a gift</label>
            </div>

            <button 
              disabled={cart.length === 0}
              className={`w-full py-2 rounded-lg text-[14px] shadow-sm transition-colors ${
                cart.length === 0 
                ? 'bg-[#F7CA00] opacity-50 cursor-not-allowed' 
                : 'bg-[#FFD814] hover:bg-[#F7CA00]'
              }`}
            >
              Proceed to Buy
            </button>
          </div>

          <div className="bg-white p-5 rounded-sm shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] font-bold">Frequently bought together</span>
              <ChevronDown size={16} />
            </div>
            {/* Mock recommendation */}
            <div className="flex gap-3">
              <img src="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg" className="w-16 h-16 object-contain" />
              <div>
                <p className="text-[12px] text-[#007185] line-clamp-2">Apple MacBook Air Laptop M3 chip</p>
                <p className="text-[14px] text-[#B12704] font-bold">₹1,14,900</p>
                <button className="bg-[#FFD814] text-[11px] px-2 py-1 rounded-md mt-1">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterMain />
    </div>
  );
}
