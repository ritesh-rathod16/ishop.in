"use client";

import React from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Bell, Search, ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AdminHeaderProps {
  title: string;
  breadcrumbs?: { name: string; href?: string }[];
}

export default function AdminHeader({ title, breadcrumbs }: AdminHeaderProps) {
  const { adminUser } = useAdminAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#232f3e]">{crumb.name}</Link>
                  ) : (
                    <span className="text-gray-700">{crumb.name}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-bold text-[#232f3e]">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none ml-2 w-48 text-sm"
            />
          </div>

          <Link href="/" target="_blank" className="flex items-center gap-1 text-sm text-[#007185] hover:text-[#c45500]">
            <ExternalLink className="w-4 h-4" />
            <span className="hidden md:inline">View Store</span>
          </Link>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {adminUser && (
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 bg-[#febd69] rounded-full flex items-center justify-center text-[#232f3e] font-bold">
                {adminUser.name.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700">{adminUser.name}</p>
                <p className="text-xs text-gray-500">{adminUser.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
