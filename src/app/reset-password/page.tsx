'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Achievemnet from '@/components/achievement';
import { OverlayBg } from '@/components/overlay-bg';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthContext';
import { resetFormData, resetSchema } from '@/lib/schemas/auth.schema';

export default function ResetPasswordPage() {
  const { loading, error, resetPassword } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data?: resetFormData) => {
    await resetPassword(data?.email || '');
    router.push(
      `/reset-password/success?email=${encodeURIComponent(data?.email || '')}`,
    );
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
              <Link href={'/'}>
                <div className="flex items-center gap-2 mb-8">
                  <Image
                    src={'/images/QuoteMateyAppIcon.png'}
                    alt=""
                    width={40}
                    height={20}
                  />
                  <div className="text-3xl">
                    <span className="font-bold">Quote</span>Matey
                  </div>
                </div>
              </Link>
              <h2 className="font-semibold text-4xl">Reset password</h2>
              <p className="text-sm text-gray-500">
                Enter your email to reset your password
              </p>
            </div>

            <form id="resetform" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 py-3">
                <div className="grid gap-2">
                  <InputGroup className="min-h-13">
                    <InputGroupInput
                      {...register('email')}
                      name="email"
                      className="md:text-lg"
                      placeholder="Email"
                    />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-red-500 text-xs">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="flex-col flex items-center">
                <p className="text-red-500 w-full text-left text-xs">{error}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => router.push('/')}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
                >
                  Back
                </Button>
              </div>
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
    </>
  );
}
