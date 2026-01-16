"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Store, Mail, Phone, Save, Upload } from 'lucide-react';

export default function SettingsPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Store Profile" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Settings' }]} 
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Store Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input type="text" defaultValue="iShop India" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                  <textarea rows={3} defaultValue="India's most trusted online shopping destination for electronics, fashion, home & more." className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@ishop.in" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                    <input type="tel" defaultValue="+91 1800-123-4567" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                  <textarea rows={2} defaultValue="123 Commerce Street, Bandra West, Mumbai, Maharashtra 400050" className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Business Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
                  <input type="text" defaultValue="27AABCU9603R1ZM" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
                  <input type="text" defaultValue="AABCU9603R" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option>Private Limited</option>
                    <option>Proprietorship</option>
                    <option>Partnership</option>
                    <option>LLP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year Established</label>
                  <input type="text" defaultValue="2020" className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Store Logo</h3>
              <div className="text-center">
                <div className="w-32 h-32 bg-[#febd69] rounded-xl mx-auto flex items-center justify-center mb-4">
                  <Store className="w-16 h-16 text-[#232f3e]" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg mx-auto hover:bg-gray-50">
                  <Upload className="w-4 h-4" /> Upload Logo
                </button>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Notification Settings</h3>
              <div className="space-y-3">
                {[
                  { label: 'New Order Alerts', checked: true },
                  { label: 'Return Requests', checked: true },
                  { label: 'Low Stock Alerts', checked: true },
                  { label: 'Payment Updates', checked: false },
                  { label: 'Marketing Emails', checked: false },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4" />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
          <button className="px-6 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] rounded-lg font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
