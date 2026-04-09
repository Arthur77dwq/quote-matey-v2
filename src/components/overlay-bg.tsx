import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export function OverlayBg({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={twMerge(
        'bg-neutral-700/50 p-0 md:px-20 md:py-20 w-screen overflow-hidden h-screen fixed inset-0 z-100 flex justify-center items-center',
        className,
      )}
    >
      {children}
    </section>
  );
}
