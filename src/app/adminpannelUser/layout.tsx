"use client";

import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/adminpannelUser/login';

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex min-h-screen bg-gray-100">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      )}
    </AdminAuthProvider>
  );
}
