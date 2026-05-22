'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, LockKeyhole, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { GoogleIcon } from '@/constant/icons';
import { useAuth } from '@/context/AuthContext';
import { loginFormData, loginSchema } from '@/lib/schemas/auth.schema';

export default function LoginPage() {
  const { loading, error, user, signIn, withPopUp } = useAuth();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const toggleShowPassword = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  const onSubmit = async (data: loginFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <>
      {loading ? (
        <OverlayBg>
          <Spinner className="size-10" />
        </OverlayBg>
      ) : null}
      <div className="min-h-screen bg-[#0a1628] p-10 lg:p-0 flex flex-col lg:flex-row items-center lg:items-stretch">
        <Achievemnet />

        <div className="w-fit lg:w-full lg:max-w-xl bg-white lg:flex items-center justify-center px-8 py-16 rounded-xl lg:rounded-none shadow-lg shadow-white/50 lg:shadow-none">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-col items-center lg:items-start">
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
              <h2 className="font-semibold text-4xl">Login</h2>
              <p className="text-sm text-center lg:text-left text-gray-500">
                Welcome back! Login to your account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                <div className="grid gap-2">
                  <InputGroup className="min-h-13">
                    <InputGroupInput
                      {...register('password')}
                      name="password"
                      type={show ? 'text' : 'password'}
                      className="md:text-lg"
                      placeholder="Password"
                    />
                    <InputGroupAddon>
                      <LockKeyhole />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Eye
                        className="cursor-pointer"
                        onClick={toggleShowPassword}
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-red-500 text-xs">
                    {errors.password?.message}
                  </p>
                  <div className="flex-col flex items-center">
                    <p className="text-red-500 w-full text-left text-xs">
                      {error}
                    </p>
                    <Link
                      href={'/reset-password'}
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
                >
                  Login
                </Button>
                <div className="w-full relative h-5 flex justify-center items-center">
                  <div className="w-full border-dashed border-t border-neutral-300"></div>
                  <span className="absolute top-1/2 -translate-y-1/2 bg-white px-2 py-0 text-xl text-neutral-400">
                    or
                  </span>
                </div>
                <Button
                  onClick={withPopUp}
                  variant="outline"
                  disabled={loading}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 hover:text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
                >
                  <GoogleIcon className="size-6" />
                  Continue with Google
                </Button>
                <div className="whitespace-nowrap text-lg flex justify-center items-center">
                  <span>Don't have an account?</span>
                  <Link
                    href="/signup"
                    className="p-0 pl-1 text-bold text-lg hover:underline text-[#f57a0a] bg-white hover:bg-white hover:text-[#f57a0a] cursor-pointer"
                  >
                    Sign up now
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
