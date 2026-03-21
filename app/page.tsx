import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SocialProofBar } from "@/components/social-proof-bar"
import { HowItWorks } from "@/components/how-it-works"
import { VideoSection } from "@/components/video-section"
import { BeforeAfter } from "@/components/before-after"
import { Benefits } from "@/components/benefits"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { FAQ } from "@/components/faq"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
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
  )
}
