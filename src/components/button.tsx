import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { Button as Comp } from '@/components/ui/button';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';

import { Icon } from './icon';

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
  const easing = 'power2.inOut';

  useGSAP(() => {
    gsap.set(leftArrowRef.current, {
      rotate: -45,
    });
    rollMove.current = gsap.timeline({ paused: true });
    rollMove.current.to(leftArrowRef.current, {
      x: -13,
      rotate: 0,
      duration: 0.5,
      ease: easing,
    });
    rollMove.current.to(
      rightArrowRef.current,
      {
        xPercent: 150,
        rotate: 45,
        duration: 0.5,
        ease: easing,
      },
      '<',
    );
    rollMove.current.to(
      textRef.current,
      {
        x: 15,
        duration: 0.5,
        ease: easing,
      },
      '<',
    );
  });
  return rollMove;
};

function PrimaryButton({
  className,
  children,
  animation = true,
  arrow = true,
  ...props
}: {
  className: string;
  children: React.ReactNode;
  animation?: boolean;
  arrow?: boolean;
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
      onMouseEnter={() => animation && rollMove.current?.play()}
      onMouseLeave={() => animation && rollMove.current?.reverse()}
    >
      {arrow && (
        <span
          ref={leftArrowRef}
          key="left"
          className="absolute -translate-x-12 bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
        >
          <Icon name="LongTailArrow" className="w-3! h-2!" />
        </span>
      )}
      <span ref={textRef} className="w-fit">
        {children}
      </span>
      {arrow && (
        <span
          ref={rightArrowRef}
          key="right"
          className="bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
        >
          <Icon name="LongTailArrow" className="w-3! h-2!" />
        </span>
      )}
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
        'flex bg-white border border-[#E5E7EB] w-23 rounded-2xl cursor-pointer',
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
    <div className="w-fit h-fit shrink-0 p-1.5 bg-white/10 rounded-full border-2 border-neutral-50 flex justify-center items-center">
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

function Button({
  className,
  variant = 'default',
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
        <SecondaryButton
          {...props}
          className={cn(
            'shadow-[inset_4px_4px_8px_#FFFFFF4D,inset_-4px_-4px_8px_#FFFFFF4D,0_4px_16px_#1D1D1D80] bg-neutral-950 bg-linear-to-br from-bg-neutral-800 to-black border border-neutral-900',
            className,
          )}
        >
          {children}
        </SecondaryButton>
      );
    case 'dark':
      return (
        <PrimaryButton
          {...props}
          arrow={false}
          animation={false}
          className={cn(
            'px-11 py-4.5 transition-colors ease-in-out hover:bg-neutral-100 bg-neutral-900 hover:text-neutral-900! text-neutral-0! w-fit rounded-4xl font-inter font-semibold text-body-md',
            className,
          )}
        >
          {children}
        </PrimaryButton>
      );
    case 'default':
    case 'primary':
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
