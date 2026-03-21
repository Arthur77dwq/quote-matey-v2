"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"

export function Footer() {
  const router = useRouter()
  return (
    <footer className="bg-[#050d18] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 hover:opacity-80 transition-opacity w-fit">
              <Image
                src="/images/quotematey-logo.png"
                alt="QuoteMatey"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl font-bold text-white">QuoteMatey</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              The AI-powered quoting tool that helps tradies win more jobs by quoting faster and looking more professional.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:hello@quotematey.com" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                hello@quotematey.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Free Early Access */}
          <div>
            <h4 className="font-semibold text-white mb-4">Free Early Access</h4>
            <p className="text-white/60 mb-4 text-sm leading-relaxed">
              No signup required. Test the waters with our MVP starter.
            </p>
            <button
              onClick={() => router.push('/chat')}
              className="bg-[#f57a0a] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e06d00] transition-all shadow-lg shadow-[#f57a0a]/20 hover:shadow-[#f57a0a]/30 hover:-translate-y-0.5"
            >
              Start Free
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} QuoteMatey. All rights reserved.</p>
            <p>Made with care for Aussie tradies.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
