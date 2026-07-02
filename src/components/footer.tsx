'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative w-full h-[120vh] sm:h-screen overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0">
        <Image
          src="/images/FooterIMG.png"
          className="object-cover object-top-center"
          fill
          alt=""
        />
        <div className="absolute inset-0 z-2 bg-linear-to-b from-neutral-0 via-neutral-0/30 via-20% to-transparent" />
      </div>
      <div className="z-3 w-full max-w-315 h-full md:h-fit lg:h-104.25 flex justify-center items-center px-4 sm:px-7.5 gap-12.5 lg:gap-2.5">
        <div className="w-full h-fit md:h-full bg-neutral-0 flex flex-col lg:flex-row flex-start gap-12.5 md:gap-15 p-5 sm:p-7.5 lg:p-25 rounded-[1rem] md:rounded-4xl">
          <div className="h-fit md:h-full w-full sm:w-7/10 lg:w-4/10 gap-5 sm:gap-10 flex flex-col justify-between">
            {/* Left */}
            <div className="flex flex-col gap-2 md:gap-5 w-full">
              <Image
                src="/quotematey-hor-with-out-subtitle.png"
                alt=""
                height={40}
                width={195}
              />
              <p className="text-[#595269] font-medium w-8/10 sm:w-full">
                The AI-powered quoting tool that helps tradies win more jobs by
                quoting faster and looking more professional.
              </p>
            </div>

            <Link
              href="mailto:support@quotematey.com"
              className="transition-colors ease-in-out hover:bg-neutral-100 bg-neutral-900 hover:text-neutral-900 text-neutral-0 px-6.5 py-3.5 w-fit rounded-4xl font-inter font-semibold text-body-md"
            >
              support@quotematey.com
            </Link>
          </div>
          <div className="w-full lg:w-auto h-fit md:h-full flex flex-col md:flex-row gap-10 md:gap-45 lg:gap-7.5">
            {/* Right */}
            <div className="flex flex-col items-start gap-4 sm:gap-5">
              <p className="font-inter font-medium text-neutral-900 text-heading-sm-4">
                Pages
              </p>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/about"
              >
                About
              </Link>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/blog"
              >
                Blog
              </Link>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/pricing"
              >
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5">
              <p className="font-inter font-medium text-neutral-900 text-heading-sm-4">
                Support
              </p>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/faqs"
              >
                FAQs
              </Link>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/contact"
              >
                Contact
              </Link>
              <Link
                className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
