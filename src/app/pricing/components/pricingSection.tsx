import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { PriceCard } from '@/components/price-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { PRICING } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
  footerRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLElement | null>;
}) => {
  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'expo.out',
      },
      {
        scale: 1,
        opacity: 1,
      },
    );
    gsap.fromTo(
      footerRef.current,
      {
        y: 0,
        height: footerRef.current?.offsetHeight,
      },
      {
        y: -40,
        height: 0,
        display: 'none',
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom 70%',
          scrub: true,
        },
      },
    );
  });
};

export function PricingSection({ plans, footer, className }: PRICING) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionRef, footerRef });

  return (
    <section
      ref={sectionRef}
      className={cn(
        'opacity-0 flex justify-center w-full lg:w-6xl h-full',
        className,
      )}
    >
      <Card className="overflow-hidden h-full w-full flex p-1.5 pb-5 rounded-[1.88rem] border border-neutral-100">
        <CardContent className="z-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2.5 bg-neutral-50 rounded-2xl border-0 w-full h-full overflow-hidden">
          {plans.map((plan, index) => (
            <PriceCard
              key={`${index}-${plan.id}`}
              {...{ plan, active: true }}
            />
          ))}
        </CardContent>
        <CardFooter
          ref={footerRef}
          className="z-0 text-center flex justify-center text-[0.88rem] font-medium text-neutral-600 font-inter"
        >
          {footer}
        </CardFooter>
      </Card>
    </section>
  );
}
