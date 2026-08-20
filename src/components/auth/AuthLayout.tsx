"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-soft-cream dark:bg-dark-bg flex items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-garden-green selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="w-full p-8 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl relative overflow-hidden">
          {/* Subtle Botanical Watermark */}
          <div className="absolute -top-10 -right-10 text-garden-green/5 dark:text-green-400/5 pointer-events-none">
            <Sprout className="w-40 h-40 transform rotate-45" />
          </div>

          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="group flex flex-col items-center gap-1">
              <div className="font-serif text-3xl font-bold tracking-wide text-garden-green dark:text-green-400">
                Terrace<span className="text-award-gold">Garden</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-terrace-gold dark:text-award-gold font-serif tracking-widest uppercase">
                <Sprout className="w-3.5 h-3.5 text-garden-green dark:text-green-400" />
                Premium Horticulture
              </div>
            </Link>

            {title && (
              <h2 className="text-2xl font-serif font-bold text-center text-gray-800 dark:text-white mt-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 max-w-xs mx-auto">
                {description}
              </p>
            )}
          </div>

          {children}
        </Card>
      </motion.div>
    </main>
  );
}
