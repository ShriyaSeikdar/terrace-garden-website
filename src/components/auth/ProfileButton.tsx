"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function ProfileButton() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Keep ProfileButton hidden on specific authentication form pages,
  // but keep it visible on /profile and all public routes (homepage, catalog, etc.)
  const hiddenRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
  ];

  const isHidden = hiddenRoutes.some((route) => pathname?.startsWith(route));

  if (isHidden) {
    return null;
  }

  const displayName = user?.name?.trim() || 'Your Account';

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex items-center pointer-events-none">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-11 w-44 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-full shadow-md border border-gray-200/60 dark:border-gray-700/60 animate-pulse pointer-events-auto"
          />
        ) : isAuthenticated && user ? (
          <motion.div
            key="authenticated"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <Link
              href="/profile"
              className="group flex items-center gap-3 px-4 py-2 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
              aria-label="Your Profile"
            >
              <div className="w-8 h-8 rounded-full bg-garden-green/10 dark:bg-green-900/30 text-garden-green dark:text-green-400 flex items-center justify-center font-serif font-bold text-sm shrink-0">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left pr-1">
                <span className="font-serif text-sm font-bold text-gray-900 dark:text-gray-100 tracking-wide line-clamp-1 leading-tight">
                  {displayName}
                </span>
                <span className="text-[11px] font-sans font-medium text-garden-green dark:text-green-400 tracking-wider uppercase leading-tight">
                  Your Profile
                </span>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="unauthenticated"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <Link
              href="/login"
              className="group flex items-center gap-2 px-4 py-2.5 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
              aria-label="Sign in to your TerraceGarden account"
            >
              <span className="font-serif text-xs sm:text-sm font-bold tracking-wider text-maroon dark:text-rose-400 group-hover:text-[#5c151e] dark:group-hover:text-rose-300 transition-colors uppercase inline-flex items-center gap-1.5">
                Sign in to your TerraceGarden account &rarr;
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
