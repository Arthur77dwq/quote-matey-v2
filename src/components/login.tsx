'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, LockKeyhole, Mail, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OverlayBg } from '@/components/overlay-bg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { GoogleIcon } from '@/constant/icons';
import { useAuth } from '@/context/AuthContext';
import { loginFormData, loginSchema } from '@/lib/schemas/auth.schema';
import { cn } from '@/lib/utils';

type Props = {
  resetPassword: () => void;
  toggle: () => void;
  className?: string;
};

export function Login({ resetPassword, toggle, className }: Props) {
  const { loading, error, user, signIn, withPopUp } = useAuth();
  const params = useSearchParams();
  const [show, setShow] = useState(false);
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
      const target = new URL(params.get('target') || '');
      window.location.href = String(target);
    }
  }, [user]);

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
      <Card className={cn('w-full max-w-lg px-5 h-auto relative', className)}>
        <Link
          href="/"
          className="size-fit absolute top-3 right-3 rounded-full bg-sky-50 p-2 flex justify-center items-center"
        >
          <XIcon size={15} />
        </Link>
        <CardHeader>
          <div className="flex justify-center align-center">
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
          <CardTitle className="font-semibold text-4xl text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Welcome back! Login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
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
                    href={''}
                    onClick={resetPassword}
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
                // form="loginForm"
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
              <div className="text-lg flex justify-center items-center">
                <span>Don't have an account?</span>
                <Button
                  variant="ghost"
                  className="p-0 pl-1 text-bold text-lg hover:underline text-[#f57a0a] bg-white hover:bg-white hover:text-[#f57a0a] cursor-pointer"
                  onClick={() => toggle()}
                >
                  Sign up now
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
