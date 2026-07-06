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
      className="flex justify-center items-center py-25"
    >
      <div className="max-w-215 w-full flex flex-col justify-center items-center p-0 lg:px-7.5 gap-2.5">
        <div className="w-90 md:w-full h-fit flex justify-between items-stretch">
          <span className="self-stretch hidden sm:flex w-6 lg:w-20 lg:px-4 rounded-r-[1.25rem] rounded-tr-none rounded-br-3xl border border-t-0 border-l-0 border-neutral-100">
            {' '}
          </span>
          <h2 className="w-full text-center text-wrap md:text-nowrap px-2 tracking-[-1px] leading-[1.2em] text-[2.13rem] md:text-6xl font-bold font-sans p-4 pb-12.5">
            How QuoteMatey <strong className="text-warning-600">started</strong>
          </h2>
          <span className="self-stretch hidden sm:flex w-6 lg:w-20 lg:px-4 rounded-l-[1.25rem] rounded-tl-none rounded-bl-3xl border border-t-0 border-r-0 border-neutral-100">
            {' '}
          </span>
        </div>
        <div className="w-full px-4 sm:px-5 lg:p-4">
          <div className="font-medium font-inter text-neutral-600 text-body-md w-full rounded-2xl border sm:border-t-0 border-neutral-100 p-1.5">
            <Card className="overflow-hidden border-none relative bg-neutral-50 gap-5 sm:gap-12.5 p-5 sm:p-7.5">
              <CardHeader className="h-fit flex flex-col justify-center gap-0 p-0">
                <CardTitle className="text-neutral-900 text-heading-5">
                  <h3>Our journey</h3>
                </CardTitle>
                <CardDescription className="text-neutral-600 text-body-md font font-medium font-inter">
                  A note from the founder
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2.5 sm:gap-6 p-0 sm:w-8/10">
                <p>Dear tradies,</p>
                <p>
                  When we started QuoteMatey, the goal was simple: make quoting
                  faster, easier, and less stressful for tradies. Too many
                  business owners were wasting hours writing quotes manually,
                  chasing paperwork, and dealing with messy systems that slowed
                  them down.
                </p>
                <p>From the beginning, we believed AI could change that.</p>
                <p>
                  Building QuoteMatey has been a journey of learning, testing,
                  and constantly improving based on real feedback from tradies
                  in the field. Every feature we build is focused on saving
                  time, winning more jobs, and helping tradies run their
                  business more efficiently.
                </p>
                <p>
                  Along the way, one thing stayed clear: software should work
                  for tradies, not against them. Instead of overwhelming users
                  with complicated tools, we designed QuoteMatey to turn photos,
                  voice notes, and job details into professional quotes within
                  minutes.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start h-fit p-0 gap-1">
                <p className="font-semibold text-2xl text-neutral-900">
                  Arthur
                </p>
                <p>Founder, QuoteMatey</p>
              </CardFooter>
              <Image
                className="absolute -bottom-42 -right-55 lg:-bottom-30 lg:-right-40 rounded-tl-[160]"
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
