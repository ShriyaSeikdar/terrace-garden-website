import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/admin"><h1 className="text-xl font-bold font-serif hover:text-garden-green">TerraceGarden Admin</h1></Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            Products
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-red-600 dark:hover:bg-gray-800 transition-colors">
            <LogOut className="h-5 w-5" />
            Exit Admin
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8 max-w-full">
        {children}
      </main>
    </div>
  );
}
