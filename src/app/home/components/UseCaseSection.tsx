import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import { Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { USECASES } from '@/types/pages';

export function UseCaseSection({ tag, title, className, ...props }: USECASES) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const cardType = 'TEXT-OVERLAYED-IMAGE';

  const handleMouseEnter = () => {
    if (!tweenRef.current) return;

    gsap.to(tweenRef.current, {
      timeScale: 0.25, // 25% speed
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!tweenRef.current) return;

    gsap.to(tweenRef.current, {
      timeScale: 1, // Normal speed
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        tweenRef.current = gsap.to(trackRef.current!, {
          x: () => -(trackRef.current!.scrollWidth / 5),
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);
  return (
    <section
      ref={sectionRef}
      className={cn(
        'flex flex-col justify-center items-cente p-0 gap-7.5 sm:gap-10 w-full bg-white pb-50',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2.5 px-5">
        {tag && (
          <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
            {tag}
          </Badge>
        )}

        {title && (
          <Title
            className="whitespace-normal font-bold text-[2.125rem] sm:text-6xl! leading-[1.2em] tracking-[-1px] px-5"
            {...{ title }}
          />
        )}
      </div>
      <div className="w-full overflow-hidden">
        {isMobile && (
          <div className="w-full flex flex-col items-center gap-2.5">
            {props.cards.length &&
              props.cards.map(
                (card, index) =>
                  card.type === cardType && (
                    <Card
                      key={index}
                      className="max-w-95 max-h-69.75 sm:max-h-105 aspect-95/105 w-95 h-69.75 sm:h-105 overflow-hidden p-0 border-0 rounded-none shadow-none"
                    >
                      <CardContent className="relative flex items-center justify-center w-full h-full rounded-[0.625rem] sm:rounded-[1.875rem] p-2.5 overflow-hidden">
                        {card.image.src && (
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={card.image.src}
                              alt={card.image.alt}
                              width={380}
                              height={279}
                              sizes="(max-width: 640px) 100vw, 380px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        {card.type === cardType && (
                          <div
                            className="
                        z-10
                        w-full
                        h-full
                        rounded-[0.375rem] sm:rounded-[1.25rem]
                        border border-white/40
                        bg-white/30
                        backdrop-blur-xl
                        shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                        p-7.5 
                        flex flex-col justify-between items-center
                        "
                          >
                            <div className="w-full flex flex-col text-balance gap-1.5 p-0 sm:pb-7.5">
                              <h3 className="text-heading-5 text-neutral-900 font-semibold leading-[1.2em]">
                                {card.title}
                              </h3>
                              <p className="text-body-md font-medium font-inter text-neutral-600 leading-[1.3em]">
                                {card.description}
                              </p>
                            </div>
                            <div className="w-full flex flex-col text-balance gap-1.5">
                              <h4 className="text-2xl text-neutral-900 font-semibold leading-[1.2em]">
                                {card.supportingText?.title}
                              </h4>
                              <p className="text-[1rem] font-medium font-inter text-neutral-900 leading-[1.3em]">
                                {card.supportingText?.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ),
              )}
          </div>
        )}

        {!isMobile && (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={trackRef}
            className="w-max h-105 flex justify-between items-center gap-2.5 pl-5"
          >
            {props.cards.length &&
              props.cards.map((card, index) => (
                <Card
                  key={index}
                  className="max-w-95 max-h-69.75 sm:max-h-105 aspect-95/105 w-95 h-69.75 sm:h-105 overflow-hidden p-0 border-0 rounded-none shadow-none"
                >
                  <CardContent className="relative flex items-center justify-center w-full h-full rounded-[0.625rem] sm:rounded-[1.875rem] p-2.5 overflow-hidden">
                    {card.image.src && (
                      <div className="absolute inset-0 -z-10">
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 380px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {card.type === cardType && (
                      <div
                        className="
                        z-10
                        w-full
                        h-full
                        rounded-[0.375rem] sm:rounded-[1.25rem]
                        border border-white/40
                        bg-white/30
                        backdrop-blur-xl
                        shadow-[0_8px_40px_rgba(0,0,0,0.12)]
                        p-7.5 
                        flex flex-col justify-between items-center
                        "
                      >
                        <div className="w-full flex flex-col text-balance gap-1.5 p-0 sm:pb-7.5">
                          <h3 className="text-heading-5 text-neutral-900 font-semibold leading-[1.2em]">
                            {card.title}
                          </h3>
                          <p className="text-body-md font-medium font-inter text-neutral-600 leading-[1.3em]">
                            {card.description}
                          </p>
                        </div>
                        <div className="w-full flex flex-col text-balance gap-1.5">
                          <h4 className="text-2xl text-neutral-900 font-semibold leading-[1.2em]">
                            {card.supportingText?.title}
                          </h4>
                          <p className="text-[1rem] font-medium font-inter text-neutral-900 leading-[1.3em]">
                            {card.supportingText?.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
