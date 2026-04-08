'use client';
import { Eye, LockKeyhole, Mail, User, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { GoogleIcon } from '@/constant/icons';

export function SignUp({ toggle }: { toggle: () => void }) {
  // const handleSubmit = () => {};
  return (
    <Card className="w-full max-w-lg px-5 h-auto relative">
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
          Sign Up
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Get started in seconds. Create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <InputGroup className="min-h-13">
                <InputGroupInput
                  className="md:text-lg"
                  placeholder="Full Name"
                />
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="grid gap-2">
              <InputGroup className="min-h-13">
                <InputGroupInput className="md:text-lg" placeholder="Email" />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="grid gap-2">
              <InputGroup className="min-h-13">
                <InputGroupInput
                  className="md:text-lg"
                  placeholder="Password"
                />
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Eye />
                </InputGroupAddon>
              </InputGroup>
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
        >
          Sign Up
        </Button>
        <div className="w-full relative h-5 flex justify-center items-center">
          <div className="w-full border-dashed border-t border-neutral-300"></div>
          <span className="absolute top-1/2 -translate-y-1/2 bg-white px-2 text-xl text-neutral-400">
            or
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 hover:text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
        >
          <GoogleIcon className="size-6" />
          Continue with Google
        </Button>
        <div className="text-lg">
          <span>Already have an account?</span>
          <Button
            variant="ghost"
            className="p-0 pl-1 text-bold text-lg hover:underline text-[#f57a0a] bg-white hover:bg-white hover:text-[#f57a0a] cursor-pointer"
            onClick={() => toggle()}
          >
            Log in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
