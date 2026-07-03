"use client";

import { useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageCircle, SlidersHorizontal, Loader2, X, Search } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { ProductFilters } from '@/components/shop/ProductFilters';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adeniumsData } from '@/data/adeniums';

function CollectionContent() {
  const { t } = useSettings();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [filters, setFilters] = useState({
    page: 1,
    q: initialQuery,
    category: '',
    color: '',
    availability: '',
    sunlight: '',
    difficulty: '',
    flowerType: '',
    minPrice: '',
    maxPrice: '',
    featured: ''
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(initialQuery);

  // Sync search input with filters state immediately for responsive local filtering
  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    setFilters(prev => ({ ...prev, q: val, page: 1 }));
  };

  // Client-side filtering logic for the static 31 adeniums
  const filteredAdeniums = useMemo(() => {
    let result = [...adeniumsData];

    // 1. Search Query (Name or Description)
    if (filters.q) {
      const qLower = filters.q.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(qLower) || 
        a.description.toLowerCase().includes(qLower)
      );
    }

    // 2. Mocking other filters loosely if applicable
    if (filters.color) {
      const colorLower = filters.color.toLowerCase();
      result = result.filter(a => 
        a.description.toLowerCase().includes(colorLower) || 
        a.name.toLowerCase().includes(colorLower)
      );
    }

    return result;
  }, [filters]);

  // Pagination logic
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredAdeniums.length / itemsPerPage);
  const currentProducts = filteredAdeniums.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-soft-cream dark:bg-dark-bg selection:bg-garden-green selection:text-white">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-garden-green/5 dark:bg-dark-card/50">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-garden-green dark:text-green-400 hover:text-[#154a19] dark:hover:text-green-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("adeniums_back")}
          </Link>
          <span className="text-floral-pink font-medium tracking-widest uppercase text-sm mb-4 block">
            {t("adeniums_badge")}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("adeniums_title")} <span className="text-garden-green dark:text-green-400">{t("adeniums_title_highlight")}</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            {t("adeniums_desc")}
          </p>
        </div>
      </section>

      {/* Main Shopping Interface */}
      <section className="py-12 px-6 md:px-12 relative">
        <div className="container mx-auto">
          
          {/* Top Bar: Search & Mobile Filter Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="w-full md:max-w-md relative z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search adeniums by name or detail..."
                  className="pl-10 w-full bg-white dark:bg-dark-card border-gray-200"
                  value={searchInput}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>
            
            {/* Mobile Filter Button */}
            <div className="w-full md:w-auto flex justify-end lg:hidden">
              <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)} className="gap-2 w-full border-gray-200">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-24 bg-white dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-green-900/30 shadow-sm z-10">
              <ProductFilters filters={filters} setFilters={setFilters} categories={[]} />
            </aside>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isMobileFiltersOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-dark-card shadow-2xl z-50 p-6 overflow-y-auto lg:hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold font-serif text-gray-900 dark:text-white">Filters</h2>
                      <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <ProductFilters filters={filters} setFilters={setFilters} categories={[]} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              {currentProducts.length === 0 ? (
                <div className="bg-white dark:bg-dark-card p-12 rounded-3xl border border-gray-100 dark:border-green-900/30 text-center shadow-sm">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No adeniums found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
                  <Button onClick={() => {
                    setFilters(prev => ({ ...prev, category: '', color: '', availability: '', sunlight: '', difficulty: '', flowerType: '', minPrice: '', maxPrice: '', featured: '' }));
                    setSearchInput('');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {currentProducts.map((adenium, index) => (
                      <motion.div
                        key={adenium.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-green-900/30 flex flex-col"
                      >
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-dark-surface">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${adenium.image})` }}
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                          
                          {/* Floating Tags */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <span className="inline-flex px-3 py-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-garden-green dark:text-green-400 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                              {adenium.number}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow bg-white dark:bg-dark-card">
                          <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-garden-green dark:group-hover:text-green-400 transition-colors">
                            {adenium.name}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6 flex-grow">
                            {adenium.description}
                          </p>
                          
                          <div className="pt-4 border-t border-gray-100 dark:border-green-900/30 mt-auto">
                            <div className="flex items-center justify-between text-sm mb-4">
                              <span className="text-gray-500 font-medium uppercase tracking-wider text-xs">{t("adeniums_bloom_season")}</span>
                              <span className="text-garden-green dark:text-green-400 font-semibold">{adenium.bloomSeason}</span>
                            </div>
                            <a
                              href={`https://wa.me/8983379058?text=${encodeURIComponent(`Hello! I would like to inquire about the ${adenium.name} adenium (No. ${adenium.number}).`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2 bg-garden-green text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-[#154a19] transition-all hover:shadow-md transform hover:-translate-y-0.5"
                            >
                              <MessageCircle className="w-4 h-4" />
                              {t("adeniums_enquire")}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                      <Button 
                        variant="outline" 
                        disabled={filters.page === 1}
                        onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center px-4 font-medium text-gray-700 dark:text-gray-300">
                        Page {filters.page} of {totalPages}
                      </div>
                      <Button 
                        variant="outline" 
                        disabled={filters.page === totalPages}
                        onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

export default function AdeniumsGallery() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center bg-soft-cream dark:bg-dark-bg">
        <Loader2 className="w-8 h-8 animate-spin text-garden-green" />
      </div>
    }>
      <CollectionContent />
    </Suspense>
  );
}
