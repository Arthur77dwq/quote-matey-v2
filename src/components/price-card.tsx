'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { PricingPlan } from '@/types/pages';

import { Label } from './label';
import { Card, CardContent, CardHeader } from './ui/card';

export function BaseCard({
  children,
  className,
}: {
  plan: PricingPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'p-7.5 rounded-xl border border-neutral-100 w-[405px] h-136',
        className,
      )}
    >
      {children}
    </Card>
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
  return (
    <CardContent
      className={cn('w-full h-full p-0 flex flex-col gap-7.5', className)}
    >
      <div className="flex items-center gap-1.5 w-full h-auto">
        <span className="text-5xl font-inter font-semibold leading-[1em] tracking-[-1px]">
          {plan.pricing.price}
        </span>
        <span className="text-[1rem] font-inter font-medium leading-[1.3em]">
          /{plan.period}
        </span>
      </div>
      {children}
      <ul className="w-full flex flex-col gap-2.5 font-inter font-medium text-[1rem]">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex flex-row">
            <ChevronRight className="text-primary-500" />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  );
}

export function BaseHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <CardHeader
      className={cn(
        'flex justify-between items-center gap-2.5 h-14.5 p-0',
        className,
      )}
    >
      {children}
    </CardHeader>
  );
}

export type variantType = 'neutral' | 'primary' | 'secondary';

export function PriceCard({
  plan,
  children,
  className,
}: {
  plan: PricingPlan;
  children?: React.ReactNode;
  className?: string;
}) {
  const variant: variantType = plan.variant || 'default';

  switch (variant) {
    case 'neutral':
      return (
        <BaseCard
          className={cn(
            'text-neutral-900 bg-neutral-50 shadow-none border border-neutral-50',
            className,
          )}
          {...{ plan, children }}
        >
          <BaseHeader>
            <div className="flex flex-col gap-1.5 w-fit h-full">
              <h6 className="text-2xl font-semibold text-neutral-900 leading-[1.2em]">
                {plan.name}
              </h6>
              <p className="text-body-md font-medium font-inter leading-[1.3em]">
                {plan.description}
              </p>
            </div>
            <div className="flex flex-col justify-start items-end w-fit h-full">
              {plan.trend.tranding && (
                <Label
                  className="text-body-xs text-neutral-0 font-inter font-semibold leading-[1.3em] py-1.5 px-3.5 bg-linear-to-br from-[#406AE4] to-[#5290F4]"
                  text={plan.trend.text}
                />
              )}
            </div>
          </BaseHeader>
          <BaseContent {...{ plan, children }}>
            {plan.cta.active && (
              <Link
                href={plan.cta.href}
                target={plan.cta.target}
                className="flex justify-center items-center gap-3.5 text-body-md font-inter font-semibold text-neutral-900 leading-[1.3em] px-11 py-4.5 rounded-full bg-white w-full"
              >
                {plan.cta.text}
              </Link>
            )}
          </BaseContent>
        </BaseCard>
      );
    case 'secondary':
      return (
        <BaseCard
          className={cn(
            'text-white bg-[linear-gradient(to_bottom_right,#FF530A_0%,#FF7236_63%,#FF4D00_73%,#000_100%)]',
            className,
          )}
          {...{ plan, children }}
        >
          <BaseHeader>
            <div className="flex flex-col gap-1.5 w-fit h-full">
              <h6 className="text-2xl font-semibold text-nuetral-900 leading-[1.2em]">
                {plan.name}
              </h6>
              <p className="text-body-md font-medium font-inter leading-[1.3em]">
                {plan.description}
              </p>
            </div>
            <div className="flex flex-col justify-start items-end w-fit h-full">
              {plan.trend.tranding && (
                <Label
                  className="text-body-xs text-neutral-0 font-inter font-semibold leading-[1.3em] py-1.5 px-3.5 bg-linear-to-br from-[#406AE4] to-[#5290F4]"
                  text={plan.trend.text}
                />
              )}
            </div>
          </BaseHeader>
          <BaseContent {...{ plan, children }}>
            {plan.cta.active && (
              <Link
                href={plan.cta.href}
                target={plan.cta.target}
                className="flex justify-center items-center gap-3.5 text-body-md font-inter font-semibold text-neutral-900 leading-[1.3em] px-11 py-4.5 rounded-full bg-white w-full"
              >
                {plan.cta.text}
              </Link>
            )}
          </BaseContent>
        </BaseCard>
      );
    case 'primary':
    default:
      return (
        <BaseCard
          className={cn(
            'text-white bg-[linear-gradient(to_bottom_right,#102E60_0%,#000_100%)]',
            className,
          )}
          {...{ plan, children }}
        >
          <BaseHeader>
            <div className="flex flex-col gap-1.5 w-fit h-full">
              <h6 className="text-2xl font-semibold text-nuetral-900 leading-[1.2em]">
                {plan.name}
              </h6>
              <p className="text-body-md font-medium font-inter leading-[1.3em]">
                {plan.description}
              </p>
            </div>
            <div className="flex flex-col justify-start items-end w-fit h-full">
              {plan.trend.tranding && (
                <Label
                  className="text-body-xs text-neutral-0 font-inter font-semibold leading-[1.3em] py-1.5 px-3.5 bg-linear-to-br from-[#406AE4] to-[#5290F4]"
                  text={plan.trend.text}
                />
              )}
            </div>
          </BaseHeader>
          <BaseContent {...{ plan, children }}>
            {plan.cta.active && (
              <Link
                href={plan.cta.href}
                target={plan.cta.target}
                className="flex justify-center items-center gap-3.5 text-body-md font-inter font-semibold text-neutral-900 leading-[1.3em] px-11 py-4.5 rounded-full bg-white w-full"
              >
                {plan.cta.text}
              </Link>
            )}
          </BaseContent>
        </BaseCard>
      );
  }
}
