'use client';
import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { CTA, HERO, QNA, Section } from '@/types/pages';

import { CTASection } from './components/CTASection';
import { QNASection } from './components/QNASection';

export default function Faqs({ sections }: { sections: Section[] }) {
  const heroRef = useRef<AnimatedRef>(null);

  const renderComponents = (sections: Section[]) => {
    return sections.map((section, i) => {
      switch (section?.type) {
        case 'HERO':
          return (
            <HeroSection
              key={`${i}-${section?.type}-${section?.visible}`}
              ref={heroRef}
              {...(section as HERO)}
            />
          );

        case 'QNA':
          return (
            <QNASection
              key={`${i}-${section?.type}-${section?.visible}`}
              {...(section as QNA)}
            />
          );

        case 'CTA':
          return (
            <CTASection
              key={`${i}-${section?.type}-${section?.visible}`}
              {...(section as CTA)}
            />
          );
      }
    });
  };

  return (
    sections && (
      <main className="pb-12.5 sm:pb-20 md:pb-25 h-fit">
        {renderComponents(sections)}
      </main>
    )
  );
}
