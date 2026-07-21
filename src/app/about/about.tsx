'use client';
import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { HERO } from '@/types/pages';

import { Compliance } from './components/Compliance';
import { FounderLetter } from './components/FounderLetter';
// import { OurTeam } from './components/OurTeam';
import { SplitSection } from './components/SplitSection';
import { useAboutAnimation } from './useAboutAnimation';

export default function About() {
  const hero = useRef<AnimatedRef>(null);
  const split = useRef<AnimatedRef>(null);
  useAboutAnimation({ hero, split });

  const heroData: HERO = {
    type: 'HERO',
    visible: true,
    tag: 'About QuoteMatey',
    title: [
      {
        id: '1',
        bold: true,
        weight: 'bold',
        type: 'text',
        text: 'AI-Powered Quoting',
      },
      { id: '2', type: 'lineBreak', text: '' },
      { id: '3', bold: true, weight: 'bold', type: 'text', text: 'Software' },
      {
        id: '4',
        bold: true,
        weight: 'bold',
        type: 'text',
        text: ' Built for Tradies',
        strong: true,
      },
    ],
  };

  return (
    <>
      <HeroSection {...heroData} ref={hero} />
      <SplitSection ref={split} />
      <FounderLetter />
      {/* <OurTeam /> */}
      <Compliance />
    </>
  );
}
