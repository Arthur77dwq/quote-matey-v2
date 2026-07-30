import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { ProfileShow } from '@/components/profileShow';
import { Badge } from '@/components/ui/badge';
import { gsap } from '@/lib/animations/plugins';

const useSectionAnimation = ({
  titleRef,
  profileContainerRef,
  subRefs,
}: {
  titleRef: React.RefObject<HTMLElement | null>;
  profileContainerRef: React.RefObject<HTMLDivElement | null>;
  subRefs: React.RefObject<HTMLDivElement | null>[];
}) => {
  useGSAP(() => {
    // Animation Here
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top bottom',
      },
    });

    gsap.from(
      subRefs.map((ref) => ref.current),
      {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: profileContainerRef.current,
          start: 'top bottom',
        },
      },
    );
  });
};

export const OurTeam = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const profileContainerRef = useRef<HTMLDivElement | null>(null);
  const subRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];
  useSectionAnimation({ titleRef, profileContainerRef, subRefs });

  return (
    <section className="pb-25 w-full flex flex-col gap-12.5 items-center justify-between">
      <div
        ref={titleRef}
        className="w-full flex flex-col items-center justify-between"
      >
        <Badge className="rounded-full py-2.5 px-5 bg-neutral-50 font-inter font-medium text-body-xs text-neutral-900 flex items-center justify center border border-neutral-100">
          Our experts
        </Badge>
        <h2 className="text-[2.13rem] sm:text-6xl text-neutral-900 font-bold text-nowrap">
          Meet <strong className="text-warning-600">our</strong> team
        </h2>
      </div>
      <div
        ref={profileContainerRef}
        className="flex items-center justify-center w-full"
      >
        <div className="flex items-start justify-center w-full sm:w-1/2 gap-5 sm:gap-7.5">
          {[
            {
              name: 'Arthur',
              desc: 'Founder & CEO',
              image: '/images/about/arthur.avif',
            },
            {
              name: 'Ankesh',
              desc: 'Founding Software Engineer',
              image: '/images/about/ankesh.webp',
            },
          ].map((profile, i) => (
            <ProfileShow
              ref={subRefs[i]}
              key={`${i}-${profile.name}`}
              {...profile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
