"use client";

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Plus, Play, Pause, Edit, Trash2, TrendingUp, Eye, MousePointer, DollarSign } from 'lucide-react';

const campaigns = [
  { id: 1, name: 'iPhone 15 Pro Max Launch', status: 'Active', budget: 50000, spent: 32450, impressions: 245000, clicks: 4890, roas: 4.2, acos: 8.5 },
  { id: 2, name: 'Summer Fashion Sale', status: 'Active', budget: 25000, spent: 18900, impressions: 189000, clicks: 3560, roas: 3.8, acos: 9.2 },
  { id: 3, name: 'Electronics Deals', status: 'Paused', budget: 30000, spent: 12000, impressions: 98000, clicks: 1890, roas: 2.9, acos: 12.1 },
  { id: 4, name: 'Home & Kitchen Promo', status: 'Active', budget: 15000, spent: 8900, impressions: 67000, clicks: 1230, roas: 5.1, acos: 6.8 },
  { id: 5, name: 'Book Festival', status: 'Ended', budget: 10000, spent: 10000, impressions: 156000, clicks: 4560, roas: 6.2, acos: 5.2 },
];

export default function CampaignsPage() {
  const { adminUser, isLoading } = useAdminAuth();
  const [showModal, setShowModal] = useState(false);

  if (isLoading || !adminUser) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Paused': return 'bg-yellow-100 text-yellow-700';
      case 'Ended': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Ad Campaigns" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Advertising' }, { name: 'Campaigns' }]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Spend', value: '₹82,250', icon: DollarSign, color: 'bg-green-500' },
            { label: 'Impressions', value: '755K', icon: Eye, color: 'bg-blue-500' },
            { label: 'Clicks', value: '16.1K', icon: MousePointer, color: 'bg-purple-500' },
            { label: 'Avg. ROAS', value: '4.4x', icon: TrendingUp, color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#232f3e]">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">All Campaigns</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROAS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ACoS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-sm">{campaign.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>{campaign.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">₹{campaign.budget.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">₹{campaign.spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{campaign.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{campaign.roas}x</td>
                  <td className="px-4 py-3 text-sm">{campaign.acos}%</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {campaign.status === 'Active' ? (
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="Pause"><Pause className="w-4 h-4 text-yellow-500" /></button>
                      ) : campaign.status === 'Paused' ? (
                        <button className="p-1.5 hover:bg-gray-100 rounded" title="Resume"><Play className="w-4 h-4 text-green-500" /></button>
                      ) : null}
                      <button className="p-1.5 hover:bg-gray-100 rounded" title="Edit"><Edit className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded" title="Delete"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
