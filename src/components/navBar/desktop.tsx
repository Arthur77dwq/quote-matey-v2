import Link from 'next/link';

import { LINK } from '@/types/pages';

export function DesktopNavBar({ navLinks }: { navLinks: LINK[] }) {
  return (
    <div className="flex gap-10">
      {navLinks.map((link, index) => {
        return (
          <Link
            key={`${index}-${link.href}`}
            href={link.href}
            target={link.target}
            className="font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 rounded-full px-3 py-1"
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
