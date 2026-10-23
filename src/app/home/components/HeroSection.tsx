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

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
      },
    });

    scrollTimeline
      .to(
        mountainRef.current,
        {
          yPercent: 200,
          scale: 2,
          opacity: 0,
          ease: 'power1.out',
        },
        0,
      )
      .from(
        imageRef.current,
        {
          y: -201,
          scale: 0.584,
          ease: 'power1.out',
        },
        0,
      );
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
          'relative flex flex-col justify-start md:justify-center items-center gap-2.5 w-full h-[53.58125rem] md:h-[62.46328125rem] lg:h-350 overflow-hidden',
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
                className="relative -top-[30px] w-full h-[calc(100%+30px)] object-cover md:-top-[10px] md:h-[calc(100%+10px)] lg:top-0 lg:h-350"
                priority
              />
            )}
          </div>
          <Image
            src="/images/cloudLeft.png"
            className="hidden md:block w-150.5 h-87.5 absolute -top-10 -left-32.5"
            width={602}
            height={350}
            alt=""
          />

          <Image
            src="/images/cloudCenter.png"
            className="hidden md:block w-129.75 h-60 absolute top-12 left-1/2 -translate-x-1/2"
            width={519}
            height={240}
            alt=""
          />
          <Image
            src="/images/cloudRight.png"
            className="hidden md:block w-146 h-87.5 absolute top-20 -right-15"
            width={584}
            height={350}
            alt=""
          />
        </div>

        <div
          ref={parentRef}
          className="pt-39.5 md:pt-15 pb-20 lg:pb-0 lg:pt-48.5 absolute flex flex-col justify-center items-center gap-7.5 lg:gap-39.5 w-full"
        >
          <div className="z-5 px-0 -translate-y-[1.875rem] md:translate-y-[1.3125rem] lg:translate-y-5 flex flex-col items-center justify-center gap-6.5 md:gap-7.75 w-88.5 lg:w-fit h-fit">
            {/* Hero Content */}
            <div className="relative md:-top-0.5 lg:top-0 w-full h-full flex flex-col items-center justify-center gap-6.5">
              {title && (
                <Title
                  ref={(element) => {
                    sectionRefs.current[0] = element;
                  }}
                  className="w-full lg:w-[65.1875rem] max-w-full opacity-0 leading-[1em]! font-bold [&_*]:font-bold text-heading-3 md:text-[2.5rem] lg:text-[5.6875rem] [&_br]:hidden lg:[&_br]:inline"
                  title={title}
                />
              )}
              {description && (
                <Description
                  ref={(element) => {
                    sectionRefs.current[1] = element;
                  }}
                  className="max-md:relative max-md:-top-0.5 whitespace-normal w-[21.45rem] md:w-[23.4125rem] lg:w-full p-0.5 md:p-0 opacity-0 font-medium tracking-[-0.005em] leading-[1.25em] text-balance text-body-md lg:text-heading-sm-4"
                  description={description}
                />
              )}
            </div>

            {/* CTA */}
            <div
              ref={(element) => {
                sectionRefs.current[2] = element;
              }}
              className="relative max-md:top-1 opacity-0 w-full h-15.95 flex flex-row justify-center items-center gap-4 lg:gap-5 [&>div:first-child]:ring-1 [&>div:first-child]:ring-inset [&>div:first-child]:ring-white/70 [&>div:first-child]:backdrop-blur-[5px]"
            >
              {props.cta?.map((button: ButtonType, i: number) => (
                <Button
                  key={`${i}-${button.text}`}
                  className={cn(
                    button.variant === 'secondary'
                      ? 'w-[11.7325rem] lg:w-[13.94921875rem] h-[2.3rem] lg:h-[2.9625rem] p-0! py-2! pl-5! pr-1.5! lg:py-3! lg:pl-[1.875rem]! lg:pr-2! [&>span:first-child]:size-[1.55rem] [&>span:last-child]:size-[1.55rem] lg:[&>span:first-child]:size-[1.9625rem] lg:[&>span:last-child]:size-[1.9625rem] font-semibold leading-[1.3em] shadow-[inset_4px_4px_8px_#FF5500,inset_-4px_-4px_8px_#FF4D00,0_4px_16px_rgba(255,77,0,0.5)] text-white! text-[1rem] lg:text-body-md font-inter bg-linear-to-br from-[#FF976B] via-15% via-[#FF8352] to-[#FF6929] border border-[#FF530A]'
                      : 'w-[8.632rem] lg:w-[11.5546875rem] h-[3.0625rem] lg:h-[3.6875rem] p-0 border border-[#E5E7EB] hover:border-neutral-900 transition-colors ease-in-out hover:bg-neutral-900 bg-white hover:text-white text-neutral-900 rounded-4xl font-inter font-semibold leading-[1.3em] text-[1rem] lg:text-body-md',
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

            {/* Footnote */}
            <div
              ref={(element) => {
                sectionRefs.current[3] = element;
              }}
              className="relative max-md:top-2 max-lg:-mb-2.5 opacity-0 flex justify-center items-center gap-5 whitespace-nowrap"
            >
              {props.footNote?.map((note: FootNote, index: number) => (
                <React.Fragment key={index}>
                  <span
                    key={`${index}-${note.text}`}
                    className={cn(
                      'lg:flex justify-center items-center gap-1',
                      props.footNote !== undefined &&
                        Math.floor(props.footNote?.length / 2) === index
                        ? 'flex'
                        : 'hidden',
                    )}
                  >
                    {note.icon &&
                      (note.icon?.type === 'IMG' ? (
                        <Image
                          src={note.icon.src}
                          alt=""
                          width={1}
                          height={1}
                          className="w-auto h-4.5"
                        />
                      ) : (
                        note.icon?.type === 'ICON' && (
                          <Icon
                            name={note.icon.icon || ''}
                            className="w-4 h-4"
                          />
                        )
                      ))}
                    {note.text && (
                      <Description
                        className="text-[0.9375rem]! lg:text-[1rem]! font-medium text-neutral-600! leading-[1.3em]"
                        description={note.text}
                      />
                    )}
                  </span>
                  {props.footNote &&
                    props.footNote[index + 1] !== undefined && (
                      <span
                        key={index}
                        className="hidden lg:inline h-4 opacity-20 bg-neutral-900 w-px"
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
            className="opacity-0 relative md:top-6 lg:top-0 w-full translate-y-3 md:translate-y-[6.125rem] lg:translate-y-0 flex justify-center px-4 md:px-5"
          >
            <div className="overflow-hidden rounded-[0.625rem] sm:rounded-[1.25rem] border-0 ring-1 ring-inset ring-neutral-300 flex lg:hidden justify-center items-center w-full h-fit">
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
              className="transform -translate-y-10 overflow-hidden rounded-[1.25rem] border border-neutral-300 hidden lg:flex justify-center items-center w-fit h-fit"
            >
              <Image
                src={props.otherImages?.uiView.src || '/images/dashboard.png'}
                alt=""
                width={1200}
                height={0}
                className="max-w-290"
              />
            </div>
          </div>
        </div>
        <div
          ref={mountainRef}
          className="pointer-events-none absolute bottom-[18.625rem] left-0 z-[2] hidden w-[calc(100%+1.25rem)] max-w-none justify-center lg:flex"
        >
          <Image
            src={props.otherImages?.overlay.src || '/images/mountain.png'}
            alt=""
            width={1220}
            height={770}
            className="h-auto w-full"
          />
        </div>
        <div className="absolute bottom-0 w-full h-25 md:h-40 lg:h-50 bg-linear-to-b from-white/0 via-25% via-white/70 to-50% to-white" />

        {children}
      </section>
    )
  );
}
