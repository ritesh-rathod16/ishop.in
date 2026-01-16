"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { DollarSign, Calendar, TrendingUp, Download } from 'lucide-react';

export default function PaymentsPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Payout Summary" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Payments' }]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600">Upcoming Payout</h3>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[#232f3e]">₹4,56,780</p>
            <p className="text-sm text-gray-500 mt-2">Expected on March 15, 2024</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600">Last Payout</h3>
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-[#232f3e]">₹3,89,450</p>
            <p className="text-sm text-gray-500 mt-2">Paid on March 8, 2024</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-600">This Month</h3>
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-[#232f3e]">₹12,45,890</p>
            <p className="text-sm text-green-600 mt-2">+18.5% vs last month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Payout Schedule</h3>
          <div className="space-y-4">
            {[
              { period: 'Mar 8 - Mar 14', amount: 456780, status: 'Processing', date: 'Mar 15' },
              { period: 'Mar 1 - Mar 7', amount: 389450, status: 'Paid', date: 'Mar 8' },
              { period: 'Feb 22 - Feb 29', amount: 412300, status: 'Paid', date: 'Mar 1' },
              { period: 'Feb 15 - Feb 21', amount: 378900, status: 'Paid', date: 'Feb 22' },
            ].map((payout, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{payout.period}</p>
                  <p className="text-sm text-gray-500">Payout date: {payout.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{payout.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${payout.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Bank Account Details</h3>
            <button className="text-sm text-[#007185] hover:text-[#c45500]">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Bank Name</p><p className="font-medium">HDFC Bank</p></div>
            <div><p className="text-sm text-gray-500">Account Number</p><p className="font-medium">**** **** 4532</p></div>
            <div><p className="text-sm text-gray-500">IFSC Code</p><p className="font-medium">HDFC0001234</p></div>
            <div><p className="text-sm text-gray-500">Account Holder</p><p className="font-medium">iShop India Pvt Ltd</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
