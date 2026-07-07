'use client';
import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { Section } from '@/types/pages';

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
              {...section}
            />
          );

        case 'QNA':
          return (
            <QNASection
              key={`${i}-${section?.type}-${section?.visible}`}
              {...section}
            />
          );
      }
    });
  };

  return sections && renderComponents(sections);
}
