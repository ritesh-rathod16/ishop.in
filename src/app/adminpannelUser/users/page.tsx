"use client";

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Plus, Edit, Trash2, Shield, UserPlus } from 'lucide-react';

const users = [
  { id: 1, name: 'Admin User', email: 'admin@ishop.in', role: 'Super Admin', status: 'Active', lastLogin: '2024-03-10 14:30' },
  { id: 2, name: 'Priya Manager', email: 'priya.manager@ishop.in', role: 'Inventory Manager', status: 'Active', lastLogin: '2024-03-10 12:15' },
  { id: 3, name: 'Rahul Support', email: 'rahul.support@ishop.in', role: 'Support Agent', status: 'Active', lastLogin: '2024-03-10 10:45' },
  { id: 4, name: 'Amit Analyst', email: 'amit.analyst@ishop.in', role: 'Analyst', status: 'Active', lastLogin: '2024-03-09 18:30' },
  { id: 5, name: 'Sneha Orders', email: 'sneha.orders@ishop.in', role: 'Order Manager', status: 'Inactive', lastLogin: '2024-03-05 16:45' },
];

const roles = [
  { name: 'Super Admin', permissions: ['All Access'], users: 1 },
  { name: 'Inventory Manager', permissions: ['Catalog', 'Inventory', 'Reports'], users: 1 },
  { name: 'Order Manager', permissions: ['Orders', 'Returns', 'Customers'], users: 1 },
  { name: 'Analyst', permissions: ['Reports', 'Analytics'], users: 1 },
  { name: 'Support Agent', permissions: ['Customers', 'Messages', 'Orders (View)'], users: 1 },
];

export default function UsersPage() {
  const { adminUser, isLoading } = useAdminAuth();

  if (isLoading || !adminUser) return null;

  return (
    <div className="min-h-screen">
      <AdminHeader 
        title="User Management" 
        breadcrumbs={[{ name: 'Home', href: '/adminpannelUser' }, { name: 'Users' }]} 
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Team Members</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#232f3e] font-medium rounded-lg">
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#febd69] rounded-full flex items-center justify-center text-[#232f3e] font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-gray-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Roles & Permissions</h2>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Shield className="w-4 h-4" /> Create Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{role.name}</h3>
                <span className="text-xs text-gray-500">{role.users} user(s)</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {role.permissions.map((perm, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs bg-gray-100 rounded">{perm}</span>
                ))}
              </div>
              <button className="text-sm text-[#007185] hover:text-[#c45500]">Edit Permissions</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
