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
import { LANDINGHERO, PRODUCT, Section } from '@/types/pages';

import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';

export default function Home({ sections }: { sections: Section[] }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthScreen />
      </Suspense>
      <HeroSection {...(sections[0] as LANDINGHERO)} />
      <ProductSection {...(sections[1] as PRODUCT)} />
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
