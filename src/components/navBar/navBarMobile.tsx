import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import { LINK } from '@/types/global';

export function NavBarMobile({
  open,
  navLinks,
}: {
  open?: boolean;
  navLinks: LINK[];
}) {
  return (
    <>
      <div
        className={twMerge(
          'lg:hidden mt-3.5 w-full rounded-md shadow-[0_0_0_4px_#DDE5ED] h-fit bg-white flex-col justify-between p-2.5',
          open ? 'flex' : 'hidden',
        )}
      >
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
    </>
  );
}
