"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Store, TrendingUp, Truck, CreditCard, BarChart3, Megaphone, HeadphonesIcon, Package, ShieldCheck, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SellPage() {
  const [businessType, setBusinessType] = useState('individual');

  const benefits = [
    { icon: Store, title: 'Reach Millions', desc: 'Access to 300M+ active customers across India' },
    { icon: Truck, title: 'Easy Logistics', desc: 'FBA - Let iShop handle storage, packing & delivery' },
    { icon: CreditCard, title: 'Secure Payments', desc: 'Get paid directly to your bank account every 7 days' },
    { icon: BarChart3, title: 'Growth Tools', desc: 'Analytics dashboard to track your business growth' },
    { icon: Megaphone, title: 'Advertising', desc: 'Sponsored ads to boost your product visibility' },
    { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Dedicated seller support team to help you succeed' },
  ];

  const feeStructure = [
    { category: 'Electronics', referral: '5-12%', closing: '₹10-30' },
    { category: 'Fashion', referral: '10-17%', closing: '₹10-20' },
    { category: 'Home & Kitchen', referral: '8-15%', closing: '₹10-40' },
    { category: 'Books', referral: '5-12%', closing: '₹10-15' },
    { category: 'Beauty', referral: '5-15%', closing: '₹5-20' },
    { category: 'Grocery', referral: '4-10%', closing: '₹1-10' },
  ];

  const steps = [
    { num: 1, title: 'Register', desc: 'Create your seller account with GST & bank details' },
    { num: 2, title: 'List Products', desc: 'Add your products with images, descriptions & prices' },
    { num: 3, title: 'Get Orders', desc: 'Receive orders from millions of iShop customers' },
    { num: 4, title: 'Ship & Earn', desc: 'Ship products using our logistics or FBA & get paid' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeaderNavigation />
      
      <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Become an iShop Seller</h1>
            <p className="text-xl text-gray-300 mb-6">Join 10 lakh+ sellers and grow your business with India&apos;s most trusted online marketplace</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#febd69]" />
                <span>Zero Subscription Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#febd69]" />
                <span>Pay Only When You Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#febd69]" />
                <span>Easy Registration</span>
              </div>
            </div>
            <button className="bg-[#febd69] hover:bg-[#f3a847] text-[#0F1111] px-8 py-3 rounded-lg font-bold text-lg transition-colors">
              Start Selling Today
            </button>
          </div>
          <div className="flex-1 max-w-md">
            <div className="bg-white text-[#0F1111] p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold mb-4">Register as a Seller</h2>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setBusinessType('individual')}
                  className={`flex-1 py-2 rounded ${businessType === 'individual' ? 'bg-[#232f3e] text-white' : 'bg-gray-100'}`}
                >
                  Individual
                </button>
                <button
                  onClick={() => setBusinessType('business')}
                  className={`flex-1 py-2 rounded ${businessType === 'business' ? 'bg-[#232f3e] text-white' : 'bg-gray-100'}`}
                >
                  Business
                </button>
              </div>
              <input type="text" placeholder="Full Name" className="w-full p-3 border rounded mb-3" />
              <input type="email" placeholder="Email Address" className="w-full p-3 border rounded mb-3" />
              <input type="tel" placeholder="Mobile Number" className="w-full p-3 border rounded mb-3" />
              <input type="text" placeholder="GST Number (Optional for Individual)" className="w-full p-3 border rounded mb-3" />
              <button className="w-full bg-[#febd69] hover:bg-[#f3a847] py-3 rounded font-bold">
                Create Seller Account
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By registering, you agree to our <a href="#" className="text-[#007185]">Seller Agreement</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-16 h-16 bg-[#febd69] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
              {step.num < 4 && (
                <ArrowRight className="hidden md:block absolute top-8 -right-4 text-gray-300 w-8 h-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#f7f8f8] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on iShop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <benefit.icon className="w-10 h-10 text-[#febd69] mb-4" />
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Commission & Fee Structure</h2>
        <p className="text-center text-gray-600 mb-8">Transparent pricing - Pay only when you make a sale</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#232f3e] text-white">
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Referral Fee</th>
                <th className="p-4 text-left">Closing Fee</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map((fee, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 border-b">{fee.category}</td>
                  <td className="p-4 border-b">{fee.referral}</td>
                  <td className="p-4 border-b">{fee.closing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">* Fees vary based on product category and selling price. GST applicable.</p>
      </div>

      <div className="bg-[#232f3e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fulfillment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#37475a] p-8 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <Package className="w-12 h-12 text-[#febd69]" />
                <h3 className="text-2xl font-bold">Easy Ship</h3>
              </div>
              <p className="text-gray-300 mb-4">You store products, iShop picks up & delivers</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Pickup from your location</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Track shipments in real-time</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Lower shipping costs</li>
              </ul>
            </div>
            <div className="bg-[#37475a] p-8 rounded-lg border-2 border-[#febd69]">
              <div className="flex items-center gap-4 mb-4">
                <Zap className="w-12 h-12 text-[#febd69]" />
                <div>
                  <h3 className="text-2xl font-bold">Fulfillment by iShop (FBA)</h3>
                  <span className="bg-[#febd69] text-[#0F1111] px-2 py-0.5 text-xs rounded">RECOMMENDED</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">iShop stores, packs & ships your products</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Prime badge for faster delivery</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Higher visibility & sales</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Customer service handled by iShop</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Returns management included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Seller Tools & Resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Inventory Management', icon: Package },
            { name: 'Sales Analytics', icon: BarChart3 },
            { name: 'Advertising Console', icon: Megaphone },
            { name: 'Brand Registry', icon: ShieldCheck },
          ].map((tool, idx) => (
            <div key={idx} className="border rounded-lg p-6 text-center hover:border-[#febd69] hover:shadow-md transition-all cursor-pointer">
              <tool.icon className="w-8 h-8 mx-auto mb-3 text-[#232f3e]" />
              <p className="font-medium">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#febd69] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-lg mb-6">Join thousands of successful sellers on iShop.in</p>
          <button className="bg-[#232f3e] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#37475a] transition-colors">
            Register Now - It&apos;s Free
          </button>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
