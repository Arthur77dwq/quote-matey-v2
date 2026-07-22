'use client';

import { HeroSection } from '@/components/HeroSection';
import { QNASection } from '@/components/QNASection';
import { HERO, PRICING, QNA, Section, TESTIMONIAL } from '@/types/pages';

import { PricingSection } from './components/pricingSection';
import { Testimonial } from './components/testimonialSection';

export function Pricing({ sections }: { sections: Section[] }) {
  return (
    <main>
      {sections[0]?.visible && (
        <HeroSection
          className="px-7.5 gap-7.5 lg:gap-12.5 pb-0"
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
