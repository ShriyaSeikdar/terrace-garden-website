"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/context/ToastContext';
import { Upload, X, Loader2 } from 'lucide-react';
import { SUNLIGHT_OPTIONS, DIFFICULTY_OPTIONS, STATUS_OPTIONS, FLOWER_TYPE_OPTIONS, FLOWER_COLOR_OPTIONS } from '@/lib/constants';

interface ProductFormProps {
  initialData?: any;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    scientificName: initialData?.scientificName || '',
    slug: initialData?.slug || '',
    categoryId: initialData?.categoryId || '',
    price: initialData?.price || '',
    discountPrice: initialData?.discountPrice || '',
    stock: initialData?.stock || 0,
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    flowerColor: initialData?.flowerColor || '',
    flowerType: initialData?.flowerType || '',
    sunlightRequirement: initialData?.sunlightRequirement || '',
    wateringFrequency: initialData?.wateringFrequency || '',
    difficulty: initialData?.difficulty || '',
    bloomSeason: initialData?.bloomSeason || '',
    fertilizerRecommendation: initialData?.fertilizerRecommendation || '',
    plantHeight: initialData?.plantHeight || '',
    potSize: initialData?.potSize || '',
    status: initialData?.status || 'DRAFT',
    isFeatured: initialData?.isFeatured || false,
    images: initialData?.images || [],
    tags: initialData?.tags?.join(', ') || ''
  });

  const [uploading, setUploading] = useState(false);

  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/categories')
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategoriesError('Invalid data received format.');
        }
      })
      .catch(err => {
        console.error("Failed to load categories:", err);
        setCategoriesError(err.message || 'Failed to load categories.');
      })
      .finally(() => {
        setCategoriesLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateSlug = () => {
    if (formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const form = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      form.append('file', e.target.files[i]);
    }
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...data.urls] }));
        toast('Images uploaded successfully', 'success');
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      toast('Failed to upload images', 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []
    };

    try {
      const url = initialData ? `/api/products/${initialData.id}` : '/api/products';
      const method = initialData ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        toast(`Product ${initialData ? 'updated' : 'created'} successfully`, 'success');
        router.push('/admin/products');
      } else {
        const error = await res.json();
        toast(error.error || 'Failed to save product', 'error');
      }
    } catch (err) {
      toast('An unexpected error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4 md:col-span-2 border-b pb-6 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <div className="flex gap-2 items-end">
              <Input label="Slug" name="slug" value={formData.slug} onChange={handleInputChange} required className="flex-1" />
              <Button type="button" variant="outline" onClick={generateSlug}>Generate</Button>
            </div>
            <Input label="Scientific Name" name="scientificName" value={formData.scientificName} onChange={handleInputChange} />
            <Select 
              label="Category" 
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleInputChange} 
              required 
              disabled={categoriesLoading || !!categoriesError || categories.length === 0}
              options={
                categoriesLoading ? [{ label: 'Loading categories...', value: '' }] :
                categoriesError ? [{ label: 'Error loading categories', value: '' }] :
                categories.length === 0 ? [{ label: 'No categories available', value: '' }] :
                [
                  { label: 'Select a category...', value: '' },
                  ...categories.map(c => ({ label: c.name, value: c.id }))
                ]
              } 
            />
          </div>
          <Textarea label="Short Description" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} />
          <Textarea label="Full Description" name="description" value={formData.description} onChange={handleInputChange} rows={5} />
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-4 border-b pb-6 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" step="0.01" label="Price ($)" name="price" value={formData.price} onChange={handleInputChange} required />
            <Input type="number" step="0.01" label="Discount Price ($)" name="discountPrice" value={formData.discountPrice} onChange={handleInputChange} />
            <Input type="number" label="Stock Quantity" name="stock" value={formData.stock} onChange={handleInputChange} required />
            <Select 
              label="Status" 
              name="status" 
              value={formData.status} 
              onChange={handleInputChange}
              options={STATUS_OPTIONS} 
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="rounded text-garden-green focus:ring-garden-green h-4 w-4" />
            <span className="text-sm font-medium">Mark as Featured Product</span>
          </label>
        </div>

        {/* Attributes */}
        <div className="space-y-4 border-b pb-6 md:border-b-0 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Attributes</h2>
          <div className="grid grid-cols-2 gap-4">
            <Select 
              label="Flower Color" 
              name="flowerColor" 
              value={formData.flowerColor} 
              onChange={handleInputChange} 
              options={FLOWER_COLOR_OPTIONS} 
            />
            <Select 
              label="Flower Type" 
              name="flowerType" 
              value={formData.flowerType} 
              onChange={handleInputChange} 
              options={FLOWER_TYPE_OPTIONS} 
            />
            <Select 
              label="Sunlight Requirement" 
              name="sunlightRequirement" 
              value={formData.sunlightRequirement} 
              onChange={handleInputChange}
              options={SUNLIGHT_OPTIONS}
            />
            <Select 
              label="Difficulty" 
              name="difficulty" 
              value={formData.difficulty} 
              onChange={handleInputChange}
              options={DIFFICULTY_OPTIONS}
            />
            <Input label="Watering Frequency" name="wateringFrequency" value={formData.wateringFrequency} onChange={handleInputChange} />
            <Input label="Bloom Season" name="bloomSeason" value={formData.bloomSeason} onChange={handleInputChange} />
            <Input label="Pot Size" name="potSize" value={formData.potSize} onChange={handleInputChange} />
            <Input label="Plant Height" name="plantHeight" value={formData.plantHeight} onChange={handleInputChange} />
          </div>
          <Input label="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleInputChange} />
        </div>

        {/* Images */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold">Images</h2>
          <div className="flex gap-4 flex-wrap">
            {formData.images.map((img: string, i: number) => (
              <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border dark:border-gray-800">
                <img src={img} alt="Product" className="object-cover w-full h-full" />
                <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin text-gray-400" /> : <Upload className="h-5 w-5 text-gray-400" />}
              <span className="text-xs text-gray-500 mt-1">Upload</span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-800">
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/products')}>Cancel</Button>
        <Button type="submit" isLoading={loading}>{initialData ? 'Update Product' : 'Create Product'}</Button>
      </div>
    </form>
  );
}
