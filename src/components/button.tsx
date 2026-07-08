import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import { Button as Comp } from '@/components/ui/button';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';

const useRollMove = ({
  leftArrowRef,
  rightArrowRef,
  textRef,
}: {
  leftArrowRef: React.RefObject<HTMLButtonElement | null>;
  rightArrowRef: React.RefObject<HTMLButtonElement | null>;
  textRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const rollMove = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.set(leftArrowRef.current, {
      rotate: -45,
    });
    rollMove.current = gsap.timeline({ paused: true });
    rollMove.current.to(leftArrowRef.current, {
      x: -13,
      rotate: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    rollMove.current.to(
      rightArrowRef.current,
      {
        xPercent: 150,
        rotate: 45,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<',
    );
    rollMove.current.to(
      textRef.current,
      {
        xPercent: 27,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<',
    );
  });
  return rollMove;
};

function PrimaryButton({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>) {
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);
  const rollMove = useRollMove({ leftArrowRef, rightArrowRef, textRef });
  return (
    <Comp
      {...props}
      className={cn(
        'p-2.5 pl-6 relative overflow-clip cursor-pointer flex items-center justify-between gap-1.25 w-fit h-full rounded-full text-white',
        className,
      )}
      onMouseEnter={() => rollMove.current?.play()}
      onMouseLeave={() => rollMove.current?.reverse()}
    >
      <span
        ref={leftArrowRef}
        key="left"
        className="absolute -translate-x-12 bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
      >
        <ArrowRight />
      </span>
      <span ref={textRef}>{children}</span>
      <span
        ref={rightArrowRef}
        key="right"
        className="bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
      >
        <ArrowRight />
      </span>
    </Comp>
  );
}

function OutlineButton({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>) {
  return (
    <Comp
      {...props}
      className={cn(
        'hidden md:flex bg-white border border-[#E5E7EB] w-23 rounded-2xl cursor-pointer',
        className,
      )}
    >
      {children}
    </Comp>
  );
}

function SecondaryButton({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>) {
  return (
    <div className="shrink-0 p-1.5 bg-white/10 rounded-full border-2 border-white flex justify-center items-center">
      <PrimaryButton
        {...props}
        className={cn(
          'inline-flex bg-white border border-[#E5E7EB] w-23 rounded-2xl cursor-pointer',
          className,
        )}
      >
        {children}
      </PrimaryButton>
    </div>
  );
}

function SecondaryDarkButton({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>) {
  return (
    <SecondaryButton {...props} className={className}>
      {children}
    </SecondaryButton>
  );
}

function Button({
  className,
  variant,
  children,
  ...props
}: {
  className?: string;
  variant?: string;
  children?: React.ReactNode;
} & React.ComponentProps<'button'>) {
  switch (variant) {
    case 'outline':
      return (
        <OutlineButton {...props} className={className || ''}>
          {children}
        </OutlineButton>
      );
    case 'secondary':
      return (
        <SecondaryButton {...props} className={className || ''}>
          {children}
        </SecondaryButton>
      );
    case 'secondary-dark':
      return (
        <SecondaryDarkButton
          {...props}
          className={cn(
            'shadow-[inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.3),0_4px_16px_rgba(29,29,29,0.5)] bg-neutral-950 bg-linear-to-br from-bg-neutral-800 to-black border border-neutral-900',
            className,
          )}
        >
          {children}
        </SecondaryDarkButton>
      );
    case 'default':
    default:
      return (
        <PrimaryButton
          {...props}
          className={cn(
            'shadow-[inset_4px_4px_8px_#102B59,inset_-4px_-4px_8px_#102E60,0_4px_16px_rgba(16,46,96,0.4)] bg-linear-to-br from-[#637696] via-[#5A7AAD] via-20% to-[#2D4A7A]',
            className,
          )}
        >
          {children}
        </PrimaryButton>
      );
  }
}

export { Button };
