'use client';

import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { HERO, PRIVACY, Section } from '@/types/pages';

import { PrivacyPolicySection } from './components/PrivacyPolicySection';
import { usePrivacyAnimation } from './usePrivacyAnimation';

export function Privacy({ sections }: { sections: Section[] }) {
  const hero = useRef<AnimatedRef>(null);
  usePrivacyAnimation({ hero });
  return (
    <>
      <HeroSection ref={hero} {...(sections[0] as HERO)} />
      <PrivacyPolicySection {...(sections[1] as PRIVACY)} />
    </>
  );
}
