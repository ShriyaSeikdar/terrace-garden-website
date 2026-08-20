"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import AuthLayout from '@/components/auth/AuthLayout';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token was provided in the link.');
      return;
    }

    // Call POST verify
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'Failed to verify email address.');
        }
      })
      .catch(() => {
        setStatus('error');
        setErrorMessage('A network error occurred. Please try again.');
      });
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setResendStatus('loading');
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setResendStatus('success');
        setResendMessage(data.message || 'Verification email resent.');
      } else {
        setResendStatus('error');
        setResendMessage(data.error || 'Failed to resend verification email.');
      }
    } catch (err) {
      setResendStatus('error');
      setResendMessage('A network error occurred. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <AuthLayout title="Verifying your email... 🌱" description="Please wait while we secure your account.">
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <Loader2 className="w-12 h-12 text-garden-green dark:text-green-400 animate-spin" />
        </div>
      </AuthLayout>
    );
  }

  if (status === 'success') {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center py-4 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">Email Verified!</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-sm leading-relaxed">
            Thank you for verifying your email. Your TerraceGarden account is now verified and active.
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
    <AuthLayout>
      <div className="flex flex-col items-center justify-center py-4 space-y-5">
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400">
          <XCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white text-center">Verification Failed</h2>
        
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2.5 rounded-lg text-center w-full">
          {errorMessage}
        </p>

        <div className="w-full border-t border-gray-100 dark:border-gray-800 pt-6 mt-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Request another verification link</h3>
          <form onSubmit={handleResend} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={resendStatus === 'loading'}
            />
            
            {resendStatus === 'success' && (
              <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded">
                {resendMessage}
              </p>
            )}

            {resendStatus === 'error' && (
              <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded">
                {resendMessage}
              </p>
            )}

            <Button
              type="submit"
              variant="outline"
              className="w-full py-2 flex items-center justify-center gap-2 border-garden-green text-garden-green hover:bg-garden-green hover:text-white"
              isLoading={resendStatus === 'loading'}
            >
              <Mail className="w-4 h-4" />
              Resend Link
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-soft-cream dark:bg-dark-bg flex items-center justify-center p-4">
        <div className="animate-pulse bg-white dark:bg-dark-card w-full max-w-md h-96 rounded-2xl shadow-xl flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="w-12 h-12 text-garden-green animate-spin" />
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
