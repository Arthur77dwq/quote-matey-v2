'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { HeroSection } from '@/components/HeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedRef } from '@/types/global';
import { HERO, Section } from '@/types/pages';

import { useContactAnimation } from './useContactAnimation';

export default function Contact({ sections }: { sections: Section[] }) {
  const hero = useRef<AnimatedRef>(null);
  useContactAnimation({ hero });
  const { register } = useForm();

  return (
    <main>
      <HeroSection ref={hero} {...(sections[0] as HERO)}>
        <Card>
          <CardContent>
            <form>
              <input
                {...register('email', {
                  required: 'Email is required',
                })}
              />
              <button type="submit">Submit</button>
            </form>
          </CardContent>
        </Card>
      </HeroSection>
    </main>
  );
}
