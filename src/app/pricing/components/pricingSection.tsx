import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { PriceCard } from '@/components/price-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { PRICING } from '@/types/pages';

type PricingSectionProps = PRICING & { landing?: boolean };

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

export function PricingSection({
  plans,
  footer,
  className,
  landing = false,
}: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionRef, footerRef });

  const footerItems = footer?.split('•') ?? [];

  return (
    <section
      ref={sectionRef}
      className={cn(
        landing
          ? 'opacity-0 flex justify-center w-full lg:w-6xl h-auto px-2.5 pt-0 pb-7.5 sm:px-7.5'
          : 'opacity-0 flex justify-center w-full lg:w-6xl h-full p-0 sm:p-7.5',
        className,
      )}
    >
      <Card
        className={cn(
          'overflow-hidden w-full flex p-1.5 border border-neutral-100',
          landing
            ? '!h-fit !gap-0 pb-1.5 rounded-[2.25rem]'
            : 'h-full pb-5 rounded-[1.88rem]',
        )}
      >
        <CardContent
          className={cn(
            'z-2 grid grid-cols-1 sm:grid-cols-3 bg-neutral-50 border-0 w-full overflow-hidden',
            landing
              ? 'gap-3 p-3 rounded-[2rem] !h-fit'
              : 'gap-2.5 p-2.5 rounded-2xl h-full',
          )}
        >
          {plans.map((plan, index) => (
            <PriceCard
              key={`${index}-${plan.id}`}
              plan={plan}
              landing={landing}
            />
          ))}
        </CardContent>
        <CardFooter
          ref={footerRef}
          className={cn(
            'text-center justify-center text-[0.88rem] font-medium text-neutral-600 font-inter',
            landing
              ? 'z-0 relative flex flex-wrap gap-x-5 gap-y-1 px-3 min-h-0 overflow-hidden'
              : 'z-0 flex',
          )}
          style={
            landing
              ? {
                  opacity: 1,
                  transform: 'translateY(0)',
                  height: '32px',
                  overflow: 'hidden',
                  paddingTop: 0,
                  paddingBottom: 0,
                }
              : undefined
          }
        >
          {landing
            ? footerItems.map((item, index) => (
                <span key={index} className="whitespace-nowrap">
                  {item.trim()}
                </span>
              ))
            : footer}
        </CardFooter>
      </Card>
    </section>
  );
}
