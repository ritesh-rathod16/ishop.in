"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AdminUser {
  email: string;
  role: string;
  name: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  email: 'admin@ishop.in',
  password: 'admin@ishop',
  role: 'Super Admin',
  name: 'Admin User'
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('ishop_admin');
    if (stored) {
      try {
        setAdminUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('ishop_admin');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && !adminUser && pathname?.startsWith('/adminpannelUser') && pathname !== '/adminpannelUser/login') {
      router.push('/adminpannelUser/login');
    }
  }, [isLoading, adminUser, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = { email, role: ADMIN_CREDENTIALS.role, name: ADMIN_CREDENTIALS.name };
      setAdminUser(user);
      localStorage.setItem('ishop_admin', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('ishop_admin');
    router.push('/adminpannelUser/login');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
