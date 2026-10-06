import { ReactNode, RefObject, useRef } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';

export type VARIANTS = 'primary' | 'secondary';

const variants = {
  primary: {
    container: '',
    child: 'transition-colors data-[state=open]:bg-neutral-50',
  },
  secondary: { container: '', child: 'data-[state=open]:bg-neutral-50' },
};

type Trigger = {
  variant?: VARIANTS;
  children?: ReactNode;
  className?: string;
};

export function QATrigger({
  variant = 'primary',
  children,
  className,
}: Trigger) {
  return (
    <AccordionTrigger
      variant={variant}
      className={cn(
        'p-0 cursor-pointer hover:no-underline text-neutral-900 text-[1.38rem] font-inter font-medium',
        variant === 'secondary' &&
          'text-[1.125rem]! md:text-[1.25rem]! lg:text-[1.375rem]! leading-[1.25em]! tracking-[-0.005em]!',
        className,
      )}
    >
      {children}
    </AccordionTrigger>
  );
}

export function QAContent({
  ref,
  variant = 'primary',
  children,
  className,
}: Trigger & { ref?: RefObject<HTMLDivElement> }) {
  return (
    <AccordionContent
      variant={variant}
      ref={ref}
      className={cn(
        'cursor-pointer text-[1.125rem] leading-[1.35em] font-inter font-medium text-neutral-600',
        variant === 'secondary' &&
          'text-[0.9375rem]! md:text-[1rem]! lg:text-[1rem]! leading-[1.3em]! pt-2.5! pb-[17px]! md:pb-[31px]! lg:pb-2.5! lg:max-w-[500px]',
        className,
      )}
    >
      {children}
    </AccordionContent>
  );
}

export function QAAccordian({
  variant = 'primary',
  index,
  zIndex,
  children,
  className,
}: {
  variant?: VARIANTS;
  index: number;
  zIndex: number;
  className?: string;
  children?: ReactNode;
}) {
  const answerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = () => {
    gsap.set(answerRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.to(answerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: answerRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  };

  const style = variants[variant || 'primary'];
  return (
    <Accordion
      className={cn(
        'cursor-pointer w-full overflow-hidden rounded-[1.25rem] border border-neutral-900/20',
        variant === 'secondary' && 'rounded-[0.625rem] md:rounded-[1.25rem]',
        className,
        style.container,
      )}
      type="single"
      collapsible
      defaultValue={index === 0 && zIndex === 0 ? `${index}` : ''}
      onValueChange={handleChange}
    >
      <AccordionItem
        value={`${index}`}
        variant={variant}
        className={cn(
          'cursor-pointer gap-2.5 text-balance text-[1.38rem] font-inter font-medium p-5',
          variant === 'secondary' &&
            'p-[13px_12px_13px_20px]! md:p-[16px_20px]! lg:p-[17px_20px]!',
          style.child,
        )}
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
}
