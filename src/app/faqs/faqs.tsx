'use client';
import { useRef } from 'react';

import { AnimatedRef } from '@/types/global';
import { HeroSectionProps } from '@/types/pages';

import { HeroSection } from '../about/components/HeroSection';

export default function Faqs() {
  const hero = useRef<AnimatedRef>(null);
  const heroData: HeroSectionProps = {
    title: [
      { bold: true, weight: 'bold', type: 'text', text: 'Frequently' },
      { type: 'lineBreak', text: '' },
      { bold: true, weight: 'bold', type: 'text', text: 'asked' },
      {
        bold: true,
        weight: 'bold',
        type: 'text',
        text: ' questions',
        strong: true,
      },
    ],
    description: [
      {
        bold: true,
        weight: 'medium',
        type: 'text',
        text: 'Find quick answers to common questions about QuoteMatey,',
      },
      {
        type: 'lineBreak',
        text: '',
      },
      {
        bold: true,
        weight: 'medium',
        type: 'text',
        text: ' pricing, features, payments, and account support.',
      },
    ],
  };
  return (
    <>
      <HeroSection {...heroData} ref={hero} />
    </>
  );
}
