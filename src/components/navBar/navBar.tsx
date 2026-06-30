import Link from 'next/link';

import { LINK } from '@/types/pages';

export function NavBar({ navLinks }: { navLinks: LINK[] }) {
  return (
    <div className="hidden lg:flex items-center justify-around gap-10 w-auto h-full bg-white">
      {navLinks.map((link, index) => {
        return (
          <Link
            key={`${index}-${link.href}`}
            href={link.href}
            target={link.target}
            className="w-fit font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-full px-3 py-1"
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
