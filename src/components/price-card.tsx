'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { LINK } from '@/types/global';
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

const Button = ({
  href,
  target,
  text,
  className,
}: LINK & { className?: string }) => (
  <Link
    href={href}
    target={target}
    className={cn(
      'transition-colors duration-300 ease-in-out flex justify-center items-center gap-1.75 lg:gap-3.5 text-[.88rem] lg:text-body-md font-inter font-semibold leading-[1.3em] px-5.5 lg:px-11 py-2.5 lg:py-4.5 rounded-full w-full',
      className,
    )}
  >
    {text}
  </Link>
);

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
        'p-3.75 lg:p-7.5 flex gap-3.5 rounded-[1.25rem] border border-neutral-100 w-full max-w-101.25 h-full max-h-136',
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
            'text-xl lg:text-2xl font-semibold text-neutral-900 leading-[1.2em]',
            style.primaryText,
          )}
        >
          {plan.name}
        </h6>
        <p
          className={cn(
            'text-nowrap text-[.88rem] lg:text-body-md font-medium font-inter leading-[1.3em]',
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
          'flex items-center gap-1.5 w-full h-auto',
          style.primaryText,
        )}
      >
        <span className="text-4xl lg:text-5xl font-inter font-semibold leading-[1em] tracking-[-1px]">
          {plan.pricing.price}
        </span>
        <span className="text-[1rem] font-inter font-medium leading-[1.3em]">
          /{plan.period}
        </span>
      </div>
      {children}
      <ul
        className={cn(
          'w-full flex flex-col gap-1 lg:gap-2.5 font-inter font-medium text-[0.88rem] lg:text-[1rem]',
          style.supportingText,
        )}
      >
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex flex-row p-0">
            <ChevronRight className="text-primary-500" />
            <span>{feature.text}</span>
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
      <BaseHeader {...{ plan }} />
      <BaseContent {...{ plan }}>
        {plan.cta.active && <Button {...plan.cta} className={style.button} />}
        {children}
      </BaseContent>
    </BaseCard>
  );
}
