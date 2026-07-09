'use client';
import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { CONTACTFORM, HERO, Section } from '@/types/pages';

import { ContactForm } from './contactForm';
import { useContactAnimation } from './useContactAnimation';

export default function Contact({ sections }: { sections: Section[] }) {
  const hero = useRef<AnimatedRef>(null);
  useContactAnimation({ hero });

  return (
    <main>
      <HeroSection ref={hero} {...(sections[0] as HERO)} />
      <ContactForm {...(sections[1] as CONTACTFORM)} />
    </main>
  );
}
