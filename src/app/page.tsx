import { AuthScreen } from '@/components/auth-screen';
import { BeforeAfter } from '@/components/before-after';
import { Benefits } from '@/components/benefits';
import { CTASection } from '@/components/cta-section';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { HowItWorks } from '@/components/how-it-works';
import { Navbar } from '@/components/navbar';
import { Pricing } from '@/components/pricing';
import { SocialProofBar } from '@/components/social-proof-bar';
import { Testimonials } from '@/components/testimonials';
import { VideoSection } from '@/components/video-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AuthScreen />
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <HowItWorks />
      <VideoSection />
      <BeforeAfter />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
