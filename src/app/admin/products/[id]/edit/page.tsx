"use client";

import { useEffect, useState, use } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';
import { useToast } from '@/context/ToastContext';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`/api/products/${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast(data.error, 'error');
        } else {
          setProduct(data);
        }
        setLoading(false);
      })
      .catch(() => {
        toast('Failed to fetch product', 'error');
        setLoading(false);
      });
  }, [resolvedParams.id]);

  if (loading) return <div className="p-8 text-center animate-pulse text-gray-500">Loading product data...</div>;
  if (!product) return <div className="p-8 text-center text-red-500 font-medium">Product not found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
