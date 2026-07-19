'use client';

import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import { AUTH_ROUTES } from '@/constant/config/route';
import { GLOBAL_DATA } from '@/constant/data/global';
import { gsap } from '@/lib/animations/plugins';
import { matchRoute } from '@/lib/utils';
import { FOOTERLINKS, LINK } from '@/types/global';

const useSectionAnimation = ({
  cardRef,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  useGSAP(() => {
    // Animation Here
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.4,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
      },
    });
  });
};

export const getGlobalData = () => {
  return GLOBAL_DATA;
};

export function Footer() {
  const { footer } = getGlobalData();
  const cardRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation({ cardRef });
  const pathname = usePathname();
  const shouldHide = matchRoute(pathname, AUTH_ROUTES);
  return (
    !shouldHide && (
      <footer className="relative w-full h-[120vh] sm:h-screen overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0">
          {footer?.BgImage.src && (
            <Image
              src={footer?.BgImage.src}
              className="object-cover object-top-center"
              fill
              alt=""
            />
          )}
          <div className="absolute inset-0 z-2 bg-linear-to-b from-neutral-0 via-neutral-0/30 via-20% to-transparent" />
        </div>
        <div className="z-3 w-full max-w-315 h-full md:h-fit lg:h-104.25 flex justify-center items-center px-4 sm:px-7.5 gap-12.5 lg:gap-2.5">
          <div
            ref={cardRef}
            className="w-full h-fit md:h-full bg-neutral-0 flex flex-col lg:flex-row flex-start gap-12.5 md:gap-15 p-5 sm:p-7.5 lg:p-25 rounded-[1rem] md:rounded-4xl"
          >
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
                  {footer?.title}
                </p>
              </div>

              {footer?.cta.active && (
                <Link
                  href={footer?.cta.href || ''}
                  target={footer.cta.target}
                  className="transition-colors ease-in-out hover:bg-neutral-100 bg-neutral-900 hover:text-neutral-900 text-neutral-0 px-6.5 py-3.5 w-fit rounded-4xl font-inter font-semibold text-body-md"
                >
                  {footer?.cta.text}
                </Link>
              )}
            </div>
            <div className="w-full lg:w-auto h-fit md:h-full flex flex-col md:flex-row gap-10 md:gap-45 lg:gap-7.5">
              {/* Right */}

              {footer?.linkCategory.length &&
                footer?.linkCategory.map((x: FOOTERLINKS, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-4 sm:gap-5"
                  >
                    <p className="font-inter font-medium text-neutral-900 text-heading-sm-4">
                      {x.category}
                    </p>
                    {x.links.map(
                      (link: LINK, index: number) =>
                        link.active && (
                          <Link
                            key={`${index}${i}`}
                            className="hover:text-[#3B82F6] text-[1rem] font-medium font-inter text-neutral-600"
                            href={link.href}
                            target={link.target}
                          >
                            {link.text}
                          </Link>
                        ),
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </footer>
    )
  );
}
