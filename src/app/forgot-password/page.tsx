"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state');
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Read URL query parameters to force visual states for reviewer testing
  const isLoading = isSubmitLoading || stateParam === 'loading';
  const hasPageError = pageError || stateParam === 'error';
  const isSuccess = stateParam === 'success';
  const forceValidation = stateParam === 'validation';

  useEffect(() => {
    if (stateParam === 'error') {
      setPageError('Failed to send reset link. Please try again.');
    } else {
      setPageError(null);
    }
  }, [stateParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPageError(null);

    // Validate email
    if (!email) {
      setError('Email address is required');
      toast('Email address is required', 'error');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      toast('Please enter a valid email address', 'error');
      return;
    }

    // Strict UI-first: trigger loading spinner for manual visual verification
    setIsSubmitLoading(true);
    setTimeout(() => {
      setIsSubmitLoading(false);
      toast('Form validated! (Strict UI-first mode: no email sent)', 'info');
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">Reset Email Sent</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm leading-relaxed">
            If an account exists for this email, we have sent a password reset link to your inbox.
          </p>
          <div className="pt-4 w-full">
            <Link href="/login" className="w-full block">
              <Button className="w-full py-2.5">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password? 🌱" description="Enter your email address and we'll help you reset your password.">
      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        {hasPageError && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
            <span>{pageError || 'Failed to send reset link. Please try again.'}</span>
          </div>
        )}

        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error || (forceValidation ? 'Please enter a valid email address' : undefined)}
          disabled={isLoading}
          required
          autoComplete="email"
        />

        <Button
          type="submit"
          className="w-full py-2.5 bg-garden-green text-natural-white hover:bg-terrace-green"
          isLoading={isLoading}
        >
          Send Reset Link
        </Button>

        <div className="text-center pt-2">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-garden-green dark:hover:text-green-400 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-soft-cream dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="animate-pulse bg-white dark:bg-dark-card w-full max-w-md h-80 rounded-2xl shadow-xl"></div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
}
