"use client";

import React from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { Package, ArrowLeft, User as UserIcon } from 'lucide-react';

export default function OrdersPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AuthLayout title="My Orders" description="Loading orders...">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-10 h-10 border-4 border-garden-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="My Orders" description="Coming soon">
      <div className="space-y-6 mt-2">
        <div className="p-6 bg-soft-cream dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 text-terrace-gold dark:text-award-gold flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif font-bold text-gray-900 dark:text-white text-lg">
              Order History & Status
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              Track your plant orders, delivery status, and historical handover receipts.
            </p>
          </div>

          {user && (
            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <UserIcon className="w-3.5 h-3.5 text-garden-green" />
              <span>Signed in as <strong className="text-gray-700 dark:text-gray-300">{user.name || user.email}</strong></span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full py-2.5 flex items-center justify-center gap-2 border-garden-green text-garden-green hover:bg-garden-green hover:text-white dark:border-green-400 dark:text-green-400"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
