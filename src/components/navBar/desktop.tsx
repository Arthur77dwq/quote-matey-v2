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
          >
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
