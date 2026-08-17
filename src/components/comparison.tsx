import { SplitText } from 'gsap/SplitText';
import Image from 'next/image';
import React, { useLayoutEffect, useRef } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { Comparison } from '@/types/pages';

import { Icon } from './icon';
import { Description, Title } from './section-header';
import { Card, CardContent } from './ui/card';

export function ComparisonCard({
  comparison,
  className,
  active,
  setActive,
}: {
  className?: string;
  comparison: Comparison[];
  active: string;
  setActive: (x: string) => void;
}) {
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mid = Math.floor(comparison.length / 2);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    const frame = requestAnimationFrame(() => {
      const element = contentRefs.current[active];
      if (!element) return;

      const title = element.querySelector<HTMLElement>('[data-tab-title]');
      const description = element.querySelector<HTMLElement>(
        '[data-tab-description]',
      );
      const cards = element.querySelectorAll<HTMLElement>('[data-tab-card]');

      const titleChars = SplitText.create(title, {
        type: 'words',
        tag: 'span',
      });

      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.killTweensOf(titleChars.words);

        tl.set(titleChars.words, {
          clearProps: 'all',
        });

        tl.fromTo(
          titleChars.words,
          {
            x: 40,
            opacity: 0,
            duration: 0.3,
            ease: 'power4.out',
            stagger: 0.08,
          },
          {
            x: 0,
            opacity: 1,
          },
        );

        tl.from(
          titleChars.words,
          {
            marginRight: '-10px',
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '0',
        );

        tl.from(
          description,
          {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
          },
          '-=0.5',
        );

        tl.from(
          cards,
          {
            y: 10,
            opacity: 0,
            duration: 0.3,
            stagger: 0.2,
          },
          '-=0.2',
        );
      }, element);
    });

    return () => {
      cancelAnimationFrame(frame);
      ctx?.revert();
    };
  }, [active]);

  return (
    <Tabs
      onValueChange={(value) => setActive(value)}
      value={active}
      defaultValue={comparison[0].id}
      className={cn(
        'flex flex-col justify-center items-center gap-0 h-fit shadow-none border-none',
        className,
      )}
    >
      <TabsList className="relative sm:w-162.5 sm:h-22.5 flex gap-5 p-0">
        <div className="absolute bg-white w-35.5 sm:w-51 h-0.5 -bottom-0.5" />
        <div className="absolute bg-linear-to-b from-white to-white/0 w-1/2 h-1/2 top-0" />

        {comparison.map((each, index: number) => {
          return (
            <React.Fragment key={index}>
              <TabsTrigger
                className={cn(
                  'border-0 border-neutral-100 shadow-none! pb-5 rounded-none h-full flex justify-center items-end',
                  each.type === 'SAFE' && 'border-l rounded-bl-[1.25rem] pr-5',
                  each.type === 'DANGER' &&
                    'border-r rounded-br-[1.25rem] pl-5',
                  'border-0 border-neutral-100 shadow-none! pb-5 rounded-none h-full flex justify-center items-end',
                  each.type === 'SAFE' && 'border-l rounded-bl-[1.25rem] pr-5',
                  each.type === 'DANGER' &&
                    'border-r rounded-br-[1.25rem] pl-5',
                )}
                value={each.id}
                disabled={each.id !== active}
              >
                {each.head && (
                  <Description
                    className={cn(
                      'h-full flex items-end text-neutral-900 leading-0! text-[.6rem] sm:text-[1rem]! font-inter font-medium!',
                      each.type === 'DANGER' && 'justify-end',
                      each.type === 'SAFE' && 'justify-start',
                    )}
                    description={each.head}
                  />
                )}
              </TabsTrigger>
              {mid - 1 === index && (
                <div className="w-fit h-full z-1">
                  <Image
                    src={
                      active === '1'
                        ? '/images/dialOpen.png'
                        : '/images/dialClose.png'
                    }
                    alt=""
                    width={130}
                    height={50}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </TabsList>
      {comparison.map((each, index: number) => {
        return (
          <TabsContent
            ref={(element) => {
              contentRefs.current[each.id] = element;
            }}
            key={index}
            value={each.id}
            className="flex justify-center w-full h-full p-1.5 gap-5 rounded-[1.875rem] border border-neutral-100"
          >
            <div
              className={cn(
                'flex flex-col sm:flex-row justify-center w-full h-full gap-7.5 p-7.5 pt-22.5 rounded-2xl',
                each.type === 'DANGER' && 'bg-neutral-50',
                each.type === 'SAFE' &&
                  'bg-linear-to-b from-[#102E60] via-60% via-[#102E60] to-black/80',
              )}
            >
              <div className="w-full sm:w-6/10 flex flex-col justify-start items-start h-full gap-5">
                {each.title && (
                  <div data-tab-title className="w-full">
                    <Title
                      className={cn(
                        'text-left leading-10 text-[2rem]! w-full ',
                        each.type === 'SAFE' && 'text-white',
                      )}
                      title={each.title}
                    />
                  </div>
                )}
                <div className="flex w-full" data-tab-description>
                  {each.icon?.active && (
                    <Icon
                      style={{ color: each.icon.color }}
                      name={each.icon.icon || ''}
                    />
                  )}
                  {each.description && (
                    <Description
                      className={cn(
                        'text-left font-inter',
                        'text-left font-inter',
                        each.type === 'DANGER' && 'text-neutral-600',
                        each.type === 'SAFE' && 'text-neutral-300',
                      )}
                      description={each.description}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-7.5 w-full sm:w-3/10">
                {each.content?.map(
                  (data, i) =>
                    data.type === 'STATS' &&
                    data.data.map((stat, z) => (
                      <Card
                        data-tab-card
                        key={`${i}+${z}`}
                        className={cn(
                          'w-60 p-0  border',
                          each.type === 'DANGER' &&
                            'border-[#FF0D0D]/30 bg-[#FF0D0D]/5',
                          each.type === 'SAFE' &&
                            'border-[#10B981]/30 bg-[#10B981]/10',
                        )}
                      >
                        <CardContent className="flex flex-col gap-1.5 p-5">
                          <div
                            className={cn(
                              'w-full text-heading-5! font-semibold leading-[1.2em]',
                              each.type === 'SAFE' && 'text-white',
                              each.type === 'DANGER' && 'text-neutral-900',
                            )}
                          >
                            {stat.stat}
                          </div>
                          <div
                            className={cn(
                              'w-full text-[1rem] font-inter font-medium leading-[1.3em]',
                              each.type === 'SAFE' && 'text-neutral-100/70',
                              each.type === 'DANGER' && 'text-neutral-600',
                            )}
                          >
                            {stat.text}
                          </div>
                        </CardContent>
                      </Card>
                    )),
                )}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
