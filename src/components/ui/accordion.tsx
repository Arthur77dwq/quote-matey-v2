'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const variants = {
  primary: {
    item: '',
    trigger: {
      container: '',
      icon: 'bg-white group-data-[state=open]:bg-neutral-900',
    },
    content: '',
  },
  secondary: {
    item: '',
    trigger: {
      container: '',
      icon: 'bg-neutral-50 group-data-[state=open]:bg-neutral-900',
    },
    content: '',
  },
};

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
> & {
  variant?: 'primary' | 'secondary';
};

function AccordionItem({
  className,
  variant = 'primary',
  ...props
}: AccordionItemProps) {
  const style = variants[variant];
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', style?.item, className)}
      {...props}
    />
  );
}

type AccordionTriggerProps = React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> & {
  variant?: 'primary' | 'secondary';
};

function AccordionTrigger({
  className,
  children,
  variant = 'primary',
  ...props
}: AccordionTriggerProps) {
  const style = variants[variant];
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group [&[data-state=open]_.plus]:rotate-90 [&[data-state=open]_.plus]:opacity-0 [&[data-state=open]_.minus]:rotate-0 [&[data-state=open]_.minus]:opacity-100 focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
          style?.trigger.container,
          className,
        )}
        {...props}
      >
        {children}
        <div
          className={cn(
            'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
            style?.trigger.icon,
          )}
        >
          <Plus
            className="
            plus
            absolute
            size-4
            rotate-0
            transform-gpu
            will-change-transform
            transition-all
            duration-300
            ease-in-out
            group-data-[state=open]:rotate-90
            group-data-[state=open]:opacity-0
            "
          />

          <Minus
            className="
            minus
            absolute
            size-4
            -rotate-90
            opacity-0
            transform-gpu
            will-change-transform
            text-white
            transition-all
            duration-300
            ease-in-out
            group-data-[state=open]:rotate-0
            group-data-[state=open]:opacity-100
            "
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
> & {
  variant?: 'primary' | 'secondary';
};

function AccordionContent({
  className,
  children,
  variant = 'primary',
  ...props
}: AccordionContentProps) {
  const style = variants[variant];
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
        style.content,
      )}
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
