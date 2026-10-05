'use client';
import { Suspense } from 'react';

import { AuthScreen } from '@/components/auth-screen';
import { QNASection } from '@/components/QNASection';
import { Title } from '@/components/section-header';
import { Testimonial } from '@/components/testimonialSection';
import { Badge } from '@/components/ui/badge';
import {
  LANDINGHERO,
  LANDINGPRICING,
  PLATFORM,
  PRICING,
  PRODUCT,
  QNA,
  Section,
  TESTIMONIAL,
  USECASES,
  VIDEODEMO,
  WORKING,
} from '@/types/pages';

import { PricingSection } from '../pricing/components/pricingSection';
import { HeroSection } from './components/HeroSection';
import { PlatformSection } from './components/PlatformSection';
import { ProductSection } from './components/ProductSection';
import { UseCaseSection } from './components/UseCaseSection';
import { VideoDemoSection } from './components/VideoDemoSection';
import { WorkingSection } from './components/WorkingSection';

export default function Home({ sections }: { sections: Section[] }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthScreen />
      </Suspense>
      <HeroSection {...(sections[0] as LANDINGHERO)} />
      <ProductSection {...(sections[1] as PRODUCT)} />
      <VideoDemoSection
        className="w-full h-fit"
        {...(sections[2] as VIDEODEMO)}
      />
      <PlatformSection {...(sections[3] as PLATFORM)} />
      <WorkingSection {...(sections[4] as WORKING)} />
      <UseCaseSection {...(sections[5] as USECASES)} />
      <Testimonial {...(sections[6] as TESTIMONIAL)} />
      {/* pricing section */}
      <section className="flex flex-col justify-center items-center gap-20 sm:gap-15 pb-25">
        <div className="w-full flex flex-col justify-center items-center gap-2.5">
          {(sections[7] as LANDINGPRICING).tag && (
            <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
              {(sections[7] as LANDINGPRICING).tag}
            </Badge>
          )}
          {(sections[7] as LANDINGPRICING).title && (
            <Title
              className="max-sm:w-[min(23.45rem,100%)] max-sm:text-[2.125rem] max-sm:font-bold max-sm:tracking-[-1px] max-sm:leading-[1.2em] max-sm:[&_strong]:block sm:text-[2.75rem] sm:font-bold sm:tracking-[-1px] sm:!leading-[1.2em] md:text-[2.75rem] lg:text-6xl lg:relative lg:-top-1.5"
              title={(sections[7] as LANDINGPRICING).title}
            />
          )}
        </div>

        <PricingSection {...(sections[7] as PRICING)} />
      </section>
      <QNASection {...(sections[8] as QNA)} />
    </>
  );
}
