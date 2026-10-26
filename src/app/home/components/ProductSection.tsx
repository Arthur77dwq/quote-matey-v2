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
        start: '40% top',

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
      className="relative w-full h-400 flex flex-col justify-start items-center pt-25 md:pt-45 lg:pt-44.25 px-4 md:px-7.5 gap-12.5"
    >
      <div className="sticky top-20 z-10 lg:-translate-y-[1.1px] flex flex-col items-center gap-7.5 md:gap-10 lg:gap-12.5">
        {title && (
          <Title
            className="py-0.5 md:py-[0.2rem] lg:py-1 tracking-[-1px] leading-[1.2em]! font-bold [&_*]:font-bold text-[2.125rem] md:text-[2.75rem] lg:text-6xl md:w-[41.25rem] lg:w-[40rem]"
            title={title}
          />
        )}
        {comparison?.length && (
          <ComparisonCard
            className="w-[21.45rem] h-[31.875rem] sm:w-[45rem] sm:h-140 lg:w-[50.3125rem]"
            {...{ setActive, active, comparison }}
          />
        )}
      </div>
    </section>
  );
}
