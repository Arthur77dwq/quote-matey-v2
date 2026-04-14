import { Mail, XIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type Props = {
  onResend: () => void;
  className?: string;
};

export function ResetPasswordSuccess({ onResend, className }: Props) {
  return (
    <>
      <Card className={cn('w-full max-w-lg px-5 h-auto relative', className)}>
        <Link
          href="/"
          className="size-fit absolute top-3 right-3 rounded-full bg-sky-50 p-2 flex justify-center items-center"
        >
          <XIcon size={15} />
        </Link>
        <CardHeader>
          <CardTitle className="font-semibold text-2xl text-center">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#f57a0a]/8 rounded-full w-fit h-fit p-3">
                <Mail color="#f57a0a" size={30} />
              </div>
              <p>Check your email</p>
            </div>
          </CardTitle>
          <CardDescription className="text-center text-xs">
            We've sent a password reset link to your email address. Please check
            your inbox and follow the instructions to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                window.location.reload();
              }}
              className="cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
            >
              Back to Login
            </Button>
            <Button
              onClick={onResend}
              className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 text-black text-base font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
            >
              Resend Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
