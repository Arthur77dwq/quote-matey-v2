'use client';
import { useRef } from 'react';

import { AnimatedRef } from '@/types/global';
import { HERO } from '@/types/pages';

import { HeroSection } from '../../components/HeroSection';
import { Compliance } from './components/Compliance';
import { FounderLetter } from './components/FounderLetter';
// import { OurTeam } from './components/OurTeam';

import { SplitSection } from './components/SplitSection';
import { useAboutAnimation } from './useAboutAnimation';
import { HeroSection } from '@/components/HeroSection';

export default function About() {
  const hero = useRef<AnimatedRef>(null);
  const split = useRef<AnimatedRef>(null);
  useAboutAnimation({ hero, split });

  const heroData: HERO = {
    type: 'HERO',
    visible: true,
    tag: 'About QuoteMatey',
    title: [
      { bold: true, weight: 'bold', type: 'text', text: 'AI-Powered Quoting' },
      { type: 'lineBreak', text: '' },
      { bold: true, weight: 'bold', type: 'text', text: 'Software' },
      {
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
