"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Package, AlertTriangle, TrendingDown, RefreshCw, ArrowUp, ArrowDown } from 'lucide-react';

const inventoryKPIs = [
  { title: 'Total SKUs', value: '2,456', icon: Package, color: 'bg-blue-500' },
  { title: 'Low Stock Items', value: '23', icon: AlertTriangle, color: 'bg-yellow-500' },
  { title: 'Out of Stock', value: '8', icon: TrendingDown, color: 'bg-red-500' },
  { title: 'Overstock Items', value: '12', icon: RefreshCw, color: 'bg-purple-500' },
];

const lowStockItems = [
  { name: 'MacBook Air M3 13.6"', sku: 'MBAM313', current: 15, reorder: 50, daysLeft: 5 },
  { name: 'Instant Pot Duo 7-in-1', sku: 'INSTPOT7', current: 8, reorder: 30, daysLeft: 3 },
  { name: 'Dyson V15 Detect Vacuum', sku: 'DYSNV15', current: 5, reorder: 20, daysLeft: 2 },
  { name: 'PlayStation 5 Console', sku: 'PS5DISC', current: 12, reorder: 40, daysLeft: 4 },
  { name: 'Apple Watch Series 9', sku: 'AWS9GPS', current: 18, reorder: 60, daysLeft: 6 },
];

const agingInventory = [
  { name: 'Nokia 3310 Retro', sku: 'NK3310', stock: 234, daysInStock: 180, value: '₹4,68,000' },
  { name: 'Blackberry KeyOne', sku: 'BBKEY1', stock: 89, daysInStock: 150, value: '₹2,67,000' },
  { name: 'DVD Player Sony', sku: 'DVDSNY', stock: 156, daysInStock: 120, value: '₹3,12,000' },
  { name: 'MP3 Player Basic', sku: 'MP3BSC', stock: 342, daysInStock: 90, value: '₹1,71,000' },
];

export default function InventoryHealthPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Inventory Health" 
        breadcrumbs={[
          { name: 'Home', href: '/adminpannelUser' },
          { name: 'Catalog', href: '/adminpannelUser/catalog/products' },
          { name: 'Inventory Health' }
        ]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {inventoryKPIs.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-[#232f3e]">{kpi.value}</p>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#232f3e]">Low Stock Alerts</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">23 items</span>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.current}</span>
                      <span className="text-xs text-gray-400">/ {item.reorder}</span>
                    </div>
                    <p className={`text-xs ${item.daysLeft <= 3 ? 'text-red-500' : 'text-yellow-600'}`}>
                      ~{item.daysLeft} days left
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] text-xs rounded font-medium">
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#232f3e]">Aging Inventory</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">12 items</span>
            </div>
            <div className="space-y-3">
              {agingInventory.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">SKU: {item.sku} • {item.stock} units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">{item.daysInStock} days</p>
                    <p className="text-xs text-gray-500">Value: {item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-[#232f3e] mb-4">Inventory Movement</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opening</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Received</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Returned</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Closing</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { name: 'iPhone 15 Pro Max', opening: 100, received: 50, sold: 65, returned: 3, closing: 88 },
                  { name: 'Samsung Galaxy S24', opening: 80, received: 40, sold: 52, returned: 2, closing: 70 },
                  { name: 'Sony Headphones', opening: 150, received: 0, sold: 45, returned: 1, closing: 106 },
                  { name: 'MacBook Air M3', opening: 30, received: 20, sold: 35, returned: 0, closing: 15 },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-sm">{item.opening}</td>
                    <td className="px-4 py-3 text-sm text-green-600">+{item.received}</td>
                    <td className="px-4 py-3 text-sm text-red-600">-{item.sold}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">+{item.returned}</td>
                    <td className="px-4 py-3 text-sm font-medium">{item.closing}</td>
                    <td className="px-4 py-3">
                      {item.closing > item.opening ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
