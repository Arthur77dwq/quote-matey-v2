import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { RefObject, useRef, useState } from 'react';

import { ComparisonCard } from '@/components/comparison';
import { Title } from '@/components/section-header';
import { PRODUCT } from '@/types/pages';

const useSectionAnimation = (
  ref: RefObject<HTMLDivElement | null>,
  setActive: (x: string) => void,
) => {
  useGSAP(
    () => {
      if (!ref.current) return;
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: '5% top',

        onEnter() {
          setActive('1');
        },

        onLeaveBack() {
          setActive('0');
        },
      });

      return () => trigger.kill();
    },
    { scope: ref },
  );
};

export function ProductSection({ title, comparison }: PRODUCT) {
  const [active, setActive] = useState('0');
  const sectionRef = useRef<HTMLDivElement>(null);
  useSectionAnimation(sectionRef, setActive);

  return (
    <section
      ref={sectionRef}
      id="product-section"
      className="relative w-full h-370.25 flex flex-col justify-start items-center pt-44.25 px-7.5 pb-37.5 gap-12.5"
    >
      <div className="sticky top-1/10 -translate-y-1/10 z-10 flex flex-col gap-12.5 pt-35">
        {title && (
          <Title
            className="leading-15 lg:leading-23 lg:text-6xl"
            title={title}
          />
        )}
        {comparison?.length && (
          <ComparisonCard
            className="w-full h-fit sm:w-3xl sm:h-140"
            {...{ setActive, active, comparison }}
          />
        )}
      </div>
    </section>
  );
}
