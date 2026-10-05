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
    const section = sectionRef.current;
    const footer = footerRef.current;
    if (!section || !footer) return;

    const media = gsap.matchMedia();
    const animateFooter = (
      trigger: HTMLElement,
      start: string,
      end: string | (() => string),
    ) => {
      gsap.fromTo(
        footer,
        { y: 0, height: 32, autoAlpha: 1 },
        {
          y: -32,
          height: 0,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger, start, end, scrub: true },
        },
      );
    };

    media.add('(min-width: 640px)', () => {
      animateFooter(section, 'top 80px', () => {
        const card = section.querySelector<HTMLElement>('[data-slot="card"]');
        const distance = Math.max(
          160,
          Math.round((card?.offsetHeight ?? 320) * 0.35),
        );
        return `+=${distance}`;
      });
    });

    return () => media.revert();
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
      <Card className="overflow-hidden w-full h-fit flex gap-0 bg-white p-0 rounded-none border-0 sm:p-1.5 sm:pb-1.5 sm:rounded-[1.875rem] sm:border sm:border-neutral-100">
        <CardContent className="z-2 grid grid-cols-1 sm:grid-cols-[1fr_1.022fr_1.08fr] justify-items-center sm:justify-items-stretch sm:items-center gap-0 p-0 pt-[17px] pb-[17px] sm:p-3 bg-neutral-50 rounded-none sm:rounded-[1.5rem] border-0 w-full h-fit overflow-hidden">
          {plans.map((plan, index) => (
            <PriceCard key={`${index}-${plan.id}`} plan={plan} />
          ))}
        </CardContent>
        <CardFooter
          ref={footerRef}
          className="z-0 relative hidden sm:flex flex-wrap justify-center items-center gap-x-3 px-3 min-h-0 overflow-hidden text-center text-[0.88rem] font-medium text-neutral-600 font-inter"
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
            <span key={index} className="contents">
              {index > 0 && <span aria-hidden="true">•</span>}
              <span className="whitespace-nowrap">{item.trim()}</span>
            </span>
          ))}
        </CardFooter>
      </Card>
    </section>
  );
}
