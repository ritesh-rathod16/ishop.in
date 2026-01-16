"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Download, TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';

const salesData = [
  { date: '2024-03-10', orders: 156, units: 234, revenue: 2458900, avgOrder: 15762 },
  { date: '2024-03-09', orders: 142, units: 198, revenue: 2156700, avgOrder: 15186 },
  { date: '2024-03-08', orders: 167, units: 256, revenue: 2789000, avgOrder: 16701 },
  { date: '2024-03-07', orders: 134, units: 189, revenue: 1987600, avgOrder: 14833 },
  { date: '2024-03-06', orders: 178, units: 289, revenue: 3124500, avgOrder: 17554 },
  { date: '2024-03-05', orders: 145, units: 212, revenue: 2345600, avgOrder: 16176 },
  { date: '2024-03-04', orders: 123, units: 178, revenue: 1876500, avgOrder: 15256 },
];

export default function SalesReportsPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Sales Reports" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Reports' }, { name: 'Sales' }]} 
      />

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <input type="date" defaultValue="2024-03-01" className="px-4 py-2 border rounded-lg" />
            <span>to</span>
            <input type="date" defaultValue="2024-03-10" className="px-4 py-2 border rounded-lg" />
            <button className="px-4 py-2 bg-[#232f3e] text-white rounded-lg">Apply</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: '₹16,738,800', change: '+12.5%', icon: DollarSign, color: 'bg-green-500' },
            { label: 'Total Orders', value: '1,045', change: '+8.3%', icon: ShoppingCart, color: 'bg-blue-500' },
            { label: 'Units Sold', value: '1,556', change: '+15.2%', icon: Package, color: 'bg-purple-500' },
            { label: 'Avg Order Value', value: '₹16,019', change: '+3.8%', icon: TrendingUp, color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#232f3e]">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b"><h3 className="font-bold">Daily Sales Breakdown</h3></div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Sold</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Order</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {salesData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-sm">{row.orders}</td>
                  <td className="px-4 py-3 text-sm">{row.units}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{row.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">₹{row.avgOrder.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
