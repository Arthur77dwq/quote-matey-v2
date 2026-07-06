import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { gsap } from '@/lib/animations/plugins';
import { AnimatedRef } from '@/types/global';

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

export const HeroSection = forwardRef<AnimatedRef>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionRef, ref });

  return (
    <section className="relative flex justify-center items-center gap-2.5 w-full h-fit">
      <div className="relative flex items-center justify-center w-full h-100 lg:h-150">
        <div className="w-full h-80 sm:h-120 lg:h-150">
          <Image
            src="/images/about/BackgroundSKYUNDERLAY.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Image
          src="/images/about/cloud1.png"
          className="w-140 h-87 absolute -top-20 right-0"
          width={0}
          height={0}
          alt="cloud1"
        />
        <Image
          src="/images/about/cloud2.png"
          className="w-140 h-87 absolute top-10 left-0"
          width={0}
          height={0}
          alt="cloud2"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-white/30 via-white via-41% to-white overflow-hidden">
        <div
          ref={sectionRef}
          className="opacity-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit"
        >
          <Badge className="rounded-full py-2.5 px-5 bg-white text-body-xs text-neutral-900 flex items-center justify center border border-neutral-100">
            About QuoteMatey
          </Badge>
          <h1 className="flex flex-col max-w-240 text-3xl sm:text-[3.98rem] lg:text-[4.68rem] font-bold tracking-tighter line-[1.2em] text-center">
            <span className="text-nowrap">AI-Powered Quoting </span>
            <span className="text-nowrap">
              Software{' '}
              <strong className="font-sans font-bold text-warning-600">
                Built for Tradies
              </strong>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
});
