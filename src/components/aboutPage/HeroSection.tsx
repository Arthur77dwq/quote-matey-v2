import Image from 'next/image';

import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
  return (
    <section className="relative flex justify-center items-center gap-2.5 w-full h-fit overflow-hidden">
      <div className="relative z-0 flex items-center justify-center w-full h-fit overflow-hidden">
        <Image
          src="/images/about/BackgroundSKYUNDERLAY.jpg"
          className="w-full max-h-130.5"
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
      <div className="px-30 bg-linear-to-b from-white/30 via-white via-50% to-white flex items-center justify-center absolute inset-0 h-full w-full overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-2.5 w-full h-fit">
          <Badge className="rounded-full py-2.5 px-5 bg-white text-body-xs text-neutral-900 flex items-center justify center border border-neutral-100">
            About QuoteMatey
          </Badge>
          <h1 className="w-full text-[4.68rem] font-bold tracking-tighter line-[1.2em] text-center">
            AI-Powered Quoting Software{' '}
            <strong className="text-warning-600">Built for Tradies</strong>
          </h1>
        </div>
      </div>
    </section>
  );
}
