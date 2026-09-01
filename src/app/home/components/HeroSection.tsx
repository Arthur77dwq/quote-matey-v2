import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Description, Title } from '@/components/section-header';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { Button as ButtonType } from '@/types/global';
import { FootNote, LANDINGHERO } from '@/types/pages';

const useSectionAnimation = (
  parentRef: React.RefObject<HTMLDivElement | null>,
  sectionRefs: React.RefObject<(HTMLDivElement | null)[]>,
  imageRef: React.RefObject<HTMLDivElement | null>,
  mountainRef: React.RefObject<HTMLDivElement | null>,
) => {
  useGSAP(() => {
    // Animation Here
    gsap.fromTo(
      sectionRefs.current.map((x) => x),
      {
        opacity: 0,
        y: 50,
        duration: 0.75,
      },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
    );

    gsap.to(mountainRef.current, {
      yPercent: 150,
      scale: 2,
      opacity: 0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: parentRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 5,
      },
    });

    gsap.from(imageRef.current, {
      y: -218,
      scale: 0.6,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: imageRef.current,
        scrub: 3,
        start: 'top bottom',
      },
    });
  });
};

export function HeroSection({
  visible,
  title,
  description,
  BGImage,
  children,
  className,
  ...props
}: LANDINGHERO) {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const mountainRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation(parentRef, sectionRefs, imageRef, mountainRef);

  return (
    visible && (
      <section
        className={cn(
          'relative flex flex-col justify-center items-center gap-2.5 pb-40 lg:pb-0 w-full h-280 lg:h-350 overflow-hidden',
          className,
        )}
      >
        <div className={'w-full h-full flex items-center justify-center'}>
          <div className="w-full h-full">
            {BGImage?.src && (
              <Image
                src={BGImage?.src}
                alt="Background"
                height={1400}
                width={1200}
                className="w-full min-w-300 h-250 sm:h-325 lg:h-350"
                priority
              />
            )}
          </div>
          <Image
            src="/images/cloudLeft.png"
            className="w-150.5 h-87.5 absolute -top-10 -left-32.5"
            width={602}
            height={350}
            alt=""
          />

          <Image
            src="/images/cloudCenter.png"
            className="w-129.75 h-60 absolute top-12 left-1/2 -translate-x-1/2"
            width={519}
            height={240}
            alt=""
          />
          <Image
            src="/images/cloudRight.png"
            className="w-146 h-87.5 absolute top-20 -right-15"
            width={584}
            height={350}
            alt=""
          />
        </div>

        <div
          ref={parentRef}
          className="pt-39.5 pb-20 lg:pb-0 lg:pt-48.5 absolute flex flex-col justify-center items-center gap-10 lg:gap-39.5 w-full"
        >
          <div className="z-5 px-4 sm:p-0 flex flex-col items-center justify-center gap-7.5 w-fit h-fit">
            <>
              {title && (
                <Title
                  ref={(element) => {
                    sectionRefs.current[0] = element;
                  }}
                  className="opacity-0 lg:leading-23 text-heading-3! sm:text-[3.75rem]! lg:text-[5.7rem]!"
                  title={title}
                />
              )}
              {description && (
                <Description
                  ref={(element) => {
                    sectionRefs.current[1] = element;
                  }}
                  className="opacity-0 lg:text-[1.37rem]"
                  description={description}
                />
              )}
            </>
            <div
              ref={(element) => {
                sectionRefs.current[2] = element;
              }}
              className="opacity-0 w-full h-15.95 flex justify-center items-center gap-5"
            >
              {props.cta?.map((button: ButtonType, i: number) => (
                <Button
                  key={`${i}-${button.text}`}
                  className={cn(
                    button.variant === 'secondary'
                      ? 'h-full font-semibold shadow-[inset_4px_4px_8px_#FF5500,inset_-4px_-4px_8px_#FF4D00,0_4px_16px_rgba(255,77,0,0.5)] text-white! text-[0.7rem] sm:text-body-md font-inter bg-linear-to-br from-[#FF976B] via-15% via-[#FF8352] to-[#FF6929] w-fit border border-[#FF530A]'
                      : 'h-fit px-12.5 py-4.5 transition-colors ease-in-out hover:bg-neutral-900 bg-white hover:text-white text-neutral-900 w-fit rounded-4xl font-inter font-semibold text-[0.7rem] sm:text-body-md',
                  )}
                  variant={button.variant}
                  onClick={() =>
                    button.link && button.link.active
                      ? router.push(button.link.href)
                      : null
                  }
                >
                  {button?.text}
                </Button>
              ))}
            </div>
            <div
              ref={(element) => {
                sectionRefs.current[3] = element;
              }}
              className="opacity-0 flex justify-center items-center gap-5 whitespace-nowrap"
            >
              {props.footNote?.map((note: FootNote, index: number) => (
                <React.Fragment key={index}>
                  <span
                    key={`${index}-${note.text}`}
                    className="flex justify-center items-center gap-1"
                  >
                    {note.icon &&
                      (note.icon?.type === 'IMG' ? (
                        <Image
                          src={note.icon.src}
                          alt=""
                          width={1}
                          height={1}
                          className="size-2.5 sm:size-4.5"
                        />
                      ) : (
                        note.icon?.type === 'ICON' && (
                          <Icon
                            name={note.icon.icon || ''}
                            className="w-4 h-4"
                          />
                        )
                      ))}
                    <span className="text-[0.5rem] lg:text-[1rem]">
                      {note.text}
                    </span>
                  </span>
                  {props.footNote &&
                    props.footNote[index + 1] !== undefined && (
                      <span
                        key={index}
                        className="h-4 opacity-20 bg-neutral-900 w-px"
                      />
                    )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div
            ref={(element) => {
              sectionRefs.current[4] = element;
            }}
            className="opacity-0 relative w-full flex justify-center px-5"
          >
            <div className="overflow-hidden rounded-[0.625rem] sm:rounded-[1.25rem] border border-neutral-300 flex lg:hidden justify-center items-center w-full h-fit">
              <Image
                src={props.otherImages?.uiView.src || '/images/dashboard.png'}
                alt=""
                width={1200}
                height={0}
                className="max-w-265 w-full"
              />
            </div>
            <div
              ref={imageRef}
              className="transform -translate-y-15 overflow-hidden rounded-[1.25rem] border border-neutral-300 hidden lg:flex justify-center items-center w-fit h-fit"
            >
              <Image
                src={props.otherImages?.uiView.src || '/images/dashboard.png'}
                alt=""
                width={1200}
                height={0}
                className="max-w-290"
              />
            </div>
            <div
              ref={mountainRef}
              className="w-full hidden lg:flex justify-center absolute -top-148"
            >
              <Image
                src={props.otherImages?.overlay.src || '/images/mountain.png'}
                alt=""
                width={1220}
                height={770}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-50 bg-linear-to-b from-white/0 via-25% via-white/70 to-50% to-white" />

        {children}
      </section>
    )
  );
}
