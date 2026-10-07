import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';

const useSectionAnimation = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  useGSAP(() => {
    // Animation Here
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  });
};

export const FounderLetter = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionAnimation({
    sectionRef: sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      className="flex justify-center items-center pt-6 pb-25"
    >
      <div className="max-w-215 w-full flex flex-col justify-center items-center p-0 lg:px-7.5">
        <div className="w-[calc(100%-4rem)] lg:w-full h-fit flex justify-between items-stretch">
          <span className="self-stretch hidden lg:flex w-20 px-4 rounded-r-[1.25rem] rounded-tr-none rounded-br-3xl border border-t-0 border-l-0 border-neutral-100">
            {' '}
          </span>
          <h2 className="w-full text-center text-wrap tracking-[-1px] leading-[1.2em] text-[2.125rem] font-bold font-sans text-neutral-900 pb-[22px] lg:text-6xl lg:text-nowrap lg:p-4 lg:pb-12.5">
            How QuoteMatey <strong className="text-warning-600">started</strong>
          </h2>
          <span className="self-stretch hidden lg:flex w-20 px-4 rounded-l-[1.25rem] rounded-tl-none rounded-bl-3xl border border-t-0 border-r-0 border-neutral-100">
            {' '}
          </span>
        </div>
        <div className="w-full px-[22px] lg:px-0 lg:pb-4">
          <div className="text-[16px] lg:text-[18px] leading-[1.3em] font-medium font-inter text-slate-500 w-full rounded-[6px] border-0 border-neutral-100 p-0 lg:rounded-[24px] lg:border lg:p-[5px]">
            <Card className="overflow-hidden border-none shadow-none relative bg-neutral-50 rounded-[6px] gap-5 px-5 pt-5 pb-[100px] lg:rounded-[24px] lg:gap-[50px] lg:p-[50px]">
              <CardHeader className="h-fit flex flex-col justify-center gap-1 p-0">
                <CardTitle className="text-neutral-900">
                  <h3 className="font-sans text-[20px] lg:text-[28px] font-bold leading-[1.2em] text-neutral-900">
                    Our journey
                  </h3>
                </CardTitle>
                <CardDescription className="text-[16px] lg:text-[18px] leading-[1.3em] text-slate-500 font-medium font-inter">
                  A note from the founder
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 lg:gap-5 p-0 w-full text-[16px] lg:text-[18px] font-medium leading-[1.3em]">
                <p>Dear tradies,</p>
                <p>
                  When we started QuoteMatey, the goal was simple: make quoting
                  <br className="hidden lg:block" /> faster, easier, and less
                  stressful for tradies. Too many business
                  <br className="hidden lg:block" /> owners were wasting hours
                  writing quotes manually, chasing
                  <br className="hidden lg:block" /> paperwork, and dealing with
                  messy systems that slowed them down.
                </p>
                <p>From the beginning, we believed AI could change that.</p>
                <p>
                  Building QuoteMatey has been a journey of learning, testing,
                  and <br className="hidden lg:block" /> constantly improving
                  based on real feedback from tradies in the
                  <br className="hidden lg:block" /> field. Every feature we
                  build is focused on saving time, winning
                  <br className="hidden lg:block" /> more jobs, and helping
                  tradies run their business more efficiently.
                </p>
                <p>
                  Along the way, one thing stayed clear: software should work
                  for <br className="hidden lg:block" /> tradies, not against
                  them. Instead of overwhelming users with
                  <br className="hidden lg:block" /> complicated tools, we
                  designed QuoteMatey to turn photos, voice
                  <br className="hidden lg:block" /> notes, and job details into
                  professional quotes within minutes.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start h-fit p-0 gap-1">
                <p className="font-sans text-[20px] lg:text-[24px] font-semibold leading-[1.2em] text-neutral-900">
                  Arthur
                </p>
                <p>Founder, QuoteMatey</p>
              </CardFooter>
              <Image
                className="absolute -bottom-[120px] -right-[156px] w-[225px] h-[150px] lg:w-[385px] lg:h-[257px] rounded-full object-cover"
                src="/images/about/LawnIMAGE.avif"
                alt="garden"
                width={400}
                height={0}
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
