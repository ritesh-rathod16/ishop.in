"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Search, Mail, MessageCircle, User } from 'lucide-react';

const customers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', orders: 12, ltv: 245890, lastOrder: '2024-03-10' },
  { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', orders: 8, ltv: 156780, lastOrder: '2024-03-09' },
  { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 76543 21098', orders: 15, ltv: 389900, lastOrder: '2024-03-08' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', phone: '+91 65432 10987', orders: 5, ltv: 89500, lastOrder: '2024-03-07' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', orders: 23, ltv: 567800, lastOrder: '2024-03-06' },
];

export default function CustomersPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Customers" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Customers' }]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Customers', value: '12,456' },
            { label: 'New This Month', value: '234' },
            { label: 'Repeat Customers', value: '67%' },
            { label: 'Avg. LTV', value: '₹28,900' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border text-center">
              <p className="text-2xl font-bold text-[#232f3e]">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lifetime Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#febd69] rounded-full flex items-center justify-center text-[#232f3e] font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm">{customer.email}</p>
                    <p className="text-xs text-gray-500">{customer.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{customer.orders}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{customer.ltv.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded"><User className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><Mail className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><MessageCircle className="w-4 h-4 text-gray-500" /></button>
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
