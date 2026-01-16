"use client";

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Upload, X, Plus, Save } from 'lucide-react';

const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Beauty', 'Sports', 'Toys', 'Computers', 'Audio', 'Gaming'];

export default function AddProductPage() {
  const { adminUser, isLoading } = useAdminAuth();
  const [formData, setFormData] = useState({
    title: '', description: '', brand: '', category: '', price: '', discount: '', tax: '', stock: '', sku: '',
    weight: '', length: '', width: '', height: '', keywords: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState([{ size: '', color: '', stock: '' }]);

  if (isLoading || !adminUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addVariant = () => {
    setVariants([...variants, { size: '', color: '', stock: '' }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="Add New Product" 
        breadcrumbs={[
          { name: 'Home', href: '/adminpannelUser' },
          { name: 'Catalog', href: '/adminpannelUser/catalog/products' },
          { name: 'Add Product' }
        ]} 
      />

      <div className="p-6">
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter product title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Enter product description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Product Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-2">Drag and drop images here, or click to browse</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB. Recommended: 1000x1000px</p>
                <button type="button" className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                  Browse Files
                </button>
              </div>
              {images.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 bg-gray-100 rounded-lg">
                      <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Pricing & Stock</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax (%)</label>
                  <input
                    type="number"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    placeholder="18"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Variants (Optional)</h3>
                <button type="button" onClick={addVariant} className="flex items-center gap-1 text-sm text-[#007185] hover:text-[#c45500]">
                  <Plus className="w-4 h-4" /> Add Variant
                </button>
              </div>
              <div className="space-y-3">
                {variants.map((variant, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Size (e.g., M, L, XL)"
                      value={variant.size}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[idx].size = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                    <input
                      type="text"
                      placeholder="Color"
                      value={variant.color}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[idx].color = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variant.stock}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[idx].stock = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                    {variants.length > 1 && (
                      <button type="button" onClick={() => removeVariant(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Shipping Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="0.00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length (cm)</label>
                  <input type="number" name="length" value={formData.length} onChange={handleChange} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
                  <input type="number" name="width" value={formData.width} onChange={handleChange} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Product Status</h3>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">SKU</h3>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="Enter SKU" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">SEO Keywords</h3>
              <textarea name="keywords" value={formData.keywords} onChange={handleChange} rows={3} placeholder="Enter keywords separated by commas" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#febd69]" />
            </div>

            <div className="flex gap-3">
              <button type="button" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Save as Draft
              </button>
              <button type="submit" className="flex-1 px-4 py-3 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] rounded-lg font-medium flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
