"use client";

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Plus, Edit, Trash2, Tag, Percent, Gift, Zap } from 'lucide-react';

const promotions = [
  { id: 1, name: 'SUMMER20', type: 'Percentage', value: '20%', minOrder: 1000, uses: 234, maxUses: 500, status: 'Active', expires: '2024-04-30' },
  { id: 2, name: 'FLAT500', type: 'Flat', value: '₹500', minOrder: 3000, uses: 89, maxUses: 200, status: 'Active', expires: '2024-03-31' },
  { id: 3, name: 'NEWUSER', type: 'Percentage', value: '15%', minOrder: 500, uses: 567, maxUses: 1000, status: 'Active', expires: '2024-12-31' },
  { id: 4, name: 'ELECTRONICS10', type: 'Percentage', value: '10%', minOrder: 5000, uses: 45, maxUses: 100, status: 'Paused', expires: '2024-03-15' },
  { id: 5, name: 'BOGO', type: 'Buy 1 Get 1', value: 'Free', minOrder: 0, uses: 123, maxUses: 300, status: 'Active', expires: '2024-03-20' },
];

const deals = [
  { id: 1, name: 'Lightning Deal - iPhone Cases', product: 'iPhone 15 Pro Cases', discount: 50, claimed: 78, total: 100, endsIn: '2h 30m', status: 'Live' },
  { id: 2, name: 'Deal of the Day - Headphones', product: 'Sony WH-1000XM5', discount: 25, claimed: 45, total: 50, endsIn: '5h 15m', status: 'Live' },
  { id: 3, name: 'Flash Sale - Books', product: 'Bestseller Books Bundle', discount: 40, claimed: 200, total: 200, endsIn: 'Ended', status: 'Ended' },
];

export default function PromotionsPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Coupons & Promotions" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Advertising' }, { name: 'Promotions' }]} 
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Coupon Codes</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg">
            <Plus className="w-4 h-4" /> Create Coupon
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uses</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {promotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-medium text-sm text-[#007185]">{promo.name}</td>
                  <td className="px-4 py-3 text-sm">{promo.type}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{promo.value}</td>
                  <td className="px-4 py-3 text-sm">₹{promo.minOrder}</td>
                  <td className="px-4 py-3 text-sm">{promo.uses}/{promo.maxUses}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${promo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{promo.expires}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Flash Deals & Lightning Offers</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg">
            <Zap className="w-4 h-4" /> Create Deal
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 text-xs rounded-full ${deal.status === 'Live' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {deal.status === 'Live' ? '🔴 LIVE' : deal.status}
                </span>
                <span className="text-sm text-gray-500">{deal.endsIn}</span>
              </div>
              <h3 className="font-bold mb-1">{deal.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{deal.product}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-green-600">{deal.discount}% OFF</span>
                <span className="text-sm">{deal.claimed}/{deal.total} claimed</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#febd69] rounded-full" style={{ width: `${(deal.claimed / deal.total) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
