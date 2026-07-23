"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';

interface ProductFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  categories: any[];
}

export function ProductFilters({ filters, setFilters, categories }: ProductFiltersProps) {
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleCheckboxChange = (key: string, value: string) => {
    setFilters((prev: any) => {
      const current = prev[key] === value ? '' : value;
      return { ...prev, [key]: current, page: 1 };
    });
  };

  const clearAll = () => {
    setFilters({
      q: filters.q,
      page: 1,
      category: '',
      color: '',
      availability: '',
      sunlight: '',
      flowerType: '',
      minPrice: '',
      maxPrice: '',
      featured: ''
    });
  };

  const hasActiveFilters = Object.entries(filters).some(([k, v]) => k !== 'page' && k !== 'q' && v !== '');

  const filterSections = [
    {
      id: 'color',
      title: 'Flower Color',
      options: ['Pink', 'Red', 'Purple', 'White', 'Yellow', 'Orange', 'Multi-color']
    },
    {
      id: 'availability',
      title: 'Availability',
      options: ['In Stock', 'Out of Stock']
    },
    {
      id: 'sunlight',
      title: 'Sunlight',
      options: [
        { label: 'Full Sun', value: 'FULL_SUN' },
        { label: 'Partial Sun', value: 'PARTIAL_SUN' },
        { label: 'Shade', value: 'SHADE' }
      ]
    },

    {
      id: 'flowerType',
      title: 'Flower Type',
      options: ['Single', 'Double', 'Triple']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg font-serif">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-sm text-red-500 hover:underline">
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-sm text-gray-900 dark:text-white">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full h-9 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-garden-green dark:text-white"
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full h-9 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 text-sm focus:outline-none focus:ring-1 focus:ring-garden-green dark:text-white"
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">Category</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded text-garden-green focus:ring-garden-green cursor-pointer h-4 w-4"
                  checked={filters.category === c.id}
                  onChange={() => handleCheckboxChange('category', c.id)}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">{c.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {filterSections.map((section) => (
        <div key={section.id} className="space-y-3">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">{section.title}</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {section.options.map((opt: any) => {
              const label = typeof opt === 'string' ? opt : opt.label;
              const value = typeof opt === 'string' ? opt : opt.value;
              return (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded text-garden-green focus:ring-garden-green cursor-pointer h-4 w-4"
                    checked={filters[section.id] === value}
                    onChange={() => handleCheckboxChange(section.id, value)}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">{label}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="rounded text-award-gold focus:ring-award-gold cursor-pointer h-5 w-5"
            checked={filters.featured === 'true'}
            onChange={() => handleCheckboxChange('featured', 'true')}
          />
          <span className="font-medium text-gray-900 dark:text-white">Featured Products Only</span>
        </label>
      </div>
    </div>
  );
}
