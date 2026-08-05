'use client';
import { Suspense } from 'react';

import { AuthScreen } from '@/components/auth-screen';
// import { BeforeAfter } from '@/components/before-after';
// import { Benefits } from '@/components/benefits';
// import { CTASection } from '@/components/cta-section';
// import { FAQ } from '@/components/faq';
// import { HowItWorks } from '@/components/how-it-works';
// import { SocialProofBar } from '@/components/social-proof-bar';
// import { Testimonials } from '@/components/testimonials';
// import { VideoSection } from '@/components/video-section';
import {
  LANDINGHERO,
  PLATFORM,
  PRODUCT,
  Section,
  VIDEODEMO,
  WORKING,
} from '@/types/pages';

import { HeroSection } from './components/HeroSection';
import { PlatformSection } from './components/PlatformSection';
import { ProductSection } from './components/ProductSection';
import { VideoDemoSection } from './components/VideoDemoSection';
import { WorkingSection } from './components/WorkingSection';

export default function Home({ sections }: { sections: Section[] }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthScreen />
      </Suspense>
      <HeroSection {...(sections[0] as LANDINGHERO)} />
      <ProductSection {...(sections[1] as PRODUCT)} />
      <VideoDemoSection
        className="w-full h-fit"
        {...(sections[2] as VIDEODEMO)}
      />
      <PlatformSection {...(sections[3] as PLATFORM)} />
      <WorkingSection {...(sections[4] as WORKING)} />
      {/* <SocialProofBar /> */}
      {/* <HowItWorks /> */}
      {/* <VideoSection /> */}
      {/* <BeforeAfter />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTASection /> */}
    </>
  );
}
