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
        className="pb-25 sm:pb-40 lg:pb-45 gap-7.5 lg:gap-11.75"
        ref={hero}
        {...(sections[0] as HERO)}
      >
        <ContactForm ref={contact} {...(sections[1] as CONTACTFORM)} />
      </HeroSection>
    </main>
  );
}
