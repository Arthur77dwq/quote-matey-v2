'use client';

import { HeroSection } from '@/components/HeroSection';
import { QNASection } from '@/components/QNASection';
import { HERO, PRICING, QNA, Section, TESTIMONIAL } from '@/types/pages';

import { Testimonial } from '../../components/testimonialSection';
import { PricingSection } from './components/pricingSection';

export function Pricing({ sections }: { sections: Section[] }) {
  return (
    <main>
      {sections[0]?.visible && (
        <HeroSection
          className="px-0 sm:px-7.5 gap-7.5 lg:gap-12.5 pb-0 [&_h1]:text-balance [&_h1]:text-[2.125rem] sm:[&_h1]:text-[3.375rem] lg:[&_h1]:text-[4.6875rem]"
          {...(sections[0] as HERO)}
        >
          {sections[1]?.visible && (
            <PricingSection className="z-10" {...(sections[1] as PRICING)} />
          )}
        </HeroSection>
      )}
      {sections[2]?.visible && (
        <Testimonial {...(sections[2] as TESTIMONIAL)} />
      )}
      {sections[3]?.visible && <QNASection {...(sections[3] as QNA)} />}
    </main>
  );
}
