import { twMerge } from 'tailwind-merge';

import { Button } from './ui/button';

export function HamBurgerMenu({
  onClick,
  open = false,
}: {
  open?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="lg:hidden h-full aspect-square rounded-full border-none bg-neutral-900">
      <Button
        onClick={onClick}
        className="p-1.5 w-full h-full flex flex-col justify-center items-between gap-2"
      >
        <span
          className={twMerge(
            'absolute h-0.5 w-6 rounded-full bg-white transition-all duration-300',
            open ? 'rotate-45' : 'translate-y-1.5',
          )}
        />

        <span
          className={twMerge(
            'absolute h-0.5 w-6 rounded-full bg-white transition-all duration-300',
            open ? '-rotate-45' : '-translate-y-1.5',
          )}
        />
      </Button>
    </div>
  );
}
