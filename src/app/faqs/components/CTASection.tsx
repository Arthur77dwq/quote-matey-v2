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
          <h3 className="text-center text-[1.25rem] min-[810px]:text-2xl font-semibold text-neutral-900 leading-[1.2em]">
            {title}
          </h3>
          <p className="-mt-1.5 text-center text-[0.9375rem] min-[810px]:text-[1rem] leading-[1.3em] text-neutral-600 font-inter font-medium">
            {description}
          </p>
          <div className="h-full w-full flex justify-center items-center gap-2 [&>div]:p-[4.4px] [&>div]:border-2 [&>div]:border-neutral-50">
            {buttons.map((button, i) => (
              <Button
                key={`${button.id}-${button.variant}-${i}`}
                variant={button.variant}
                className="w-[11.8227rem] h-[2.3rem] min-[810px]:w-[12.8008rem] min-[810px]:h-[2.4625rem] lg:w-[14.0508rem] lg:h-[2.9625rem] border-0 outline-none rounded-full py-2 pl-5 pr-3 lg:py-3 lg:pl-[1.875rem] font-inter text-[1rem]! min-[810px]:text-[1.125rem]! lg:text-[1.125rem]! font-semibold leading-[1.3em] bg-[linear-gradient(110deg,#323232_0%,#000_100%)] shadow-[inset_4px_4px_8px_#FFFFFF4D,inset_-4px_-4px_8px_#FFFFFF4D,0_8px_16px_#1D1D1D80] [&>span:first-child]:opacity-0 hover:[&>span:first-child]:opacity-100 [&>span:last-child]:size-[1.55rem]! min-[810px]:[&>span:last-child]:size-[1.7125rem]! lg:[&>span:last-child]:size-[1.9625rem]!"
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
