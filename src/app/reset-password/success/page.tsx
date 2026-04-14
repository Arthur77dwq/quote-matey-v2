'use client';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Achievemnet from '@/components/achievement';
import { OverlayBg } from '@/components/overlay-bg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthContext';

export default function SuccessResetPasswordPage() {
  const { loading, resetPassword } = useAuth();
  const params = useSearchParams();

  const resend = async () => {
    const email = params.get('email');
    if (email) {
      await resetPassword(email);
    }
  };
  return (
    <>
      {loading ? (
        <OverlayBg>
          <Spinner className="size-10" />
        </OverlayBg>
      ) : null}

      <div className="min-h-screen bg-[#0a1628] flex">
        <Achievemnet />
        <div className="w-full max-w-xl bg-white flex items-center justify-center px-8 py-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-[#f57a0a]/8 rounded-full w-fit h-fit p-3">
                  <Mail color="#f57a0a" size={30} />
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
                className="rounded-md cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
              >
                Back to Login
              </Link>

              <Button
                type="button"
                onClick={resend}
                className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
              >
                Resend Email
              </Button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or{' '}
              <Link
                href="/reset-password"
                className="text-[#f57a0a] hover:underline"
              >
                try again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
