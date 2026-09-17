'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { LINK } from '@/types/global';

export function NavBar({ navLinks }: { navLinks: LINK[] }) {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex items-center justify-around gap-1 w-auto h-full bg-white">
      {navLinks.map((link, index) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={`${index}-${link.href}`}
            href={link.href}
            target={link.target}
            className={cn(
              'w-fit font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-full px-3 py-1',
              isActive ? 'bg-neutral-50 text-neutral-900' : '',
            )}
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
