import Image from 'next/image';

import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section className="overflow-hidden relative flex justify-center items-center gap-2.5 w-full h-fit">
      <div className="relative z-0 flex items-center justify-center w-full h-fit">
        <Image
          src="/images/about/BackgroundSKYUNDERLAY.jpg"
          className="w-auto h-80 sm:h-120 sm:w-auto lg:w-full lg:h-full lg:max-h-130.5"
          width={0}
          height={0}
          alt="background image"
        />
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
      <div className="lg:py-0 lg:px-30 bg-linear-to-b from-white/30 via-white via-50% to-white flex items-center justify-center absolute inset-0 h-full w-full overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-2.5 w-full h-fit">
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
}
