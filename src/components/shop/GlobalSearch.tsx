"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/products?q=${encodeURIComponent(debouncedQuery)}&limit=5`);
          const data = await res.json();
          setResults(data.products || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-inherit font-medium">{part}</mark> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg z-50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products, categories, tags..."
          className="pl-10 pr-10 border-gray-300 shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0 || loading) setIsOpen(true); }}
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && debouncedQuery.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden">
          {loading && (
            <div className="p-4 flex items-center justify-center text-gray-500 gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Searching...
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              No products found for "{query}"
            </div>
          )}
          {!loading && results.length > 0 && (
            <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {results.map((product) => (
                <li key={product.id}>
                  <Link href={`/shop/product/${product.slug}`} onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
                      {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400">No Img</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {highlightText(product.name, debouncedQuery)}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {product.category?.name || 'Category'} &bull; ${product.price}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="p-3 text-center bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-800">
                <Link href={`/shop?q=${encodeURIComponent(query)}`} onClick={() => setIsOpen(false)} className="text-sm text-garden-green font-medium hover:underline">
                  View all results for "{query}"
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
