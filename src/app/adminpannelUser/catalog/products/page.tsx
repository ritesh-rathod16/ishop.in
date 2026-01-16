"use client";

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import Link from 'next/link';
import { Search, Filter, MoreVertical, Edit, Trash2, Eye, Package, Plus, Download, Upload } from 'lucide-react';

const products = [
  { id: "ISHP-001", name: "Apple iPhone 15 Pro Max (256GB)", sku: "IPH15PM256", category: "Electronics", price: 159900, stock: 45, status: "Active", image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg", lastUpdated: "2024-03-10" },
  { id: "ISHP-002", name: "Samsung Galaxy S24 Ultra 5G", sku: "SGS24U256", category: "Electronics", price: 129999, stock: 32, status: "Active", image: "https://m.media-amazon.com/images/I/71WcEhL7qrL._SX679_.jpg", lastUpdated: "2024-03-09" },
  { id: "ISHP-003", name: "Sony WH-1000XM5 Headphones", sku: "SNWH1000X5", category: "Audio", price: 26990, stock: 78, status: "Active", image: "https://m.media-amazon.com/images/I/61+btxzpfDL._SX679_.jpg", lastUpdated: "2024-03-08" },
  { id: "ISHP-004", name: "MacBook Air M3 13.6\"", sku: "MBAM313", category: "Computers", price: 114900, stock: 15, status: "Low Stock", image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg", lastUpdated: "2024-03-07" },
  { id: "ISHP-005", name: "boAt Airdopes 141 TWS", sku: "BOAT141", category: "Audio", price: 1299, stock: 234, status: "Active", image: "https://m.media-amazon.com/images/I/51Q+JytbfCL._SX679_.jpg", lastUpdated: "2024-03-06" },
  { id: "ISHP-006", name: "Nike Air Max 270", sku: "NIKAM270", category: "Fashion", price: 9995, stock: 0, status: "Out of Stock", image: "https://m.media-amazon.com/images/I/71DUW2gU9uL._UX695_.jpg", lastUpdated: "2024-03-05" },
  { id: "ISHP-007", name: "Atomic Habits by James Clear", sku: "BOOK001", category: "Books", price: 399, stock: 156, status: "Active", image: "https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg", lastUpdated: "2024-03-04" },
  { id: "ISHP-008", name: "Instant Pot Duo 7-in-1", sku: "INSTPOT7", category: "Home & Kitchen", price: 8999, stock: 8, status: "Low Stock", image: "https://m.media-amazon.com/images/I/71V1LrY1MSL._SX679_.jpg", lastUpdated: "2024-03-03" },
  { id: "ISHP-009", name: "PlayStation 5 Console", sku: "PS5DISC", category: "Gaming", price: 49990, stock: 12, status: "Active", image: "https://m.media-amazon.com/images/I/51mWHXY8hyL._SX679_.jpg", lastUpdated: "2024-03-02" },
  { id: "ISHP-010", name: "Dyson V15 Detect Vacuum", sku: "DYSNV15", category: "Home & Kitchen", price: 62900, stock: 5, status: "Low Stock", image: "https://m.media-amazon.com/images/I/61KNXhtPbKL._SX679_.jpg", lastUpdated: "2024-03-01" },
];

export default function ProductsPage() {
  const { adminUser, isLoading } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  if (isLoading || !adminUser) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700';
      case 'Out of Stock': return 'bg-red-100 text-red-700';
      case 'Draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="All Products" 
        breadcrumbs={[
          { name: 'Home', href: '/adminpannelUser' },
          { name: 'Catalog', href: '/adminpannelUser/catalog' },
          { name: 'Products' }
        ]} 
      />

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#febd69]"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <Link
              href="/adminpannelUser/catalog/add"
              className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-blue-700">{selectedProducts.length} products selected</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50">Update Price</button>
              <button className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50">Change Status</button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Archive</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="w-4 h-4 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-contain rounded bg-gray-100" />
                        <div>
                          <p className="font-medium text-sm text-[#232f3e] line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-medium">₹{product.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{product.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded" title="View">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {filteredProducts.length} of {products.length} products</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-[#232f3e] text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
