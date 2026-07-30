import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { gsap } from '@/lib/animations/plugins';
import { AboutRefs } from '@/types/pages';

export const useAboutAnimation = (refs: AboutRefs) => {
  const master = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    master.current
      .add(refs.hero.current!.timeline)
      .add(refs.split.current!.timeline, '<');

    master.current.play();
  });
  return master;
};
