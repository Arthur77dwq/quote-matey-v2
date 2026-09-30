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
      <div className="grid grid-row-2 gap-12.5 sm:grid-cols-2 lg:w-full lg:max-w-[74.7rem] lg:grid-cols-[35rem_1fr] lg:gap-x-[3.5rem]">
        <div
          ref={sectionLeftRef}
          className="opacity-0 flex flex-col gap-5 sm:gap-5 h-fit max-w-120 w-fit lg:max-w-[35rem]"
        >
          <h2 className="font-sans font-semibold text-[2rem] text-neutral-900">
            Our mission
          </h2>
          <p className="w-fit text-[18px] font-sans font-semibold leading-[1.3em] tracking-0 text-neutral-600 lg:w-full">
            Our mission is to simplify quoting and job management for
            <br className="hidden lg:block" /> tradies through intelligent
            technology. We believe running a <br className="hidden lg:block" />
            trade business should be powered by fast workflows, clear
            <br className="hidden lg:block" /> communication, and smart tools
            that give tradies the confidence <br className="hidden lg:block" />
            to quote, manage, and grow their business efficiently.
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
          <p className="flex items-start gap-4 text-[18px] font-sans font-semibold leading-[1.3em] tracking-0 text-neutral-600">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <Target className="w-5 h-5" />
            </span>
            <span className="flex-1">
              Built for Tradies Everything we create is
              <br className="hidden lg:block" /> designed to save time, reduce
              stress, and <br className="hidden lg:block" /> make day-to-day
              work easier for real tradies.
            </span>
          </p>
          <p className="flex items-start gap-4 text-[18px] font-sans font-semibold leading-[1.3em] tracking-0 text-neutral-600">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <GraphWithSupport className="w-5 h-5" />
            </span>
            <span className="flex-1">
              Simple Wins We believe powerful software
              <br className="hidden lg:block" /> should feel easy to use. No
              complicated systems <br className="hidden lg:block" /> just tools
              that help you get the job done faster.
            </span>
          </p>
          <p className="flex items-start gap-4 text-[18px] font-sans font-semibold leading-[1.3em] tracking-0 text-neutral-600">
            <span className="p-2.5 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
              <Boost className="w-5 h-5" />
            </span>
            <span className="flex-1">
              Constant Innovation We move fast, improve constantly,
              <br className="hidden lg:block" /> and use AI to build smarter
              ways for tradies to quote, <br className="hidden lg:block" />
              manage jobs, and grow their business.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
