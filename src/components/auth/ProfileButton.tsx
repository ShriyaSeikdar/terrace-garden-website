"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User as UserIcon, Heart, Package, LogOut, ChevronUp, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function ProfileButton() {
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset menu open state if pathname changes (React-recommended pattern without setState in useEffect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Keep ProfileButton hidden on specific authentication form pages,
  // but keep it visible on /profile, /wishlist, /orders, /admin, and all public routes
  const hiddenRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
  ];

  const isHidden = hiddenRoutes.some((route) => pathname?.startsWith(route));

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = useCallback(async () => {
    setIsOpen(false);
    await logout();
  }, [logout]);

  if (isHidden) {
    return null;
  }

  const displayName = user?.name?.trim() || 'Your Account';
  const displayEmail = user?.email?.trim() || '';

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 left-6 z-[90] flex flex-col items-start pointer-events-none"
    >
      <AnimatePresence>
        {isOpen && isAuthenticated && user && (
          <motion.div
            key="account-menu"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto mb-3 w-64 sm:w-72 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/90 dark:border-gray-700/90 overflow-hidden"
            role="menu"
            aria-label="User Account Menu"
          >
            {/* Header: User Information */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-soft-cream/50 dark:bg-dark-surface/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-garden-green/10 dark:bg-green-900/30 text-garden-green dark:text-green-400 flex items-center justify-center font-serif font-bold text-base shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-serif text-sm font-bold text-gray-900 dark:text-white truncate">
                    {displayName}
                  </span>
                  {displayEmail && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {displayEmail}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1.5 flex flex-col">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-soft-cream dark:hover:bg-dark-surface hover:text-garden-green dark:hover:text-green-400 transition-colors font-medium group"
              >
                <UserIcon className="w-4 h-4 text-garden-green dark:text-green-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Your Profile</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-soft-cream dark:hover:bg-dark-surface hover:text-garden-green dark:hover:text-green-400 transition-colors font-medium group"
              >
                <Heart className="w-4 h-4 text-floral-pink dark:text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Wishlist</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-soft-cream dark:hover:bg-dark-surface hover:text-garden-green dark:hover:text-green-400 transition-colors font-medium group"
              >
                <Package className="w-4 h-4 text-terrace-gold dark:text-award-gold group-hover:scale-110 transition-transform shrink-0" />
                <span>My Orders</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-garden-green dark:text-award-gold hover:bg-soft-cream dark:hover:bg-dark-surface transition-colors font-medium group border-t border-gray-100 dark:border-gray-800/60 mt-0.5 pt-2.5"
                >
                  <Shield className="w-4 h-4 text-terrace-gold dark:text-award-gold group-hover:scale-110 transition-transform shrink-0" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </div>

            {/* Sign Out Action */}
            <div className="border-t border-gray-100 dark:border-gray-800 p-1 bg-soft-cream/30 dark:bg-dark-surface/30">
              <button
                type="button"
                onClick={handleLogout}
                role="menuitem"
                className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors font-medium text-left group"
              >
                <LogOut className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isOpen}
              aria-label="User Account Menu"
              className="group flex items-center gap-3 px-4 py-2 bg-white/95 dark:bg-dark-card/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer text-left"
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
              <ChevronUp
                className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-garden-green dark:text-green-400' : ''
                }`}
              />
            </button>
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
