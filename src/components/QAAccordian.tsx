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
    child: 'transition-colors data-[state=open]:bg-white',
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
        'cursor-pointer text-[1rem] font-inter font-medium text-neutral-600',
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
          style.child,
        )}
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
}
