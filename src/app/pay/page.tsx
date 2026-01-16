"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Wallet, Send, Receipt, Ticket, ShoppingBag, History, CreditCard, Shield, Gift, Smartphone, Zap, ChevronRight, QrCode } from 'lucide-react';

const services = [
  { icon: Send, title: 'Send Money', desc: 'Transfer to friends & family instantly', color: 'bg-blue-500' },
  { icon: Receipt, title: 'Pay Bills', desc: 'Electricity, mobile, broadband & more', color: 'bg-green-500' },
  { icon: Ticket, title: 'Book Tickets', desc: 'Movies, flights, trains & events', color: 'bg-purple-500' },
  { icon: ShoppingBag, title: 'Shop & Pay', desc: 'Pay on partner sites with iShopPay', color: 'bg-orange-500' },
  { icon: Gift, title: 'Gift Cards', desc: 'Send digital gift cards instantly', color: 'bg-pink-500' },
  { icon: Smartphone, title: 'Mobile Recharge', desc: 'Prepaid & postpaid recharge', color: 'bg-cyan-500' },
];

const billCategories = [
  'Electricity', 'Mobile Postpaid', 'DTH', 'Broadband', 'Gas', 'Water', 'Insurance', 'Credit Card', 'Loan EMI', 'Municipal Tax'
];

const recentTransactions = [
  { type: 'Payment', desc: 'Electricity Bill - MSEB', amount: -1250, date: 'Today, 2:30 PM' },
  { type: 'Received', desc: 'From Rahul Sharma', amount: 5000, date: 'Yesterday, 5:45 PM' },
  { type: 'Payment', desc: 'Mobile Recharge - Jio', amount: -299, date: 'Mar 10, 11:20 AM' },
  { type: 'Cashback', desc: 'Cashback on Bill Payment', amount: 50, date: 'Mar 9, 3:00 PM' },
];

export default function PayPage() {
  const [balance] = useState(2500);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />

      <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Wallet className="w-10 h-10 text-[#febd69]" />
                <h1 className="text-4xl font-bold">iShop Pay</h1>
              </div>
              <p className="text-xl text-gray-300 mb-6">Send money, pay bills, and shop securely</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#febd69] hover:bg-[#f3a847] text-[#0F1111] px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Scan & Pay
                </button>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Money
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 w-full max-w-sm">
              <p className="text-gray-300 mb-2">iShop Pay Balance</p>
              <p className="text-4xl font-bold mb-4">₹{balance.toLocaleString()}</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#febd69] hover:bg-[#f3a847] text-[#0F1111] py-2 rounded font-medium text-sm">
                  Add Money
                </button>
                <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded font-medium text-sm">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Quick Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <div className={`w-14 h-14 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-sm mb-1">{service.title}</h3>
              <p className="text-xs text-gray-500">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Pay Bills</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {billCategories.map((bill, idx) => (
                  <button key={idx} className="p-3 border rounded-lg hover:border-[#febd69] hover:bg-[#fef8e8] transition-colors text-sm text-center">
                    {bill}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Recent Transactions</h2>
                <Link href="#" className="text-[#007185] hover:underline text-sm flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.amount > 0 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {txn.amount > 0 ? (
                          <Zap className="w-5 h-5 text-green-600" />
                        ) : (
                          <Receipt className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{txn.desc}</p>
                        <p className="text-xs text-gray-500">{txn.date}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-[#0F1111]'}`}>
                      {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-4">Linked Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">HDFC Credit Card</p>
                    <p className="text-xs text-gray-500">**** 4532</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CreditCard className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">SBI Debit Card</p>
                    <p className="text-xs text-gray-500">**** 8721</p>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-dashed rounded-lg text-[#007185] hover:bg-gray-50 text-sm">
                  + Add Payment Method
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#febd69] to-[#f3a847] rounded-xl p-6 text-[#0F1111]">
              <h3 className="font-bold mb-2">Cashback Offer!</h3>
              <p className="text-sm mb-4">Get ₹50 cashback on bill payments above ₹500</p>
              <button className="bg-[#232f3e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#37475a]">
                Pay Now
              </button>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-bold">100% Secure</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Bank-grade encryption</li>
                <li>• 2-factor authentication</li>
                <li>• Zero liability protection</li>
                <li>• 24/7 fraud monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}
