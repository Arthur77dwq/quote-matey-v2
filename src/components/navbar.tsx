'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import { AccountMenu } from './account-menu';

export function Navbar() {
  const { user, logOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Logo - navigates to home */}
          <Link
            href="/"
            className="w-full lg:w-fit flex justify-center items-center gap-2.5 hover:opacity-80 transition-opacity"
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {['How it Works', 'Success Stories', 'Pricing', 'FAQ'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace('success-stories', 'testimonials'),
                    )
                  }
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/80"
                >
                  {item}
                </button>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          {user ? (
            <div className="hidden lg:flex">
              <AccountMenu user={user} logOut={logOut} />
            </div>
          ) : (
            <div className="hidden lg:flex justify-center items-center gap-2.5">
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-foreground px-6 py-2 rounded-full text-md font-medium border-2 border-border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-[#f57a0a] text-white px-6 py-2 rounded-full text-md font-medium hover:bg-[#e06d00] transition-all shadow-xl shadow-[#f57a0a]/25 hover:shadow-2xl hover:shadow-[#f57a0a]/30"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* user Profile */}
          {user && (
            <div className="lg:hidden">
              <AccountMenu user={user} logOut={logOut} />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border/50 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {['How it Works', 'Success Stories', 'Pricing', 'FAQ'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(
                      item
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace('success-stories', 'testimonials'),
                    )
                  }
                  className="block w-full text-left px-4 py-3 text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  {item}
                </button>
              ),
            )}

            <div className="w-full flex lg:hidden justify-center items-center gap-2.5">
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-white text-foreground px-6 py-2 rounded-full text-md font-medium border-2 border-border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="w-full bg-[#f57a0a] text-white px-6 py-2 rounded-full text-md font-medium hover:bg-[#e06d00] transition-all shadow-xl shadow-[#f57a0a]/25 hover:shadow-2xl hover:shadow-[#f57a0a]/30"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
