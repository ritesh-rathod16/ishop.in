"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, RotateCcw, AlertTriangle,
  DollarSign, Users, Eye, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

const kpiData = [
  { title: "Today's Sales", value: "₹2,45,890", change: "+12.5%", trend: "up", icon: DollarSign, color: "bg-green-500" },
  { title: "Units Sold", value: "1,234", change: "+8.3%", trend: "up", icon: Package, color: "bg-blue-500" },
  { title: "Pending Orders", value: "89", change: "-5.2%", trend: "down", icon: Clock, color: "bg-orange-500" },
  { title: "Return Requests", value: "12", change: "+2.1%", trend: "up", icon: RotateCcw, color: "bg-red-500" },
];

const topProducts = [
  { name: "iPhone 15 Pro Max", revenue: "₹47,97,000", units: 300, growth: 15.2 },
  { name: "Samsung Galaxy S24 Ultra", revenue: "₹38,99,700", units: 300, growth: 12.8 },
  { name: "MacBook Air M3", revenue: "₹34,47,000", units: 300, growth: 8.5 },
  { name: "Sony WH-1000XM5", revenue: "₹13,49,500", units: 500, growth: 22.1 },
  { name: "boAt Airdopes 141", revenue: "₹6,49,500", units: 5000, growth: 45.3 },
];

const recentOrders = [
  { id: "ORD-2024-001234", customer: "Rahul Sharma", amount: "₹1,59,900", status: "Delivered", time: "2 hours ago" },
  { id: "ORD-2024-001233", customer: "Priya Patel", amount: "₹26,990", status: "Shipped", time: "4 hours ago" },
  { id: "ORD-2024-001232", customer: "Amit Kumar", amount: "₹8,999", status: "Processing", time: "5 hours ago" },
  { id: "ORD-2024-001231", customer: "Sneha Gupta", amount: "₹1,29,999", status: "Pending", time: "6 hours ago" },
  { id: "ORD-2024-001230", customer: "Vikram Singh", amount: "₹3,299", status: "Delivered", time: "8 hours ago" },
];

const notifications = [
  { type: "warning", title: "Low Stock Alert", message: "5 products are running low on stock", time: "10 min ago" },
  { type: "info", title: "New Order", message: "You have 12 new orders to process", time: "30 min ago" },
  { type: "error", title: "Policy Warning", message: "2 listings need attention due to policy compliance", time: "1 hour ago" },
  { type: "success", title: "Payout Processed", message: "₹4,56,780 has been transferred to your account", time: "2 hours ago" },
];

const salesData = [
  { day: "Mon", sales: 45000 },
  { day: "Tue", sales: 52000 },
  { day: "Wed", sales: 48000 },
  { day: "Thu", sales: 61000 },
  { day: "Fri", sales: 55000 },
  { day: "Sat", sales: 78000 },
  { day: "Sun", sales: 72000 },
];

const maxSales = Math.max(...salesData.map(d => d.sales));

export default function AdminDashboard() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#febd69]"></div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Dashboard" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Dashboard' }]} 
      />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700">Welcome back, {adminUser.name}!</h2>
          <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening with your store today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-[#232f3e]">{kpi.value}</p>
                  <div className={`flex items-center gap-1 mt-2 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{kpi.change} vs yesterday</span>
                  </div>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#232f3e]">Account Health</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Excellent</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">98.5%</p>
              <p className="text-xs text-gray-500">Order Defect Rate</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">0.2%</p>
              <p className="text-xs text-gray-500">Cancellation Rate</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">99.1%</p>
              <p className="text-xs text-gray-500">Late Shipment Rate</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">4.8</p>
              <p className="text-xs text-gray-500">Customer Rating</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#232f3e] mb-4">Sales Overview (Last 7 Days)</h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {salesData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[#febd69] rounded-t-lg hover:bg-[#f3a847] transition-colors cursor-pointer"
                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">{data.day}</p>
                  <p className="text-xs font-medium">₹{(data.sales/1000).toFixed(0)}K</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#232f3e] mb-4">Traffic vs Conversion</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Page Views</span>
                  <span className="font-medium">24,589</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Sessions</span>
                  <span className="font-medium">12,456</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Conversion Rate</span>
                  <span className="font-medium">3.2%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Buy Box %</span>
                  <span className="font-medium">89%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-[#febd69] rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#232f3e] mb-4">Top 5 Products by Revenue</h3>
            <div className="space-y-3">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#232f3e] text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.units} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{product.revenue}</p>
                    <p className="text-xs text-green-600">+{product.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#232f3e]">Recent Orders</h3>
              <a href="/adminpannelUser/orders" className="text-sm text-[#007185] hover:text-[#c45500]">View All</a>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer} • {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{order.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-[#232f3e] mb-4">Notifications & Alerts</h3>
          <div className="space-y-3">
            {notifications.map((notification, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                </div>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
