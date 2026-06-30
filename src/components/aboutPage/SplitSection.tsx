import { ArrowRight, Target } from 'lucide-react';

import { Boost, GraphWithSupport } from '@/constant/icons';

import { Button } from '../ui/button';

export async function SplitSection() {
  return (
    <section className="grid grid-row-2 sm:grid-cols-2 gap-12.5 px-7.5">
      <div className="flex flex-col gap-5">
        <h2 className="font-sans text-3xl text-neutral-900">Our mission</h2>
        <p className="font-inter text-neutral-600">
          Our mission is to simplify quoting and job management for tradies
          through intelligent technology. We believe running a trade business
          should be powered by fast workflows, clear communication, and smart
          tools that give tradies the confidence to quote, manage, and grow
          their business efficiently.
        </p>
        <Button className="p-1.5 relative text-[0.9rem] overflow-hidden cursor-pointer flex items-center justify-center w-fit h-fit text-white">
          <div className="z-1 absolute inset-0 bg-white/10 border border-white backdrop-blur-sm rounded-full"></div>
          <div className="shadow-elevated z-2 flex justify-between items-center gap-2.5 py-3 pl-8 pr-2 border border-neutral-900 rounded-full text-neutral-0 bg-linear-to-br from-neutral-800 to-neutral-950 w-full h-full">
            <span>Explore QuoteMatey</span>
            <div className="font-inter bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full h-8 w-8">
              <ArrowRight />
            </div>
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-sans text-3xl text-neutral-900">Our values</h2>
        <p className="flex justify-between gap-4 w-full font-inter text-neutral-600">
          <span className="p-3 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <Target className="w-5 h-5" />
          </span>
          Built for Tradies Everything we create is designed to save time,
          reduce stress, and make day-to-day work easier for real tradies.
        </p>
        <p className="flex justify-between gap-4 w-full font-inter text-neutral-600">
          <span className="p-3 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <GraphWithSupport className="w-5 h-5" />
          </span>
          Simple Wins We believe powerful software should feel easy to use. No
          complicated systems just tools that help you get the job done faster.
        </p>
        <p className="flex justify-between gap-4 w-full font-inter text-neutral-600">
          <span className="p-3 w-fit h-fit flex items-center justify-center bg-neutral-50 rounded-md">
            <Boost className="w-5 h-5" />
          </span>
          Constant Innovation We move fast, improve constantly, and use AI to
          build smarter ways for tradies to quote, manage jobs, and grow their
          business.
        </p>
      </div>
    </section>
  );
}
