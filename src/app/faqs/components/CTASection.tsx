import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/components/button';
import { gsap } from '@/lib/animations/plugins';
import { CTA } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  useGSAP(() => {
    // Animation Here
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  });
};

export function CTASection({ visible, title, description, buttons }: CTA) {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionAnimation({ sectionRef });
  const router = useRouter();
  return (
    visible && (
      <section
        ref={sectionRef}
        className="w-full flex justify-center items-center"
      >
        <div className="flex flex-col justify-start items-center gap-2.5">
          <h3 className="text-2xl font-semibold text-neutral-900 leading-[1.2em]">
            {title}
          </h3>
          <p className="text-[1rem] leading-[1.3em] text-neutral-600 font-inter font-medium">
            {description}
          </p>
          <div className="h-full w-full flex justify-center items-center gap-2">
            {buttons.map((button, i) => (
              <Button
                key={`${button.id}-${button.variant}-${i}`}
                variant={button.variant}
                className="w-fit"
                onClick={() =>
                  button.link && button.link.active
                    ? router.push(button.link.href)
                    : null
                }
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </section>
    )
  );
}
