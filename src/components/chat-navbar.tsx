'use client';

import { ArrowLeft, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '@/context/AuthContext';

import { Profile } from './profile';

export function ChatNavbar() {
  const [show, setShow] = useState(false);
  const { user, logOut } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Logo - navigates to home */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/quotematey-logo.png"
              alt="QuoteMatey"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <span className="text-xl font-bold tracking-tight text-[#0a1628]">
              QuoteMatey
            </span>
          </Link>
          {!!user && (
            <div className="flex flex-col h-auto bg-white">
              <Profile
                className={twMerge(
                  'w-fit',
                  show ? 'border-b-0 border rounded-b-none shadow-sm' : '',
                )}
                user={user}
                onClick={() => setShow(!show)}
              >
                <div
                  className={twMerge(
                    'px-12 py-2 shadow-sm flex flex-col justify-center items-center bg-white border-l fixed -bottom-6 gap-2 z-50',
                    !show && 'hidden',
                    show ? 'border border-t-0' : '',
                    'rounded-b-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/80',
                  )}
                >
                  <div
                    className="flex justify-center items-center gap-3"
                    onClick={logOut}
                  >
                    <LogOutIcon size={18} />
                    <span>Log out</span>
                  </div>
                </div>
              </Profile>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
