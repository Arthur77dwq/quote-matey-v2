import { useGSAP } from '@gsap/react';
import { ArrowRight, Target } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Boost, GraphWithSupport } from '@/constant/icons';
import { gsap } from '@/lib/animations/plugins';
import { AnimatedRef } from '@/types/global';

const useSectionAnimation = ({
  sectionsRef,
  ref,
}: {
  sectionsRef: React.RefObject<HTMLDivElement | null>[];
  ref: React.ForwardedRef<AnimatedRef>;
}) => {
  const tl = useRef(gsap.timeline());
  useGSAP(() => {
    // Animation Here
    tl.current.fromTo(
      sectionsRef.map((ref) => ref.current),
      {
        opacity: 0,
        y: 50,
      },
      { opacity: 1, y: 0, stagger: 0.2 },
    );
  });

  useImperativeHandle(ref, () => ({
    timeline: tl.current,
  }));
};

export const SplitSection = forwardRef<AnimatedRef>((props, ref) => {
  const sectionLeftRef = useRef<HTMLDivElement | null>(null);
  const sectionRightRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ sectionsRef: [sectionLeftRef, sectionRightRef], ref });

  return (
    <section className="grid grid-row-2 sm:grid-cols-2 gap-12.5 p-4 sm:px-7.5">
      <div
        ref={sectionLeftRef}
        className="opacity-0 flex flex-col gap-2.5 sm:gap-5"
      >
        <h2 className="font-sans font-semibold text-[2rem] text-neutral-900">
          Our mission
        </h2>
        <p className="text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600">
          Our mission is to simplify quoting and job management for tradies
          through intelligent technology. We believe running a trade business
          should be powered by fast workflows, clear communication, and smart
          tools that give tradies the confidence to quote, manage, and grow
          their business efficiently.
        </p>
        <Button className="p-1.5 relative overflow-hidden cursor-pointer flex items-center justify-center w-fit h-fit text-body-md font-inter font-semibold text-white">
          <div className="z-1 absolute inset-0 bg-white/10 border border-white backdrop-blur-sm rounded-full"></div>
          <div className="shadow-elevated z-2 flex justify-between items-center gap-2.5 py-3 pl-8 pr-2 border border-neutral-900 rounded-full text-neutral-0 bg-linear-to-br from-neutral-800 to-neutral-950 w-full h-full">
            <span>Explore QuoteMatey</span>
            <div className="font-inter bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full h-8 w-8">
              <ArrowRight />
            </div>
          </div>
        </Button>
      </div>
      <div
        ref={sectionRightRef}
        className="opacity-0 flex flex-col gap-2.5 sm:gap-5"
      >
        <h2 className="font-sans font-semibold text-[2rem] text-neutral-900">
          Our values
        </h2>
        <p className="flex justify-between gap-4 w-full text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600">
          <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <Target className="w-5 h-5" />
          </span>
          Built for Tradies Everything we create is designed to save time,
          reduce stress, and make day-to-day work easier for real tradies.
        </p>
        <p className="flex justify-between gap-4 w-full text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600">
          <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <GraphWithSupport className="w-5 h-5" />
          </span>
          Simple Wins We believe powerful software should feel easy to use. No
          complicated systems just tools that help you get the job done faster.
        </p>
        <p className="flex justify-between gap-4 w-full text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600">
          <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <Boost className="w-5 h-5" />
          </span>
          Constant Innovation We move fast, improve constantly, and use AI to
          build smarter ways for tradies to quote, manage jobs, and grow their
          business.
        </p>
      </div>
    </section>
  );
});
