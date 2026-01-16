"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Search, MessageCircle, Phone, Mail, Package, RotateCcw, CreditCard, Truck, ShieldCheck, User, HelpCircle, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';

const helpTopics = [
  { icon: Package, title: 'Your Orders', desc: 'Track packages, view order history, cancel or return items', links: ['Track your package', 'View or manage your orders', 'Cancel items or orders', 'Return items you ordered'] },
  { icon: RotateCcw, title: 'Returns & Refunds', desc: 'Return or exchange items, request refunds', links: ['Return an item', 'Check refund status', 'Exchange an item', 'Print return label'] },
  { icon: CreditCard, title: 'Payments & Pricing', desc: 'Add payment methods, view transactions, gift cards', links: ['Add payment method', 'View transactions', 'Redeem gift card', 'Payment issues'] },
  { icon: Truck, title: 'Shipping & Delivery', desc: 'Delivery options, addresses, missing packages', links: ['Where is my stuff?', 'Change delivery address', 'Delivery options', 'Report missing package'] },
  { icon: ShieldCheck, title: 'iShop Prime', desc: 'Manage membership, benefits, Prime Video', links: ['Manage Prime membership', 'Prime benefits', 'Prime Video', 'Prime Music'] },
  { icon: User, title: 'Account Settings', desc: 'Update email, password, login and security', links: ['Change email or password', 'Update login settings', 'Close account', 'Manage addresses'] },
];

const popularTopics = [
  'Where is my order?',
  'How do I return an item?',
  'How do I cancel an order?',
  'What are the payment options?',
  'How do I track my package?',
  'Is Cash on Delivery available?',
  'How do I get a refund?',
  'How do I contact seller?',
];

const faqs = [
  { q: 'How do I track my order?', a: 'Go to "Your Orders" in your account, click on the order you want to track, and you\'ll see the current status and estimated delivery date.' },
  { q: 'What is the return policy?', a: 'Most items can be returned within 7-30 days of delivery. Some categories like fashion have a 30-day window, while electronics have a 7-day replacement guarantee.' },
  { q: 'How do I cancel an order?', a: 'Go to "Your Orders", find the order you want to cancel, and click "Cancel items". You can cancel before the item is shipped.' },
  { q: 'When will I get my refund?', a: 'Refunds are processed within 3-5 business days after we receive your return. The amount will be credited to your original payment method.' },
  { q: 'Is COD available?', a: 'Cash on Delivery is available on eligible items. You\'ll see the COD option at checkout if it\'s available for your order.' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-[#232f3e] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-[#0F1111] text-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Track Order', 'Returns', 'Refunds', 'Payment', 'Prime'].map((tag) => (
              <button key={tag} className="bg-[#37475a] hover:bg-[#485769] px-4 py-1 rounded-full text-sm">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Browse Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {helpTopics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#febd69] rounded-full flex items-center justify-center">
                  <topic.icon className="w-6 h-6 text-[#0F1111]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.desc}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {topic.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline text-sm flex items-center gap-1">
                      <ChevronRight className="w-4 h-4" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularTopics.map((topic, idx) => (
              <a key={idx} href="#" className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 hover:border-[#febd69] transition-colors">
                <HelpCircle className="w-5 h-5 text-[#007185] flex-shrink-0" />
                <span className="text-sm">{topic}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 text-gray-600 border-t bg-gray-50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
          <p className="text-gray-300 mb-6">Contact our customer service team</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 text-[#febd69]" />
              <h3 className="font-bold mb-1">Live Chat</h3>
              <p className="text-sm text-gray-300">Chat with us 24/7</p>
              <button className="mt-3 bg-[#febd69] text-[#0F1111] px-4 py-2 rounded font-medium text-sm hover:bg-[#f3a847]">
                Start Chat
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <Phone className="w-10 h-10 mx-auto mb-3 text-[#febd69]" />
              <h3 className="font-bold mb-1">Call Us</h3>
              <p className="text-sm text-gray-300">1800-123-4567 (Toll Free)</p>
              <p className="text-xs text-gray-400 mt-1">Mon-Sun: 8AM - 10PM</p>
              <button className="mt-3 bg-[#febd69] text-[#0F1111] px-4 py-2 rounded font-medium text-sm hover:bg-[#f3a847]">
                Call Now
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 text-center hover:bg-white/20 transition-colors cursor-pointer">
              <Mail className="w-10 h-10 mx-auto mb-3 text-[#febd69]" />
              <h3 className="font-bold mb-1">Email Us</h3>
              <p className="text-sm text-gray-300">Get response within 24hrs</p>
              <button className="mt-3 bg-[#febd69] text-[#0F1111] px-4 py-2 rounded font-medium text-sm hover:bg-[#f3a847]">
                Send Email
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'iShop Fresh', desc: 'Grocery delivery help' },
            { title: 'iShop Pharmacy', desc: 'Medicine orders' },
            { title: 'Alexa & Echo', desc: 'Device support' },
            { title: 'Seller Help', desc: 'For iShop sellers' },
          ].map((item, idx) => (
            <a key={idx} href="#" className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow flex items-center justify-between">
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </a>
          ))}
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
