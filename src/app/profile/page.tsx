"use client";

import React from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, Mail, Shield, LogOut, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <AuthLayout title="Your Profile" description="Loading profile...">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-10 h-10 border-4 border-garden-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Your Profile" description="Coming soon">
      <div className="space-y-6 mt-2">
        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-soft-cream dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-garden-green/10 dark:bg-green-900/30 text-garden-green dark:text-green-400 flex items-center justify-center font-serif font-bold shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base">
                    {user.name || 'Your Account'}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-terrace-gold" />
                  <span>Role: <strong className="text-gray-700 dark:text-gray-300 capitalize">{user.role.toLowerCase()}</strong></span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 dark:bg-green-900/40 text-garden-green dark:text-green-300">
                  Active Session
                </span>
              </div>
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

              <Button
                variant="danger"
                onClick={logout}
                className="w-full py-2.5 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You are currently signed out.
            </p>
            <Link href="/login" className="block w-full">
              <Button className="w-full py-2.5 bg-garden-green text-white hover:bg-terrace-green">
                Sign In
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
