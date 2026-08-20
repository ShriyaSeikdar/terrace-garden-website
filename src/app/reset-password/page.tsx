"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/context/ToastContext';
import { Eye, EyeOff, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const stateParam = searchParams.get('state');
  const { toast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [pageError, setPageError] = useState<string | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Read URL query parameters to force visual states for reviewer testing
  const isInvalidToken = !token || stateParam === 'invalid';
  const isSuccess = stateParam === 'success';
  const isLoading = isSubmitLoading || stateParam === 'loading';
  const hasPageError = pageError || stateParam === 'error';
  const forceValidation = stateParam === 'validation';

  useEffect(() => {
    if (stateParam === 'error') {
      setPageError('Failed to reset password. Please request a new link.');
    } else {
      setPageError(null);
    }
  }, [stateParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setPageError(null);

    let hasErrors = false;
    const newErrors: typeof errors = {};

    // Validate password
    if (!password) {
      newErrors.password = 'New password is required';
      hasErrors = true;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasErrors = true;
    } else if (password.length > 72) {
      newErrors.password = 'Password cannot exceed 72 characters';
      hasErrors = true;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
      hasErrors = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      toast('Please correct the validation errors', 'error');
      return;
    }

    // Strict UI-first: trigger loading spinner for manual visual verification
    setIsSubmitLoading(true);
    setTimeout(() => {
      setIsSubmitLoading(false);
      toast('Form validated! (Strict UI-first mode: no reset password call)', 'info');
    }, 1000);
  };

  if (isInvalidToken) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-5">
          <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <XCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">Reset Link Invalid</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm leading-relaxed">
            This password reset link is invalid, has expired, or has already been used. Please request a new link.
          </p>
          <div className="pt-4 w-full">
            <Link href="/forgot-password" className="w-full block">
              <Button className="w-full py-2.5">
                Request New Link
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">Password Reset Successfully</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm leading-relaxed">
            Your password has been successfully updated. You can now use your new password to sign in to your account.
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
    <AuthLayout title="Reset Password 🌱" description="Choose a strong new password for your account">
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {hasPageError && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-lg text-sm bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400" />
            <span>{pageError || 'Failed to reset password. Please request a new link.'}</span>
          </div>
        )}

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password || (forceValidation ? 'Password must be at least 8 characters' : undefined)}
            disabled={isLoading}
            required
            autoComplete="new-password"
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

        {/* Subtle Password Policy Indicator */}
        <div className="text-[11px] text-gray-500 dark:text-gray-400 px-1 space-y-1">
          <p className="flex items-center gap-1.5">
            <span className={password.length >= 8 && password.length <= 72 ? "text-green-600 dark:text-green-400 font-bold" : "text-gray-400 font-bold"}>
              ✓
            </span>
            <span>Password must be between 8 and 72 characters</span>
          </p>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword || (forceValidation ? 'Passwords do not match' : undefined)}
            disabled={isLoading}
            required
            autoComplete="new-password"
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-[32px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 mt-4 bg-garden-green text-natural-white hover:bg-terrace-green"
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-soft-cream dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="animate-pulse bg-white dark:bg-dark-card w-full max-w-md h-96 rounded-2xl shadow-xl"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
