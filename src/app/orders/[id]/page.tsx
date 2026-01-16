"use client";

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Phone, Mail, RotateCcw, HelpCircle, ChevronRight, Download, Star } from 'lucide-react';

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  seller?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  cancellationReason?: string;
  statusHistory: { status: string; timestamp: string; note?: string }[];
  createdAt: string;
}

const statusSteps = [
  { key: 'placed', label: 'Order Placed', icon: Package },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: Clock },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const getStatusIndex = (status: string) => {
  const idx = statusSteps.findIndex(s => s.key === status);
  return idx >= 0 ? idx : 0;
};

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message || 'Order not found');
      }
    } catch (err) {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full"></div>
          </div>
        </div>
        <FooterMain />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Order Not Found</h1>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link href="/orders" className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] px-6 py-2 rounded-lg font-medium">
              View All Orders
            </Link>
          </div>
        </div>
        <FooterMain />
      </div>
    );
  }

  const currentStatusIndex = getStatusIndex(order.status);
  const isCancelled = order.status === 'cancelled';
  const isReturned = order.status === 'returned' || order.status === 'refunded';

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        <nav className="text-sm mb-4">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-[#007185] hover:text-[#C7511F]">Home</Link></li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li><Link href="/orders" className="text-[#007185] hover:text-[#C7511F]">Your Orders</Link></li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-600">{order.orderId}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#0F1111]">Order Details</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <span>Order ID: <span className="font-medium text-[#007185]">{order.orderId}</span></span>
                  <span>•</span>
                  <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4" /> Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                  <HelpCircle className="w-4 h-4" /> Need Help?
                </button>
              </div>
            </div>
          </div>

          {!isCancelled && !isReturned && (
            <div className="p-6">
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
                <div 
                  className="absolute top-5 left-0 h-1 bg-[#067D62] -z-10 transition-all duration-500"
                  style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                ></div>
                <div className="flex justify-between">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStatusIndex;
                    const isCurrent = idx === currentStatusIndex;
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-[#067D62] text-white' : 'bg-gray-200 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-[#067D62]/20' : ''}`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <p className={`text-xs mt-2 text-center ${isCompleted ? 'text-[#067D62] font-medium' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {order.estimatedDelivery && order.status !== 'delivered' && (
                <div className="mt-6 p-4 bg-[#F0F2F2] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="text-lg font-bold text-[#067D62]">{order.estimatedDelivery}</p>
                  </div>
                  {order.trackingNumber && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-mono text-sm font-medium">{order.trackingNumber}</p>
                      {order.trackingUrl && (
                        <a href={order.trackingUrl} target="_blank" rel="noopener" className="text-sm text-[#007185] hover:text-[#C7511F]">
                          Track Package →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              {order.status === 'delivered' && order.deliveredAt && (
                <div className="mt-6 p-4 bg-[#E7F4E4] rounded-lg">
                  <p className="text-[#067D62] font-medium">
                    ✓ Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>
          )}

          {isCancelled && (
            <div className="p-6">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">Order Cancelled</p>
                {order.cancellationReason && (
                  <p className="text-sm text-red-600 mt-1">Reason: {order.cancellationReason}</p>
                )}
              </div>
            </div>
          )}

          {isReturned && (
            <div className="p-6">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-700 font-medium">
                  {order.status === 'refunded' ? 'Refund Completed' : 'Return in Progress'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Items ({order.items.length})</h2>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <img 
                      src={item.image || 'https://via.placeholder.com/100'} 
                      alt={item.name} 
                      className="w-20 h-20 object-contain bg-[#F7F7F7] rounded"
                    />
                    <div className="flex-1">
                      <Link href={`/product/${item.productId}`} className="font-medium text-[#0F1111] hover:text-[#C7511F] line-clamp-2">
                        {item.name}
                      </Link>
                      {item.seller && <p className="text-xs text-gray-500 mt-1">Sold by: {item.seller}</p>}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    {order.status === 'delivered' && (
                      <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F]">
                          <Star className="w-4 h-4" /> Write Review
                        </button>
                        <button className="flex items-center gap-1 text-xs text-[#007185] hover:text-[#C7511F]">
                          <RotateCcw className="w-4 h-4" /> Return
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {order.statusHistory.map((history, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-[#067D62]' : 'bg-gray-300'}`}></div>
                      {idx < order.statusHistory.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-sm capitalize">{history.status.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(history.timestamp).toLocaleString('en-IN', { 
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </p>
                      {history.note && <p className="text-xs text-gray-600 mt-1">{history.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({order.items.length})</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.shipping === 0 ? <span className="text-[#067D62]">FREE</span> : `₹${order.shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#067D62]">
                    <span>Discount</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" /> Delivery Address
              </h2>
              <div className="text-sm">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600 mt-1">{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && (
                  <p className="text-gray-600">{order.shippingAddress.addressLine2}</p>
                )}
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                <p className="text-gray-600 mt-2 flex items-center gap-1">
                  <Phone className="w-4 h-4" /> {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" /> Payment
              </h2>
              <div className="text-sm">
                <p className="font-medium">{order.paymentMethod}</p>
                <p className={`text-sm mt-1 ${order.paymentStatus === 'paid' ? 'text-[#067D62]' : 'text-yellow-600'}`}>
                  {order.paymentStatus === 'paid' ? '✓ Payment Completed' : 'Payment Pending (COD)'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Need Help?</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 text-left">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Problem with this order?</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 text-left">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Contact Seller</span>
                </button>
                {order.status === 'delivered' && (
                  <button className="w-full flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 text-left">
                    <RotateCcw className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Return Items</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterMain />
    </div>
  );
}
