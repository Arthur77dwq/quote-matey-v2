import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from '@/lib/animations/plugins';
import { ContactRefs } from '@/types/pages';

export const useContactAnimation = (refs: ContactRefs) => {
  const master = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    master.current
      .add(refs.hero.current!.timeline)
      .add(refs.contact.current!.timeline, '<');

    master.current.play();
  });
  return master;
};
