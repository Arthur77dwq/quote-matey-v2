import { Mail } from 'lucide-react';
import Link from 'next/link';

import Achievemnet from '@/components/achievement';

export default function SuccessResetPasswordPage() {
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

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#ff6b2c]/10 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-[#ff6b2c]" />
              </div>
            </div>

            <h2 className="text-3xl text-gray-900 mb-2 text-center">
              Check your email
            </h2>
            <p className="text-sm text-gray-500 text-center">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full bg-[#ff6b2c] text-white py-3.5 rounded-lg hover:bg-[#ff5515] transition-colors text-center"
            >
              Back to Login
            </Link>

            <button
              type="button"
              className="w-full border border-gray-200 text-gray-700 py-3.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Resend Email
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or{' '}
            <Link
              href="/reset-password"
              className="text-[#ff6b2c] hover:underline"
            >
              try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
