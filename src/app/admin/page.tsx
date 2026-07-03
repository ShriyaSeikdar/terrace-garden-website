"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Package, TrendingUp, AlertTriangle, Star } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <Package className="h-4 w-4 text-garden-green" />
          </div>
          <div className="text-3xl font-bold">{stats?.totalProducts || 0}</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">In Stock</h3>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.inStockProducts || 0}</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-3xl font-bold">{stats?.outOfStockProducts || 0}</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-500">Featured</h3>
            <Star className="h-4 w-4 text-award-gold" />
          </div>
          <div className="text-3xl font-bold">{stats?.featuredProducts || 0}</div>
        </Card>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Products</h2>
          <Link href="/admin/products" className="text-sm text-garden-green hover:underline">View all</Link>
        </div>
        <Card className="p-0">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {stats?.recentProducts?.map((product: any) => (
              <div key={product.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <div className="text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-semibold">In Stock ({product.stock})</span>
                  ) : (
                    <span className="text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold">Out of Stock</span>
                  )}
                </div>
              </div>
            ))}
            {!stats?.recentProducts?.length && (
              <div className="p-8 text-center text-gray-500">No products found.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
