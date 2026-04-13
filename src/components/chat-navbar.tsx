'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';

import { AccountMenu } from './account-menu';

export function ChatNavbar() {
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
          {!!user && <AccountMenu user={user} logOut={logOut} />}
        </div>
      </div>
    </header>
  );
}
