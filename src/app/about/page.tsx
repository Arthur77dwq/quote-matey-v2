import HeroSection from '@/components/aboutPage/HeroSection';
import { SplitSection } from '@/components/aboutPage/SplitSection';
import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';

export const metadata = generateMetadata(DATA.metadata);

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <SplitSection />
    </>
  );
}
