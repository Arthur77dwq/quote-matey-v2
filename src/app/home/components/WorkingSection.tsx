import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { WORKING, WorkingCard } from '@/types/pages';

export function WorkingSection({
  tag,
  title,
  description,
  className,
  ...props
}: WORKING) {
  const [active, setActive] = useState<WorkingCard | null>(null);

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
  }, [props.cards]);

  return (
    <section className={cn('w-full flex bg-white pb-50', className)}>
      <div className="flex w-full px-7.5 gap-17.5">
        <div className="px-4 sm:py-5 lg:pt-14.75 sm:p-0 flex flex-col items-start justify-center gap-2.5 w-1/2 h-fit">
          {tag && (
            <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
              {tag}
            </Badge>
          )}

          {title && (
            <Title
              className="text-left font-bold text-[2.125rem] sm:text-[2.75rem] lg:text-6xl!"
              {...{ title }}
            />
          )}
          {description && (
            <Description
              className="text-left text-neutral-600 font-inter"
              {...{ description }}
            />
          )}
          {props.supportingText && (
            <div className="w-55 h-fit">
              <h3 className="text-[2rem] font-semibold text-[#102E60]">
                {props.supportingText.title}
              </h3>
              <p className="text-[1rem] font-inter font-medium">
                {props.supportingText.description}
              </p>
            </div>
          )}
        </div>
        <div className="w-1/2 h-full flex">
          <Tabs
            defaultValue={props.cards && props.cards[0].id}
            onValueChange={handleChangeValue}
            value={active ? active.id : '1'}
            className="w-150 flex justify-center items-center gap-0"
          >
            <TabsList className="relative w-full h-fit flex justify-center items-end">
              <div className="absolute -bottom-2.25 bg-white w-100 h-px" />
              <div className="absolute top-0 bg-linear-to-b from-white to-white/0 w-79.5 h-full" />
              <div className="rounded-br-[1.25rem] w-10 h-full border-0 border-b border-r border-neutral-100" />
              <div className="w-79.5 flex justify-center items-center gap-2.5 p-2.5 pb-0">
                {props.cards?.map((card, i) => (
                  <TabsTrigger
                    key={i}
                    value={card.id}
                    className="shadow-none! p-0 z-2"
                  >
                    <span
                      className={cn(
                        'w-fit h-fit rounded-full px-5 py-2.5 text-sm font-medium transition-[background-position] duration-4000',
                        active?.id === card.id
                          ? 'bg-[length:200%_100%] bg-[linear-gradient(to_right,#102E60_50%,#EDF1F4_50%)] bg-left text-white'
                          : 'bg-neutral-50 text-neutral-600 bg-right',
                      )}
                    >
                      {`Step 0${i + 1}`}
                    </span>
                  </TabsTrigger>
                ))}
              </div>

              <div className="rounded-bl-[1.25rem] w-10 h-full border-0 border-b border-l border-neutral-100" />
            </TabsList>
            {props.cards?.map((card, i) => (
              <TabsContent
                key={i}
                value={card.id}
                className="w-full flex gap-5 p-1.5 border border-neutral-100 rounded-[1.875rem]"
              >
                <div className="flex flex-col justify-center items-center gap-10 p-10 bg-neutral-50 rounded-2xl w-full">
                  <div className="relative rounded-[1.875rem] w-full h-81.75 overflow-hidden">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      className="w-full object-fill"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <h3 className="text-2xl font-semibold text-[#102E60]">
                      {card.title}
                    </h3>
                    <p className="text-center text-body-md font-inter font-medium text-neutral-600">
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
