import Image from 'next/image';

import { cn } from '@/lib/utils';
import { AUTHINFO } from '@/types/pages';

import { Achievement } from './achievement';
import { Chip } from './chip';

export function AuthHeroSection({
  topCard,
  bottom,
  achievement,
  className,
  ...props
}: AUTHINFO & { className?: string }) {
  return (
    <div className={cn('relative w-3/5 h-full overflow-hidden', className)}>
      <div className="w-full h-full bg-white/30" />
      <div className="absolute top-2/6 -left-20  bg-[#102E60] blur-3xl rounded-full size-60" />
      <div className="absolute top-0 right-0  bg-[#FF7B00] blur-3xl rounded-full size-40" />

      <div className="absolute inset-0 z-10 py-10 flex justify-center items-center">
        <div className="h-full flex flex-col-reverse lg:flex-col items-center justify-between gap-5 px-10">
          {topCard && <Chip {...topCard} />}

          {props.image && props.image.src && (
            <div className="opacity-0 lg:opacity-100 aspect-162.25/98.5 shadow-md w-auto h-auto flex justify-center items-center rounded-xl overflow-hidden">
              <Image
                src={props.image.src}
                alt={props.image.alt}
                width={649}
                height={394}
                className="w-full h-full"
              />
            </div>
          )}

          <div className="flex justify-center items-center gap-6 w-full h-35">
            {bottom.map((card, i) => (
              <Chip key={i} {...card} />
            ))}
          </div>

          <Achievement {...achievement} />
        </div>
      </div>
    </div>
  );
}
