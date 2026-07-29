import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { RefObject, useRef, useState } from 'react';

import { ComparisonCard } from '@/components/comparison';
import { Title } from '@/components/section-header';
import { gsap } from '@/lib/animations/plugins';
import { PRODUCT } from '@/types/pages';

const useSectionAnimation = (
  ref: RefObject<HTMLDivElement | null>,
  setActive: (x: string) => void,
) => {
  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
  };
  useGSAP(
    () => {
      if (!ref.current) return;

      let locked = false;

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',

        onEnter() {
          if (locked) return;

          locked = true;
          lockScroll();

          gsap.delayedCall(0.7, () => {
            setActive('2');
            unlockScroll();
            locked = false;
          });
        },

        onLeaveBack() {
          if (locked) return;

          locked = true;
          lockScroll();

          gsap.delayedCall(0.7, () => {
            setActive('1');
            unlockScroll();
            locked = false;
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: ref },
  );
};

export function ProductSection({ title, comparison }: PRODUCT) {
  const [active, setActive] = useState('1');
  const sectionRef = useRef<HTMLDivElement>(null);
  useSectionAnimation(sectionRef, setActive);

  return (
    <section
      ref={sectionRef}
      id="product-section"
      className="w-full flex flex-col justify-center items-center pt-44.25 px-7.5 pb-37.5"
    >
      {title && <Title className="leading-23 lg:text-6xl" title={title} />}
      {comparison?.length && (
        <ComparisonCard {...{ setActive, active, comparison }} />
      )}
    </section>
  );
}
