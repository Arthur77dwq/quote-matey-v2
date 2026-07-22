'use client';

import { HeroSection } from '@/components/HeroSection';
import { HERO, PRIVACY, Section } from '@/types/pages';

import { PrivacyPolicySection } from './components/PrivacyPolicySection';

export function Privacy({ sections }: { sections: Section[] }) {
  return (
    <>
      <HeroSection {...(sections[0] as HERO)} />
      <PrivacyPolicySection {...(sections[1] as PRIVACY)} />
    </>
  );
}
