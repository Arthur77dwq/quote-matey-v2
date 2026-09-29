'use client';
import { ChevronRight } from 'lucide-react';

import { bricolageGrotesque } from '@/fonts';
import { cn } from '@/lib/utils';
import { PricingPlan } from '@/types/pages';

import { Label } from './label';
import { Card, CardContent, CardHeader } from './ui/card';

const variants = {
  neutral: {
    card: 'text-neutral-900 bg-neutral-50 shadow-none border-neutral-50',
    button:
      'bg-neutral-900 text-neutral-0 hover:bg-neutral-100 hover:text-neutral-900',
    primaryText: 'text-neutral-900',
    supportingText: 'text-neutral-600',
  },

  primary: {
    card: 'text-white bg-[linear-gradient(to_bottom_right,#102E60_0%,#000_100%)]',
    button:
      'bg-neutral-100 text-neutral-900 hover:bg-black hover:text-neutral-0',
    primaryText: 'text-white',
    supportingText: 'text-neutral-300',
  },

  secondary: {
    card: 'text-white bg-[linear-gradient(to_bottom_right,#FF530A_0%,#FF7236_63%,#FF4D00_73%,#000_100%)]',
    button:
      'bg-neutral-100 text-neutral-900 hover:bg-black hover:text-neutral-0',
    primaryText: 'text-white',
    supportingText: 'text-neutral-0',
  },
};

export function BaseCard({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'p-3.75 lg:p-4 flex gap-3.5 border border-neutral-100 w-full max-w-101.25 h-full',
        'rounded-[1.75rem] min-h-[27rem] lg:min-h-[29.25rem] max-h-156',
        className,
      )}
    >
      {children}
    </Card>
  );
}

export function BaseHeader({
  plan,
  children,
  className,
}: {
  plan: PricingPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  const style = variants[plan.variant || 'primary'];
  return (
    <CardHeader
      className={cn(
        'flex justify-between items-center gap-1 lg:gap-2.5 h-fit lg:h-14.5 p-0',
        className,
      )}
    >
      <div className="flex flex-col gap-1 lg:gap-1.5 w-fit h-full">
        <h6
          className={cn(
            'text-xl sm:text-[1rem] lg:text-2xl text-neutral-900 leading-[1.2em]',
            'font-bold tracking-[-0.03em]',
            style.primaryText,
          )}
        >
          {plan.name}
        </h6>
        <p
          className={cn(
            'text-nowrap text-[.88rem] sm:text-[0.75rem] lg:text-body-md font-medium font-inter leading-[1.3em]',
            'tracking-[-0.01em]',
            style.supportingText,
          )}
        >
          {plan.description}
        </p>
      </div>
      <div
        className={cn(
          'text-neutral-0 flex flex-col justify-start items-end w-fit h-full',
          style.primaryText,
        )}
      >
        {plan.trend.tranding && (
          <Label
            className="text-[0.5rem] lg:text-body-xs font-inter font-semibold leading-[1.3em] py-1 lg:py-1.5 px-1.75 lg:px-3.5 bg-linear-to-br from-[#406AE4] to-[#5290F4]"
            text={plan.trend.text}
          />
        )}
      </div>
      {children}
    </CardHeader>
  );
}

export function BaseContent({
  plan,
  children,
  className,
}: {
  plan: PricingPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  const style = variants[plan.variant || 'primary'];
  return (
    <CardContent
      className={cn(
        'w-full h-full p-0 flex flex-col gap-2.5 lg:gap-7.5',
        className,
      )}
    >
      <div
        className={cn(
          'flex gap-1.5 w-full h-auto',
          'items-end leading-none',
          style.primaryText,
        )}
      >
        <span
          className={cn(
            bricolageGrotesque.className,
            'whitespace-nowrap text-[44px] font-semibold leading-[1em] tracking-[-1px]',
          )}
        >
          {plan.pricing.price}
        </span>
        <span
          className={cn(
            'pb-1 text-[0.82rem] sm:text-[0.8rem] lg:text-[0.95rem] font-inter font-medium leading-[1.2em] text-current/80',
          )}
        >
          /{plan.period}
        </span>
      </div>
      {children}
      <ul
        className={cn(
          'w-full flex flex-col font-inter text-[0.88rem] sm:text-[0.75rem] lg:text-[1rem]',
          'gap-1.5 sm:gap-1 lg:gap-2.5 font-normal tracking-[-0.01em]',
          style.supportingText,
        )}
      >
        {plan.features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className={cn('flex flex-row items-center p-0', 'gap-1.5')}
          >
            <ChevronRight
              className={cn('text-primary-500', 'size-3.5 shrink-0')}
              strokeWidth={1.75}
            />
            <span className="font-medium leading-[1.5]">{feature.text}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  );
}

export function PriceCard({
  plan,
  children,
  className,
}: {
  plan: PricingPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  const style = variants[plan.variant || 'primary'];

  return (
    <BaseCard className={cn(style.card, className)}>
      <BaseHeader plan={plan} />
      <BaseContent plan={plan}>{children}</BaseContent>
    </BaseCard>
  );
}
