"use client";

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Search, Eye, Printer, MessageCircle, Truck, Mail, X, ChevronDown, Package, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number; image: string }[];
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery?: string;
  shippingAddress: {
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface OrderStats {
  placed?: number;
  confirmed?: number;
  processing?: number;
  shipped?: number;
  out_for_delivery?: number;
  delivered?: number;
  cancelled?: number;
  returned?: number;
  refunded?: number;
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  placed: { label: 'Placed', color: 'text-yellow-700', bgColor: 'bg-yellow-100', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: CheckCircle },
  processing: { label: 'Processing', color: 'text-indigo-700', bgColor: 'bg-indigo-100', icon: Package },
  shipped: { label: 'Shipped', color: 'text-purple-700', bgColor: 'bg-purple-100', icon: Truck },
  out_for_delivery: { label: 'Out for Delivery', color: 'text-cyan-700', bgColor: 'bg-cyan-100', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-700', bgColor: 'bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100', icon: XCircle },
  returned: { label: 'Returned', color: 'text-orange-700', bgColor: 'bg-orange-100', icon: RefreshCw },
  refunded: { label: 'Refunded', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: RefreshCw },
};

const validTransitions: Record<string, string[]> = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['out_for_delivery', 'cancelled'],
  out_for_delivery: ['delivered', 'cancelled'],
  delivered: ['returned'],
  cancelled: [],
  returned: ['refunded'],
  refunded: [],
};

export default function OrdersPage() {
  const { adminUser, isLoading: authLoading } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    trackingNumber: '',
    trackingUrl: '',
    cancellationReason: '',
    sendEmail: true,
  });

  useEffect(() => {
    if (adminUser) {
      fetchOrders();
    }
  }, [adminUser, statusFilter, searchQuery]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (searchQuery) params.set('search', searchQuery);
      
      const res = await fetch(`/api/orders?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.orders);
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setUpdateForm({
      status: order.status,
      trackingNumber: order.trackingNumber || '',
      trackingUrl: '',
      cancellationReason: '',
      sendEmail: true,
    });
    setShowModal(true);
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${selectedOrder.orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateForm),
      });
      
      const data = await res.json();
      
      if (data.success) {
        alert(`Order updated! ${updateForm.sendEmail ? 'Email notification sent to customer.' : ''}`);
        setShowModal(false);
        fetchOrders();
      } else {
        alert(data.message || 'Failed to update order');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update order');
    } finally {
      setUpdating(false);
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalOrders = Object.values(stats).reduce((a, b) => a + (b || 0), 0);

  if (authLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Orders Management" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Orders' }]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
          {[
            { key: 'all', label: 'All', count: totalOrders, color: 'bg-gray-100' },
            { key: 'placed', label: 'Placed', count: stats.placed || 0, color: 'bg-yellow-100' },
            { key: 'confirmed', label: 'Confirmed', count: stats.confirmed || 0, color: 'bg-blue-100' },
            { key: 'processing', label: 'Processing', count: stats.processing || 0, color: 'bg-indigo-100' },
            { key: 'shipped', label: 'Shipped', count: stats.shipped || 0, color: 'bg-purple-100' },
            { key: 'out_for_delivery', label: 'Out for Delivery', count: stats.out_for_delivery || 0, color: 'bg-cyan-100' },
            { key: 'delivered', label: 'Delivered', count: stats.delivered || 0, color: 'bg-green-100' },
            { key: 'cancelled', label: 'Cancelled', count: stats.cancelled || 0, color: 'bg-red-100' },
            { key: 'returned', label: 'Returned', count: (stats.returned || 0) + (stats.refunded || 0), color: 'bg-orange-100' },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setStatusFilter(stat.key)}
              className={`${stat.color} rounded-xl p-3 text-center transition-all ${statusFilter === stat.key ? 'ring-2 ring-[#febd69] ring-offset-2' : 'hover:shadow-md'}`}
            >
              <p className="text-xl font-bold text-[#232f3e]">{stat.count}</p>
              <p className="text-xs text-gray-600 truncate">{stat.label}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-[#febd69]"
              />
            </div>
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
          </div>
          <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const statusInfo = statusConfig[order.status] || statusConfig.placed;
                    return (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="font-medium text-sm text-[#007185]">{order.orderId}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-sm">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.items.length} item(s)</td>
                        <td className="px-4 py-3 text-sm font-medium">₹{order.total.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPaymentColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                            <p className="text-xs text-gray-400 mt-1">{order.paymentMethod}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                            <statusInfo.icon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => openUpdateModal(order)}
                              className="p-1.5 hover:bg-[#febd69] hover:text-[#232f3e] rounded transition-colors" 
                              title="Update Status"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded" title="View"><Eye className="w-4 h-4 text-gray-500" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded" title="Print"><Printer className="w-4 h-4 text-gray-500" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Update Order</h2>
                <p className="text-sm text-gray-500">{selectedOrder.orderId}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <p className="font-medium">{selectedOrder.customerName}</p>
                <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                <p className="text-sm text-gray-600">{selectedOrder.customerPhone}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Order Items</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 text-sm rounded-full ${statusConfig[selectedOrder.status]?.bgColor} ${statusConfig[selectedOrder.status]?.color}`}>
                    Current: {statusConfig[selectedOrder.status]?.label}
                  </span>
                  <span className="text-gray-400">→</span>
                </div>
                <select
                  value={updateForm.status}
                  onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                >
                  <option value={selectedOrder.status}>No change</option>
                  {validTransitions[selectedOrder.status]?.map((status) => (
                    <option key={status} value={status}>{statusConfig[status]?.label}</option>
                  ))}
                </select>
              </div>

              {(updateForm.status === 'shipped' || selectedOrder.status === 'shipped') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={updateForm.trackingNumber}
                    onChange={(e) => setUpdateForm({ ...updateForm, trackingNumber: e.target.value })}
                    placeholder="Enter tracking number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
              )}

              {updateForm.status === 'cancelled' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Reason</label>
                  <textarea
                    value={updateForm.cancellationReason}
                    onChange={(e) => setUpdateForm({ ...updateForm, cancellationReason: e.target.value })}
                    placeholder="Enter reason for cancellation"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
              )}

              <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={updateForm.sendEmail}
                  onChange={(e) => setUpdateForm({ ...updateForm, sendEmail: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <p className="font-medium text-sm">Send email notification</p>
                  <p className="text-xs text-gray-500">Customer will be notified about this status change</p>
                </div>
                <Mail className="w-5 h-5 text-blue-500 ml-auto" />
              </label>
            </div>

            <div className="p-6 border-t flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOrder}
                disabled={updating || updateForm.status === selectedOrder.status}
                className="flex-1 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#232f3e] border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>Update & {updateForm.sendEmail ? 'Notify' : 'Save'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
