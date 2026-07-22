import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { SectionHeader } from '@/components/section-header';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { Button as ButtonType } from '@/types/global';
import { FootNote, LANDINGHERO } from '@/types/pages';

const useSectionAnimation = (
  sectionRef: React.RefObject<HTMLDivElement | null>,
) => {
  const tl = useRef(gsap.timeline());

  useGSAP(() => {
    // Animation Here
    tl.current.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      { opacity: 1, y: 0, duration: 1 },
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useSectionAnimation(sectionRef);

  return (
    visible && (
      <section
        className={cn(
          'relative flex flex-col justify-center items-center gap-2.5 w-full pb-15 pt-32 sm:pb-20 sm:pt-39.5 lg:pb-25 lg:pt-48.5',
          className,
        )}
      >
        <div className={'absolute inset-0 flex items-center justify-center'}>
          <div className="w-full h-full">
            {BGImage?.src && (
              <Image
                src={BGImage?.src}
                alt="Background"
                fill
                className="object-crop"
                priority
              />
            )}
          </div>
          <Image
            src="/images/about/cloudRight.png"
            className="w-140 h-87 absolute -top-20 right-0"
            width={0}
            height={0}
            alt=""
          />
          <Image
            src="/images/about/cloudLeft.png"
            className="w-140 h-87 absolute top-10 left-0"
            width={0}
            height={0}
            alt=""
          />
        </div>
        <div
          className={
            'absolute inset-0 h-full w-full flex items-end justify-center bg-linear-to-b from-white/30 via-white via-41% to-white overflow-hidden'
          }
        />

        <div
          ref={sectionRef}
          className="px-4 sm:p-0 opacity-0 flex flex-col items-center justify-center gap-7.5 w-full h-fit"
        >
          <>
            {(title || description) && (
              <SectionHeader {...{ title, description }} />
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

        {children}
      </section>
    )
  );
}
