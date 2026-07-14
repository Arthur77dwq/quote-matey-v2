'use client';
import { useRef } from 'react';

import { AnimatedRef } from '@/types/global';

import { Compliance } from './components/Compliance';
import { FounderLetter } from './components/FounderLetter';
import { HeroSection } from './components/HeroSection';
import { OurTeam } from './components/OurTeam';
import { SplitSection } from './components/SplitSection';
import { useAboutAnimation } from './useAboutAnimation';

export default function About() {
  const hero = useRef<AnimatedRef>(null);
  const split = useRef<AnimatedRef>(null);
  useAboutAnimation({ hero, split });

  return (
    <>
      <HeroSection ref={hero} />
      <SplitSection ref={split} />
      <FounderLetter />
      <OurTeam />
      <Compliance />
    </>
  );
}
