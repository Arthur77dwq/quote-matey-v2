'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Achievemnet from '@/components/achievement';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/reset-password/success');
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex">
      <Achievemnet />

      <div className="w-full max-w-xl bg-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-[#0a1628] rounded"></div>
              <span className="text-sm">QuoteMalay</span>
            </div>
            <h2 className="text-3xl text-gray-900 mb-2">Reset password</h2>
            <p className="text-sm text-gray-500">
              Enter your email to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b2c] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff6b2c] text-white py-3.5 rounded-lg hover:bg-[#ff5515] transition-colors mt-6"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="text-[#ff6b2c] hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
