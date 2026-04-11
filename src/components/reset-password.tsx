import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { OverlayBg } from '@/components/overlay-bg';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthContext';
import { resetFormData, resetSchema } from '@/lib/schemas/auth.schema';
import { cn } from '@/lib/utils';

import { ResetPasswordSuccess } from './reset-password-success';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

type Props = {
  className?: string;
};

export function ResetPassword({ className }: Props) {
  const { loading, error, resetPassword } = useAuth();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<resetFormData | undefined>(
    undefined,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data?: resetFormData) => {
    if (formData) {
      data = formData;
    }
    await resetPassword(data?.email || '');
    setFormData(data);
    setSuccess(true);
  };
  return (
    <>
      {loading ? (
        <OverlayBg>
          <Spinner className="size-10" />
        </OverlayBg>
      ) : null}

      {success ? (
        <ResetPasswordSuccess onResend={onSubmit} />
      ) : (
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
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Enter your email and we'll send you a reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  // form="resetform"
                  disabled={loading}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
                >
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = '/';
                  }}
                  className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
