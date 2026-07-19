import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { AnimatedRef } from '@/types/global';
import { HERO } from '@/types/pages';

import { SectionHeader } from './section-header';

const useSectionAnimation = ({
  sectionRef,
  ref,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  ref: React.ForwardedRef<AnimatedRef>;
}) => {
  const tl = useRef(gsap.timeline());

  useImperativeHandle(ref, () => ({
    timeline: tl.current,
  }));

  useGSAP(() => {
    // Animation Here
    tl.current.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      { opacity: 1, y: 0, duration: 1 },
    );
  });
};

export const HeroSection = forwardRef<AnimatedRef, HERO>(
  ({ visible, tag, title, description, BGImage, children, className }, ref) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    useSectionAnimation({ sectionRef, ref });

    return (
      visible && (
        <section
          className={cn(
            'relative flex flex-col justify-center items-center gap-2.5 w-full pb-15 pt-32 sm:pb-20 sm:pt-39.5 lg:pb-25 lg:pt-48.5',
            className,
          )}
        >
          <div className={'absolute inset-0 flex items-center justify-center'}>
            <div className="w-full h-full">
              <Image
                src={BGImage?.src || ''}
                alt="Background"
                fill
                className="object-crop"
                priority
              />
            </div>
            <Image
              src="/images/about/cloudRight.png"
              className="w-140 h-87 absolute -top-20 right-0"
              width={0}
              height={0}
              alt=""
            />
            <Image
              src="/images/about/cloudLeft.png"
              className="w-140 h-87 absolute top-10 left-0"
              width={0}
              height={0}
              alt=""
            />
          </div>
          <div
            className={
              'absolute inset-0 h-full w-full flex items-end justify-center bg-linear-to-b from-white/30 via-white via-41% to-white overflow-hidden'
            }
          />
          <div
            ref={sectionRef}
            className="px-4 sm:p-0 opacity-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit"
          >
            {tag && (
              <Badge className="rounded-full py-2.5 px-5 bg-white text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
                {tag}
              </Badge>
            )}
            {(title || description) && (
              <SectionHeader {...{ title, description }} />
            )}
          </div>
          {children}
        </section>
      )
    );
  },
);
