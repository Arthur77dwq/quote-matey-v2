'use client';

import { ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
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
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => router.push('/chat')}
              className="group inline-flex items-center gap-1.5 bg-[#0a1628] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1a2d45] transition-all shadow-lg shadow-[#0a1628]/10"
            >
              Start Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

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
            <div className="pt-3 mt-3 border-t border-border/50">
              <button
                onClick={() => router.push('/chat')}
                className="w-full bg-[#0a1628] text-white py-3 rounded-full font-semibold"
              >
                Start Free
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
