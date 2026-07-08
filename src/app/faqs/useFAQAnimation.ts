import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from '@/lib/animations/plugins';
import { FAQRefs } from '@/types/pages';

export const useFAQAnimation = (refs: FAQRefs) => {
  const master = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    master.current.add(refs.hero.current!.timeline);

    master.current.play();
  });
  return master;
};
