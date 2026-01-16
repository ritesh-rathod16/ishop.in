"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { RotateCcw, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

const returns = [
  { id: 'RET-001', orderId: 'ORD-2024-001227', customer: 'Meera Nair', product: 'Nike Air Max 270', reason: 'Wrong size', status: 'Pending', date: '2024-03-10', amount: 9995 },
  { id: 'RET-002', orderId: 'ORD-2024-001220', customer: 'Rahul Kumar', product: 'boAt Airdopes 141', reason: 'Defective', status: 'Approved', date: '2024-03-09', amount: 1299 },
  { id: 'RET-003', orderId: 'ORD-2024-001215', customer: 'Priya Sharma', product: 'Atomic Habits Book', reason: 'Changed mind', status: 'Rejected', date: '2024-03-08', amount: 399 },
  { id: 'RET-004', orderId: 'ORD-2024-001210', customer: 'Amit Singh', product: 'Sony Headphones', reason: 'Not as described', status: 'Refunded', date: '2024-03-07', amount: 26990 },
  { id: 'RET-005', orderId: 'ORD-2024-001205', customer: 'Sneha Patel', product: 'Instant Pot', reason: 'Damaged in transit', status: 'Pending', date: '2024-03-06', amount: 8999 },
];

export default function ReturnsPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Approved': return 'bg-blue-100 text-blue-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Refunded': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Returns & Refunds" 
        breadcrumbs={[
          { name: 'Home', href: '/adminpannelUser' },
          { name: 'Orders', href: '/adminpannelUser/orders' },
          { name: 'Returns' }
        ]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Pending', count: 12, icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
            { label: 'Approved', count: 8, icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
            { label: 'Rejected', count: 3, icon: XCircle, color: 'bg-red-100 text-red-600' },
            { label: 'Refunded', count: 45, icon: RotateCcw, color: 'bg-green-100 text-green-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#232f3e]">{stat.count}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {returns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-sm text-[#007185]">{ret.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ret.orderId}</td>
                    <td className="px-4 py-3 text-sm">{ret.customer}</td>
                    <td className="px-4 py-3 text-sm">{ret.product}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{ret.reason}</td>
                    <td className="px-4 py-3 text-sm font-medium">₹{ret.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ret.status)}`}>{ret.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{ret.date}</td>
                    <td className="px-4 py-3">
                      {ret.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">Approve</button>
                          <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Reject</button>
                        </div>
                      )}
                      {ret.status === 'Approved' && (
                        <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">Process Refund</button>
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
