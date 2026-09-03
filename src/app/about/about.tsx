'use client';

import { HeroSection } from '@/components/HeroSection';
import { HERO } from '@/types/pages';

import { Compliance } from './components/Compliance';
import { FounderLetter } from './components/FounderLetter';
// import { OurTeam } from './components/OurTeam';
import { SplitSection } from './components/SplitSection';

export default function About() {
  const heroData: HERO = {
    type: 'HERO',
    visible: true,
    tag: 'About QuoteMatey',
    title: {
      type: 'HEADING',
      level: 1,
      content: [
        {
          id: '0',
          active: true,
          bold: true,
          weight: 'bold',
          type: 'TEXT',
          text: 'AI-Powered Quoting',
        },
        { id: '1', active: true, type: 'LINEBREAK' },
        {
          id: '2',
          active: true,
          bold: true,
          weight: 'bold',
          type: 'TEXT',
          text: 'Software',
        },
        {
          id: '3',
          active: true,
          bold: true,
          weight: 'bold',
          type: 'TEXT',
          text: ' Built for Tradies',
          strong: true,
        },
      ],
    },
    BGImage: {
      type: 'IMG',
      src: '/images/scene.png',
      alt: '',
    },
  };

  return (
    <>
      <HeroSection {...heroData} />
      <SplitSection />
      <FounderLetter />
      {/* <OurTeam /> */}
      <Compliance />
    </>
  );
}
