"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state');
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [pageError, setPageError] = useState<string | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Read URL query parameters to force visual states for reviewer testing
  const isLoading = isSubmitLoading || stateParam === 'loading';
  const hasPageError = pageError || stateParam === 'error';
  const forceValidation = stateParam === 'validation';

  useEffect(() => {
    if (stateParam === 'error') {
      setPageError('Invalid email or password');
    } else {
      setPageError(null);
    }
  }, [stateParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setPageError(null);

    let hasErrors = false;
    const newErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email) {
      newErrors.email = 'Email address is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      toast('Please correct the errors in the form', 'error');
      return;
    }

    // Strict UI-first rule: do not submit to API or create fake sessions.
    // Toggle loading spinner for manual visual verification
    setIsSubmitLoading(true);
    setTimeout(() => {
      setIsSubmitLoading(false);
      toast('Form validated! (Strict UI-first mode: no session created)', 'info');
    }, 1000);
  };

  return (
    <AuthLayout title="Welcome Back 🌱" description="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        {hasPageError && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
            <span>{pageError || 'Invalid email or password'}</span>
          </div>
        )}

        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email || (forceValidation ? 'Please enter a valid email address' : undefined)}
          disabled={isLoading}
          required
          autoComplete="email"
        />

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password || (forceValidation ? 'Password is required' : undefined)}
            disabled={isLoading}
            required
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[32px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-garden-green dark:text-green-400 hover:text-terrace-green dark:hover:text-green-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 bg-garden-green text-natural-white hover:bg-terrace-green"
          isLoading={isLoading}
        >
          Sign In
        </Button>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <span className="relative px-3 bg-white dark:bg-dark-card text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            or
          </span>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-garden-green dark:text-green-400 hover:text-terrace-green dark:hover:text-green-300 transition-colors"
          >
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-soft-cream dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="animate-pulse bg-white dark:bg-dark-card w-full max-w-md h-96 rounded-2xl shadow-xl"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
