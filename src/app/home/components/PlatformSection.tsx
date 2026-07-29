import Image from 'next/image';

import { Icon } from '@/components/icon';
import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PLATFORM } from '@/types/pages';

export function PlatformSection({
  tag,
  title,
  description,
  className,
  ...props
}: PLATFORM) {
  return (
    <section className={cn('relative w-full h-382.75', className)}>
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7.5 px-4 sm:px-7.5">
        <div className="px-4 sm:py-5 sm:p-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit">
          {tag && (
            <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
              {tag}
            </Badge>
          )}

          {title && (
            <Title
              className="text-white text-[2.125rem] sm:text-[2.75rem] lg:text-6xl!"
              {...{ title }}
            />
          )}
          {description && (
            <Description
              className="text-[#F0F0F0] font-inter"
              {...{ description }}
            />
          )}
        </div>
        <div className="relative w-full aspect-3840/2333 rounded-[0.875rem] overflow-hidden">
          <Image
            src={props.FGImage?.src || ''}
            alt={props.FGImage?.alt || ''}
            fill
            className="w-full aspect-3840/2333 object-cover"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6">
          {props.cards?.map((card, i: number) => (
            <Card
              key={i}
              className="bg-white border-none w-90 h-full flex justify-center items-center p-0"
            >
              <CardContent className="flex flex-col lg:flex-row w-full h-full gap-4 sm:gap-5 p-5 sm:p-7.5">
                <div className="size-10 aspect-square rounded-[0.625rem] flex justify-center items-center bg-linear-to-br from-[#102E60] to-[#BFD6FF]">
                  {card.icon?.active && <Icon name={card.icon?.icon || ''} />}
                </div>
                <p className="text-neutral-600 leading-[1.3em] text-body-md font-medium font-inter w-full h-fit">
                  {card.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
