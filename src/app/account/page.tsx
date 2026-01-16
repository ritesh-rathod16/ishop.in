"use client";

import React from 'react';
import Link from 'next/link';
import HeaderNavigation from '@/components/sections/header-navigation';
import FooterMain from '@/components/sections/footer-main';
import { useAuth } from '@/context/AuthContext';
import { User, Package, MapPin, CreditCard, Bell, Shield, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <main className="max-w-[1200px] mx-auto p-4">
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[#febd69] border-t-transparent rounded-full mx-auto"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#E3E6E6]">
        <HeaderNavigation />
        <main className="max-w-[1200px] mx-auto p-4">
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-[24px] text-[#0F1111] mb-2">Sign in to view your account</h2>
            <p className="text-[14px] text-[#565959] mb-4">
              Access your orders, addresses, and account settings
            </p>
            <Link 
              href="/login"
              className="inline-block px-8 py-2 bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] border border-[#a88734] rounded text-[14px] text-[#0F1111] hover:from-[#f5d78e] hover:to-[#eeb933]"
            >
              Sign in
            </Link>
            <p className="text-[14px] mt-4">
              New customer?{' '}
              <Link href="/register" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                Start here
              </Link>
            </p>
          </div>
        </main>
        <FooterMain />
      </div>
    );
  }

  const accountSections = [
    {
      icon: Package,
      title: 'Your Orders',
      description: 'Track, return, cancel an order, download invoice or buy again',
      href: '/orders',
    },
    {
      icon: Shield,
      title: 'Login & Security',
      description: 'Edit login, name, and mobile number',
      href: '/account/security',
    },
    {
      icon: MapPin,
      title: 'Your Addresses',
      description: 'Edit, remove or set default address',
      href: '/account/addresses',
    },
    {
      icon: CreditCard,
      title: 'Payment Options',
      description: 'Edit or add payment methods',
      href: '/account/payments',
    },
    {
      icon: Bell,
      title: 'Communication Preferences',
      description: 'Select e-mail preferences',
      href: '/account/preferences',
    },
  ];

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <HeaderNavigation />
      
      <main className="max-w-[1200px] mx-auto p-4">
        <h1 className="text-[28px] font-normal text-[#0F1111] mb-4">Your Account</h1>

        <div className="bg-white p-6 rounded shadow-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#232f3e] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#0F1111]">{user.name}</h2>
              <p className="text-[14px] text-[#565959]">{user.email}</p>
              {user.isVerified && (
                <span className="inline-flex items-center gap-1 text-[12px] text-[#067D62] mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Verified Account
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {accountSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="bg-white p-4 rounded shadow-sm border border-[#D5D9D9] hover:bg-[#f7fafa] transition-colors group"
            >
              <div className="flex items-start gap-3">
                <section.icon className="w-8 h-8 text-[#232f3e] flex-shrink-0" />
                <div>
                  <h3 className="text-[16px] font-bold text-[#0F1111] group-hover:text-[#c7511f]">
                    {section.title}
                  </h3>
                  <p className="text-[13px] text-[#565959] mt-1">{section.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[14px] text-[#c7511f] hover:underline"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </main>

      <FooterMain />
    </div>
  );
}
