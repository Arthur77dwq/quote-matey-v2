import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export async function FounderLetter() {
  return (
    <section className="flex justify-center items-center py-25">
      <div className="w-full lg:w-200 flex flex-col justify-center items-center">
        <div className="overflow-hidden w-90 md:w-full flex justify-between items-end">
          <span className="h-18 w-6 lg:w-10 rounded-r-3xl rounded-tr-none rounded-br-3xl border border-t-0 border-l-0 border-neutral-100" />
          <h2 className="w-full text-center text-wrap md:text-nowrap px-2 text-[2.13rem] md:text-6xl font-bold font-sans pb-5">
            How QuoteMatey <strong className="text-warning-600">started</strong>
          </h2>
          <span className="h-18 w-6 lg:w-10 rounded-l-3xl rounded-tl-none rounded-bl-3xl border border-t-0 border-r-0 border-neutral-100" />
        </div>
        <div className="w-full px-5 lg:p-0">
          <div className="font-medium font-inter text-neutral-600 text-[1.15rem] w-full rounded-2xl border border-t-0 border-neutral-100 p-1.5">
            <Card className="overflow-hidden border-none relative bg-neutral-50 gap-12.5 p-7.5">
              <CardHeader className="h-fit flex flex-col justify-center gap-0">
                <CardTitle className="text-neutral-900 text-[1.8rem]">
                  <h3>Our journey</h3>
                </CardTitle>
                <CardDescription className="text-neutral-600 text-[1.15rem] font font-medium font-inter">
                  A note from the founder
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
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
              <CardFooter className="flex flex-col items-start h-fit pr-0 gap-1">
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
}
