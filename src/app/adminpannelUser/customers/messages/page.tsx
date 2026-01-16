"use client";

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Send, Search, Tag, Clock } from 'lucide-react';

const conversations = [
  { id: 1, customer: 'Rahul Sharma', subject: 'Order Delivery Query', lastMessage: 'When will my order arrive?', time: '2 min ago', unread: true, tag: 'Shipping' },
  { id: 2, customer: 'Priya Patel', subject: 'Return Request', lastMessage: 'I want to return this product', time: '15 min ago', unread: true, tag: 'Refund' },
  { id: 3, customer: 'Amit Kumar', subject: 'Product Information', lastMessage: 'Does this come with warranty?', time: '1 hour ago', unread: false, tag: 'Product' },
  { id: 4, customer: 'Sneha Gupta', subject: 'Payment Issue', lastMessage: 'My payment failed but amount deducted', time: '2 hours ago', unread: false, tag: 'Payment' },
  { id: 5, customer: 'Vikram Singh', subject: 'Bulk Order Query', lastMessage: 'Can I get discount on 50 units?', time: '3 hours ago', unread: false, tag: 'Sales' },
];

const messages = [
  { id: 1, sender: 'customer', text: 'Hi, I ordered iPhone 15 Pro Max (Order #ORD-2024-001234) but tracking shows it\'s stuck in transit for 3 days. Can you help?', time: '10:30 AM' },
  { id: 2, sender: 'agent', text: 'Hello Rahul! I apologize for the inconvenience. Let me check the status of your order right away.', time: '10:32 AM' },
  { id: 3, sender: 'agent', text: 'I can see your package is currently at the Mumbai sorting facility. Due to high volume, there\'s a slight delay. It should be delivered by tomorrow.', time: '10:35 AM' },
  { id: 4, sender: 'customer', text: 'When will my order arrive?', time: '10:40 AM' },
];

export default function MessagesPage() {
  const { adminUser, isLoading } = useAdminAuth();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [reply, setReply] = useState('');

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Messages" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Customers' }, { name: 'Messages' }]} 
      />

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            <div className="w-1/3 border-r">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm" />
                </div>
              </div>
              <div className="overflow-y-auto" style={{ height: 'calc(100% - 65px)' }}>
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation.id === conv.id ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-medium text-sm ${conv.unread ? 'text-[#232f3e]' : 'text-gray-600'}`}>{conv.customer}</span>
                      <span className="text-xs text-gray-400">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conv.subject}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-400 truncate">{conv.lastMessage}</p>
                      <span className="px-2 py-0.5 text-xs bg-gray-100 rounded">{conv.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{selectedConversation.customer}</h3>
                  <p className="text-sm text-gray-500">{selectedConversation.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-1 border rounded text-sm">
                    <option>Shipping</option>
                    <option>Refund</option>
                    <option>Product</option>
                    <option>Payment</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'agent' ? 'bg-[#232f3e] text-white' : 'bg-gray-100'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-gray-300' : 'text-gray-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2 mb-2">
                  {['Thank you for contacting us!', 'I\'ll check and get back to you.', 'Is there anything else I can help with?'].map((template, idx) => (
                    <button key={idx} onClick={() => setReply(template)} className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200">
                      {template.slice(0, 20)}...
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button className="px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] rounded-lg flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
