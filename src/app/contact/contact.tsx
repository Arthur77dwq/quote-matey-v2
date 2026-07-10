'use client';
import { useRef } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedRef } from '@/types/global';
import { CONTACTFORM, HERO, Section } from '@/types/pages';

import { ContactForm } from './components/contactForm';
import { useContactAnimation } from './useContactAnimation';

export default function Contact({ sections }: { sections: Section[] }) {
  const hero = useRef<AnimatedRef>(null);
  const contact = useRef<AnimatedRef>(null);
  useContactAnimation({ hero, contact });

  return (
    <main>
      <HeroSection
        className="pb-7.5 lg:pb-12"
        ref={hero}
        {...(sections[0] as HERO)}
      />
      <ContactForm ref={contact} {...(sections[1] as CONTACTFORM)} />
    </main>
  );
}
