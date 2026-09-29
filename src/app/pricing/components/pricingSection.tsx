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
  footerRef: React.RefObject<HTMLDivElement | null>;
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

  const footerItems = footer?.split('•') ?? [];

  return (
    <section
      ref={sectionRef}
      className={cn(
        'opacity-0 flex justify-center w-full lg:w-6xl h-auto bg-neutral-50 px-0 pt-0 pb-7.5 sm:bg-transparent sm:px-7.5',
        className,
      )}
    >
      <Card className="overflow-hidden w-full h-fit flex gap-0 bg-white p-0 rounded-none border-0 sm:p-1.5 sm:pb-1.5 sm:rounded-[2.25rem] sm:border sm:border-neutral-100">
        <CardContent className="z-2 grid grid-cols-1 sm:grid-cols-3 justify-items-center sm:justify-items-stretch gap-3 p-3 bg-neutral-50 rounded-none sm:rounded-[2rem] border-0 w-full h-fit overflow-hidden">
          {plans.map((plan, index) => (
            <PriceCard key={`${index}-${plan.id}`} plan={plan} />
          ))}
        </CardContent>
        <CardFooter
          ref={footerRef}
          className="z-0 relative flex flex-wrap justify-center gap-x-5 gap-y-1 px-3 min-h-0 overflow-hidden text-center text-[0.88rem] font-medium text-neutral-600 font-inter"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            height: '32px',
            overflow: 'hidden',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {footerItems.map((item, index) => (
            <span key={index} className="whitespace-nowrap">
              {item.trim()}
            </span>
          ))}
        </CardFooter>
      </Card>
    </section>
  );
}
