import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Description, Title } from '@/components/section-header';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { Button as ButtonType } from '@/types/global';
import { FootNote, LANDINGHERO } from '@/types/pages';

const useSectionAnimation = (
  sectionRef: React.RefObject<HTMLDivElement | null>,
  imageRef: React.RefObject<HTMLDivElement | null>,
  mountainRef: React.RefObject<HTMLDivElement | null>,
) => {
  useGSAP(() => {
    // Animation Here
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      { opacity: 1, y: 0, duration: 1 },
    );
    gsap.to(mountainRef.current, {
      yPercent: 190,
      scale: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 5,
        markers: true,
      },
    });

    gsap.from(imageRef.current, {
      y: -250,
      scale: 0.5,
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const mountainRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation(sectionRef, imageRef, mountainRef);

  return (
    visible && (
      <section
        className={cn(
          'relative flex flex-col justify-center items-center gap-2.5 w-full h-fit overflow-hidden',
          className,
        )}
      >
        <div className={'w-full h-fit flex items-center justify-center'}>
          <div className="w-full h-full">
            {BGImage?.src && (
              <Image
                // src={BGImage?.src}
                src={'/images/openScene.png'}
                alt="Background"
                height={1400}
                width={1200}
                className="w-full min-w-300 h-350"
                priority
              />
            )}
          </div>
          <Image
            src="/images/cloudLeft.png"
            className="w-140 h-87 absolute top-20 left-169"
            width={0}
            height={0}
            alt=""
          />

          <Image
            src="/images/cloudCenter.png"
            className="w-140 h-87 absolute top-12.5 left-85"
            width={0}
            height={0}
            alt=""
          />
          <Image
            src="/images/cloudRight.png"
            className="w-140 h-87 absolute -top-10 -left-32.5"
            width={0}
            height={0}
            alt=""
          />
        </div>

        <div
          ref={sectionRef}
          className="pt-48.5 opacity-0 absolute flex flex-col justify-center items-center gap-39.5 w-fit"
        >
          <div className="px-4 sm:p-0 flex flex-col items-center justify-center gap-7.5 w-fit h-fit">
            <>
              {title && <Title className="lg:text-[5.7rem]" title={title} />}
              {description && (
                <Description
                  className="lg:text-[1.37rem]"
                  description={description}
                />
              )}
            </>
            <div className="w-full flex justify-center gap-5">
              {props.cta?.map((button: ButtonType, i: number) => (
                <Button
                  key={`${i}-${button.text}`}
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
            <div className="flex justify-center items-center gap-5">
              {props.footNote?.map((note: FootNote, index: number) => (
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
                        className="w-4.5 h-4.5"
                      />
                    ) : (
                      note.icon?.type === 'ICON' && (
                        <Icon name={note.icon.icon || ''} className="w-4 h-4" />
                      )
                    ))}
                  <span>{note.text}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="relative w-full flex justify-center">
            <div
              ref={imageRef}
              className="overflow-hidden rounded-[1.25rem] border border-neutral-300 flex justify-center items-center w-fit h-fit"
            >
              <Image
                src="/images/dashboard.png"
                alt=""
                width={1200}
                height={0}
                className="max-w-265"
              />
            </div>
            <div
              ref={mountainRef}
              className="w-fit flex justify-center absolute -top-100"
            >
              <Image
                src="/images/mountain.png"
                alt=""
                width={1220}
                height={770}
                className="max-w-300"
              />
            </div>
          </div>
        </div>

        {children}
      </section>
    )
  );
}
