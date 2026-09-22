import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { WORKING, WorkingCard } from '@/types/pages';

function useSectionAnimation({
  cardContainerRef,
  sectionRef,
}: {
  cardContainerRef: RefObject<HTMLDivElement | null>;
  sectionRef: RefObject<HTMLDivElement | null>;
}) {
  useGSAP(() => {
    gsap.from(cardContainerRef.current, {
      opacity: 0,
      y: 50,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    });
  });
}

export function WorkingSection({
  tag,
  title,
  description,
  className,
  ...props
}: WORKING) {
  const [active, setActive] = useState<WorkingCard | null>(props.cards[0]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Record<string, HTMLDivElement>>({});
  const cardsTitleRef = useRef<Record<string, HTMLHeadingElement>>({});
  const cardsDescriptionRef = useRef<Record<string, HTMLParagraphElement>>({});
  const imagesRef = useRef<Record<string, HTMLDivElement>>({});
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  useSectionAnimation({ sectionRef, cardContainerRef });

  const handleChangeValue = (value: string) => {
    if (value !== active?.id) {
      const selected = props.cards?.filter((val) => val.id === value)[0];
      if (selected) setActive(selected);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        if (props.cards) {
          let currentIndex = 0;
          if (prev) {
            currentIndex = props.cards?.indexOf(prev);
          }
          const next = (currentIndex + 1) % props.cards.length;
          return props.cards[next];
        }
        return null;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [props.cards, active]);

  useLayoutEffect(() => {
    let ctx: gsap.Context | undefined;

    const frame = requestAnimationFrame(() => {
      const card = cardsRef.current[active ? active.id : 0];
      const cardTitle = cardsTitleRef.current[active ? active.id : 0];
      const cardDescription =
        cardsDescriptionRef.current[active ? active.id : 0];
      const image = imagesRef.current[active ? active.id : 0];

      ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(image, {
          opacity: 0,
          y: 50,
        });

        tl.from(cardTitle, {
          opacity: 0,
          y: 50,
        });

        tl.from(
          cardDescription,
          {
            opacity: 0,
            y: 50,
          },
          '-=0.3',
        );
      }, card);
    });

    return () => {
      cancelAnimationFrame(frame);
      ctx?.revert();
    };
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full flex justify-center items-center bg-white md:pb-30 lg:pb-50',
        className,
      )}
    >
      <div className="flex flex-col items-start justify-center sm:flex-row w-full px-7.5 gap-17.5">
        <div className="px-4 sm:py-5 lg:pt-14.75 sm:p-0 flex flex-col items-start justify-start gap-17.5 w-full md:w-2/3 lg:w-1/3 h-fit">
          <div className="flex flex-col gap-2.5">
            {tag && (
              <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
                {tag}
              </Badge>
            )}

            {title && (
              <Title
                className="w-5/6 text-left font-bold text-[2.125rem] md:text-[2.75rem] lg:text-6xl! leading-[1.2em]"
                {...{ title }}
              />
            )}
            {description && (
              <Description
                className="md:w-[80%] lg:w-full text-left text-neutral-600 font-inter font-medium"
                {...{ description }}
              />
            )}
          </div>

          {props.supportingText && (
            <div className="w-55 h-fit">
              <h3 className="text-[2rem] font-semibold text-[#102E60]">
                {props.supportingText.title}
              </h3>
              <Description
                className="text-[1rem] font-inter font-medium text-left"
                {...{ description: props.supportingText.description }}
              />
            </div>
          )}
        </div>
        <div
          ref={cardContainerRef}
          className="w-full md:w-90 lg:w-fit h-full flex justify-end"
        >
          <Tabs
            defaultValue={props.cards && props.cards[0].id}
            onValueChange={handleChangeValue}
            value={active ? active.id : '1'}
            className="w-150 flex justify-center items-center gap-2.5 lg:gap-0"
          >
            <TabsList className="relative w-full h-fit flex justify-center items-end p-0">
              <div className="hidden lg:block absolute -bottom-px bg-white w-100 h-px" />
              <div className="hidden lg:block absolute top-0 bg-linear-to-b from-white to-white/0 w-79.5 h-full" />
              <div className="hidden lg:block rounded-br-[1.25rem] w-10 h-full border-0 border-b border-r border-neutral-100" />
              <div className="w-fit lg:w-79.5 h-fit flex justify-center items-center gap-2.5 px-2.5">
                {props.cards?.map((card, i) => (
                  <TabsTrigger
                    key={i}
                    value={card.id}
                    className="shadow-none! p-0 z-2"
                  >
                    <span
                      className={cn(
                        'w-fit h-fit rounded-full px-3 lg:px-5 py-1.5 lg:py-2.5 text-sm font-medium transition-[background-position] duration-4000',
                        active?.id === card.id
                          ? 'bg-size-[200%_100%] bg-[linear-gradient(to_right,#102E60_50%,#EDF1F4_50%)] bg-left text-white'
                          : 'bg-neutral-50 text-neutral-600 bg-right',
                      )}
                    >
                      {`Step 0${i + 1}`}
                    </span>
                  </TabsTrigger>
                ))}
              </div>

              <div className="hidden lg:block rounded-bl-[1.25rem] w-10 h-full border-0 border-b border-l border-neutral-100" />
            </TabsList>
            {props.cards?.map((card, i) => (
              <TabsContent
                key={i}
                value={card.id}
                className="w-full flex gap-5 p-1.5 border border-neutral-100 md:rounded-[0.625rem] lg:rounded-[1.875rem] overflow-hidden"
              >
                <div
                  ref={(element: HTMLDivElement) => {
                    cardsRef.current[card.id] = element;
                  }}
                  className="flex flex-col justify-center items-center md:gap-5 lg:gap-10 p-5 lg:p-10 bg-neutral-50 md:rounded-[0.375rem] lg:rounded-2xl w-full"
                >
                  <div
                    ref={(element: HTMLDivElement) => {
                      imagesRef.current[card.id] = element;
                    }}
                    className="relative rounded-[1.875rem] w-full h-49.5 lg:h-81.75 overflow-hidden"
                  >
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      className="w-full object-fill"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <h3
                      ref={(e: HTMLHeadingElement) => {
                        cardsTitleRef.current[card.id] = e;
                      }}
                      className="text-center text-2xl font-semibold text-[#102E60]"
                    >
                      {card.title}
                    </h3>
                    <p
                      ref={(e: HTMLParagraphElement) => {
                        cardsDescriptionRef.current[card.id] = e;
                      }}
                      className="w-full text-balance text-center text-body-md font-inter font-medium text-neutral-600"
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
