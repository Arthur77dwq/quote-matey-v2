import { useGSAP } from '@gsap/react';
import { Target } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/button';
import { Boost, GraphWithSupport } from '@/constant/icons';
import { gsap } from '@/lib/animations/plugins';

const useSectionAnimation = (
  sectionsRef: React.RefObject<HTMLDivElement | null>[],
) => {
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
};

export function SplitSection() {
  const sectionLeftRef = useRef<HTMLDivElement | null>(null);
  const sectionRightRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation([sectionLeftRef, sectionRightRef]);

  return (
    <section className="w-full h-fit flex justify-center items-start p-4 gap-2.5 sm:px-7.5">
      <div className="grid grid-row-2 sm:grid-cols-2 gap-12.5">
        <div
          ref={sectionLeftRef}
          className="opacity-0 flex flex-col gap-5 sm:gap-5 h-fit max-w-120 w-fit"
        >
          <h2 className="font-sans font-semibold text-[2rem] text-neutral-900">
            Our mission
          </h2>
          <p className="text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600 text-balance w-fit">
            Our mission is to simplify quoting and job management for tradies
            through intelligent technology. We believe running a trade business
            should be powered by fast workflows, clear communication, and smart
            tools that give tradies the confidence to quote, manage, and grow
            their business efficiently.
          </p>

          <Button variant="secondary-dark" className="w-fit">
            Explore QuoteMatey
          </Button>
        </div>
        <div
          ref={sectionRightRef}
          className="opacity-0 flex flex-col gap-5 h-fit max-w-140 w-fit"
        >
          <h2 className="font-sans font-semibold text-[2rem] text-neutral-900">
            Our values
          </h2>
          <p className="flex justify-between gap-4 text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600 text-balance">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <Target className="w-5 h-5" />
            </span>
            Built for Tradies Everything we create is designed to save time,
            reduce stress, and make day-to-day work easier for real tradies.
          </p>
          <p className="flex justify-between gap-4 text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600 text-balance">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <GraphWithSupport className="w-5 h-5" />
            </span>
            Simple Wins We believe powerful software should feel easy to use. No
            complicated systems just tools that help you get the job done
            faster.
          </p>
          <p className="flex justify-between gap-4 text-body-md font-inter font-medium leading-[1.3em] tracking-0 text-neutral-600 text-balance">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <Boost className="w-5 h-5" />
            </span>
            Constant Innovation We move fast, improve constantly, and use AI to
            build smarter ways for tradies to quote, manage jobs, and grow their
            business.
          </p>
        </div>
      </div>
    </section>
  );
}
