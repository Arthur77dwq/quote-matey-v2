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
  cardRef,
  cardsRef,
  landing,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
  landing: boolean;
}) => {
  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 1.05, duration: 0.8, ease: 'expo.out' },
      { scale: 1, opacity: 1 },
    );
  });

  useGSAP(
    () => {
      const footer = footerRef.current;
      const card = cardRef.current;
      const cards = cardsRef.current;

      if (!footer || !card || !cards) return;

      if (!landing) {
        gsap.fromTo(
          footer,
          { y: 0, height: footer.offsetHeight },
          {
            y: -40,
            height: 0,
            display: 'none',
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom',
              end: 'bottom 70%',
              scrub: true,
            },
          },
        );
        return;
      }

      const header = document.querySelector<HTMLElement>('[data-site-header]');
      let isFooterVisible: boolean | undefined;

      const updateFooterVisibility = () => {
        const cardsRect = cards.getBoundingClientRect();
        const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
        const shouldShow =
          cardsRect.top > headerBottom - cardsRect.height * 0.1;

        if (shouldShow === isFooterVisible) return;

        const duration = isFooterVisible === undefined ? 0 : 0.22;
        isFooterVisible = shouldShow;
        footer.style.pointerEvents = shouldShow ? 'auto' : 'none';

        gsap.to(footer, {
          duration,
          ease: 'power2.out',
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 12,
          height: shouldShow ? 32 : 8,
          paddingTop: 0,
          paddingBottom: 0,
          overwrite: 'auto',
        });
        gsap.to(card, {
          duration,
          ease: 'power2.out',
          gap: shouldShow ? 6 : 0,
          paddingBottom: 6,
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
    },
    { dependencies: [landing] },
  );
};

export function PricingSection({
  plans,
  footer,
  className,
  landing = false,
}: PricingSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionRef, footerRef, cardRef, cardsRef, landing });

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
        ref={cardRef}
        className={cn(
          'overflow-hidden w-full flex p-1.5 border border-neutral-100',
          landing
            ? '!h-fit !gap-0 pb-1.5 rounded-[2.25rem]'
            : 'h-full pb-5 rounded-[1.88rem]',
        )}
      >
        <CardContent
          ref={cardsRef}
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
              ? 'z-10 relative flex flex-wrap gap-x-5 gap-y-1 px-3 min-h-0 overflow-hidden'
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
