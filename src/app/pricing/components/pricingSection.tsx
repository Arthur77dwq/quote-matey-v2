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
  cardRef,
  cardsRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
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
  });

  useGSAP(() => {
    const footer = footerRef.current;
    const card = cardRef.current;
    const cards = cardsRef.current;
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    let isFooterVisible: boolean | undefined;

    if (!footer || !card || !cards) return;

    const updateFooterVisibility = () => {
      const cardsRect = cards.getBoundingClientRect();
      const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
      const shouldShow = cardsRect.top > headerBottom - cardsRect.height * 0.1;

      if (shouldShow === isFooterVisible) return;

      const duration = isFooterVisible === undefined ? 0 : 0.22;
      isFooterVisible = shouldShow;
      footer.style.pointerEvents = shouldShow ? 'auto' : 'none';

      gsap.to(footer, {
        duration,
        ease: 'power2.out',
        opacity: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : 12,
        maxHeight: shouldShow ? 52 : 0,
        paddingTop: shouldShow ? 12 : 0,
        paddingBottom: 0,
        overwrite: 'auto',
      });
      gsap.to(card, {
        duration,
        ease: 'power2.out',
        gap: shouldShow ? 16 : 0,
        paddingBottom: shouldShow ? 12 : 1,
        overwrite: 'auto',
      });
    };

    updateFooterVisibility();
    window.addEventListener('scroll', updateFooterVisibility, {
      passive: true,
    });
    window.addEventListener('resize', updateFooterVisibility);

    return () => {
      window.removeEventListener('scroll', updateFooterVisibility);
      window.removeEventListener('resize', updateFooterVisibility);
      gsap.killTweensOf([footer, card]);
    };
  });
};

export function PricingSection({ plans, footer, className }: PRICING) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionRef, footerRef, cardRef, cardsRef });

  const footerItems = footer?.split('•') ?? [];

  return (
    <section
      ref={sectionRef}
      className={cn(
        'opacity-0 flex justify-center w-full lg:w-6xl h-auto px-2.5 pt-0 pb-7.5 sm:px-7.5',
        className,
      )}
    >
      <Card
        ref={cardRef}
        className="overflow-hidden h-auto w-full flex p-1.5 pb-3 rounded-[2.25rem] border border-neutral-100"
      >
        <CardContent
          ref={cardsRef}
          className="z-2 grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-neutral-50 rounded-[2rem] border-0 w-full h-auto overflow-hidden"
        >
          {plans.map((plan, index) => (
            <PriceCard
              key={`${index}-${plan.id}`}
              {...{ plan, active: true }}
            />
          ))}
        </CardContent>
        <CardFooter
          ref={footerRef}
          className="z-10 relative flex flex-wrap justify-center gap-x-5 gap-y-1 px-3 pt-3 text-center text-[0.88rem] font-medium text-neutral-600 font-inter"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            maxHeight: '52px',
            overflow: 'hidden',
            paddingTop: '0.75rem',
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
