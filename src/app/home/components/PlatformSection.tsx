import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { RefObject, useLayoutEffect, useRef } from 'react';

import { Icon } from '@/components/icon';
import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { PLATFORM } from '@/types/pages';

const useSectionAnimation = ({
  textRef,
  imageRef,
}: {
  textRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
}) => {
  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom top',
      },
    });

    gsap.from(imageRef.current, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
        end: 'bottom top',
      },
    });
  });
};

export function PlatformSection({
  tag,
  title,
  description,
  className,
  ...props
}: PLATFORM) {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  useSectionAnimation({ textRef, imageRef });

  useLayoutEffect(() => {
    const container = cardContainerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]');

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [props.cards]);

  return (
    <section
      className={cn('relative w-full h-360 md:h-326 lg:h-382.75', className)}
    >
      <div className="w-full h-full">
        <div className="z-5 absolute top-0 w-full h-40 bg-linear-to-t from-white/0 via-25% via-white/70 to-50% to-white" />
        <div className="z-5 absolute bottom-0 w-full h-40 bg-linear-to-b from-white/0 via-25% via-white/70 to-50% to-white" />
        <Image
          className="w-full h-full object-cover"
          fill
          src={props.BGImage?.src || ''}
          alt={props.BGImage?.alt || ''}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7.5 px-4 md:px-5 lg:px-7.5 h-full">
        <div
          ref={textRef}
          className="px-4 md:py-5 md:p-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit"
        >
          {tag && (
            <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
              {tag}
            </Badge>
          )}

          {title && (
            <Title
              className="w-70 md:w-full text-white text-[2.125rem] md:text-[2.75rem]! lg:text-6xl! font-bold"
              {...{ title }}
            />
          )}
          {description && (
            <Description
              className="text-white! font-inter w-80 md:w-full"
              {...{ description }}
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-5 md:gap-7.5 w-full h-fit">
          <div
            ref={imageRef}
            className="relative flex items-center justify-center p-1.5 bg-white max-w-300 w-full aspect-3840/2333 rounded-[0.625rem] md:rounded-[1.25rem] overflow-hidden"
          >
            <div className="aspect-3840/2333 flex items-center justify-center w-full border-black/10 border-2 rounded-[0.375rem] md:rounded-[0.875rem] overflow-hidden">
              <Image
                src={props.FGImage?.src || ''}
                alt={props.FGImage?.alt || ''}
                width={1200}
                height={689}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div
            ref={cardContainerRef}
            className="max-w-300 w-full flex flex-col sm:flex-row justify-between items-center gap-5 md:gap-7.5"
          >
            {props.cards?.map((card, i: number) => (
              <Card
                data-card
                key={i}
                className="bg-white border-none w-90 h-full flex justify-center items-center p-0 rounded-[0.625rem] md:rounded-[1.25rem]"
              >
                <CardContent className="flex flex-col lg:flex-row w-full h-full gap-4 md:gap-5 p-5 md:p-7.5">
                  <div className="size-8.5 md:size-10 aspect-square rounded-[0.625rem] flex justify-center items-center bg-linear-to-br from-[#102E60] to-[#BFD6FF]">
                    {card.icon?.active && (
                      <Icon
                        className="size-4 md:size-6.5"
                        name={card.icon?.icon || ''}
                      />
                    )}
                  </div>
                  <p className="text-neutral-600 leading-[1.3em] text-body-md font-medium font-inter w-full h-fit">
                    {card.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
