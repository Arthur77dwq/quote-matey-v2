'use client';
import { MouseEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from './ui/button';

export function HamBurgerMenu({
  open,
  onClick,
}: {
  open?: boolean;
  onClick?: (x: MouseEvent) => void;
}) {
  const [active, setActive] = useState(open || false);
  const clickHandle = (x: MouseEvent) => {
    if (onClick) onClick(x);
    setActive((prev) => !prev);
  };
  return (
    <div className="lg:hidden h-full aspect-square rounded-full border-none bg-neutral-900">
      <Button
        onClick={clickHandle}
        className="p-1.5 w-full h-full flex flex-col justify-center items-between gap-2"
      >
        <span
          className={twMerge(
            'absolute h-0.5 w-6 rounded-full bg-white transition-all duration-300',
            active ? 'rotate-45' : 'translate-y-1.5',
          )}
        />

        <span
          className={twMerge(
            'absolute h-0.5 w-6 rounded-full bg-white transition-all duration-300',
            active ? '-rotate-45' : '-translate-y-1.5',
          )}
        />
      </Button>
    </div>
  );
}
