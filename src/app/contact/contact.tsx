'use client';

import { HeroSection } from '@/components/HeroSection';
import { CONTACTFORM, HERO, Section } from '@/types/pages';

import { ContactForm } from './components/contactForm';

export default function Contact({ sections }: { sections: Section[] }) {
  return (
    <main>
      <HeroSection
        className="pb-25 sm:pb-40 lg:pb-45 gap-7.5 lg:gap-11.75"
        {...(sections[0] as HERO)}
      >
        <ContactForm {...(sections[1] as CONTACTFORM)} />
      </HeroSection>
    </main>
  );
}
