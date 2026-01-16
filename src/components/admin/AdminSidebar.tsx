"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  LayoutDashboard, Package, ShoppingCart, Megaphone, BarChart3, Users, CreditCard, Settings, UserCog,
  ChevronDown, ChevronRight, Menu, X, Bell, Search, LogOut, Store
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/adminpannelUser', icon: LayoutDashboard },
  {
    name: 'Catalog & Inventory',
    href: '/adminpannelUser/catalog',
    icon: Package,
    children: [
      { name: 'All Products', href: '/adminpannelUser/catalog/products' },
      { name: 'Add Product', href: '/adminpannelUser/catalog/add' },
      { name: 'Inventory Health', href: '/adminpannelUser/catalog/inventory' },
    ]
  },
  {
    name: 'Orders & Returns',
    href: '/adminpannelUser/orders',
    icon: ShoppingCart,
    children: [
      { name: 'All Orders', href: '/adminpannelUser/orders' },
      { name: 'Returns & Refunds', href: '/adminpannelUser/orders/returns' },
    ]
  },
  {
    name: 'Advertising & Deals',
    href: '/adminpannelUser/advertising',
    icon: Megaphone,
    children: [
      { name: 'Ad Campaigns', href: '/adminpannelUser/advertising/campaigns' },
      { name: 'Coupons & Promotions', href: '/adminpannelUser/advertising/promotions' },
    ]
  },
  {
    name: 'Reports & Analytics',
    href: '/adminpannelUser/reports',
    icon: BarChart3,
    children: [
      { name: 'Sales Reports', href: '/adminpannelUser/reports/sales' },
      { name: 'Inventory Reports', href: '/adminpannelUser/reports/inventory' },
      { name: 'Performance', href: '/adminpannelUser/reports/performance' },
    ]
  },
  {
    name: 'Customers & Messages',
    href: '/adminpannelUser/customers',
    icon: Users,
    children: [
      { name: 'Customer List', href: '/adminpannelUser/customers' },
      { name: 'Messages', href: '/adminpannelUser/customers/messages' },
    ]
  },
  {
    name: 'Payments & Taxes',
    href: '/adminpannelUser/payments',
    icon: CreditCard,
    children: [
      { name: 'Payout Summary', href: '/adminpannelUser/payments' },
      { name: 'Transactions', href: '/adminpannelUser/payments/transactions' },
      { name: 'Tax & Invoices', href: '/adminpannelUser/payments/taxes' },
    ]
  },
  {
    name: 'Account & Settings',
    href: '/adminpannelUser/settings',
    icon: Settings,
    children: [
      { name: 'Store Profile', href: '/adminpannelUser/settings' },
      { name: 'Shipping Settings', href: '/adminpannelUser/settings/shipping' },
      { name: 'Return Policies', href: '/adminpannelUser/settings/policies' },
    ]
  },
  { name: 'User Management', href: '/adminpannelUser/users', icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { adminUser, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Catalog & Inventory', 'Orders & Returns']);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some(child => pathname?.startsWith(child.href));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <Link href="/adminpannelUser" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#febd69] rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-[#232f3e]" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">iShop.in</h1>
              <p className="text-xs text-gray-400">Seller Central</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isParentActive(item)
                      ? 'bg-[#febd69] text-[#232f3e]'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && (
                    expandedItems.includes(item.name)
                      ? <ChevronDown className="w-4 h-4" />
                      : <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {!collapsed && expandedItems.includes(item.name) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(child.href)
                            ? 'bg-gray-700 text-[#febd69]'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#febd69] text-[#232f3e]'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        {adminUser && !collapsed && (
          <div className="mb-3">
            <p className="text-sm text-white font-medium truncate">{adminUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{adminUser.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#232f3e] rounded-lg text-white"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-[#232f3e] transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <SidebarContent />
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex fixed bottom-4 left-2 z-50 p-2 bg-[#37475a] rounded-full text-white hover:bg-[#485769] transition-colors"
        style={{ left: collapsed ? '70px' : '240px' }}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 rotate-90" />}
      </button>
    </>
  );
}
