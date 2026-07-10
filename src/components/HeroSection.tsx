import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { AnimatedRef } from '@/types/global';
import { HERO, RichTextNode } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
  ref,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  ref: React.ForwardedRef<AnimatedRef>;
}) => {
  const tl = useRef(gsap.timeline());

  useImperativeHandle(ref, () => ({
    timeline: tl.current,
  }));

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

const styleParse = (node: RichTextNode) => {
  const weightClass = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  } as const;

  if (node.type !== 'lineBreak')
    return cn(
      node?.bold && weightClass[node.weight ?? 'normal'],
      node?.strong && 'text-warning-600',
      node?.italic && 'italic',
    );
};

export const HeroSection = forwardRef<AnimatedRef, HERO>(
  ({ visible, tag, title, description, children, className }, ref) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    useSectionAnimation({ sectionRef, ref });

    return (
      visible && (
        <section
          className={
            'relative flex justify-center items-center gap-2.5 w-full h-fit'
          }
        >
          <div
            className={
              'relative flex items-center justify-center w-full h-115 sm:h-110 lg:h-130'
            }
          >
            <div className="w-full h-full">
              <Image
                src="/images/about/BackgroundSKYUNDERLAY.jpg"
                alt="Background"
                fill
                className="object-crop"
                priority
              />
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
            className={cn(
              'pb-15 pt-32 sm:pb-20 sm:pt-39.5 lg:pb-25 lg:pt-48.5 absolute inset-0 flex items-end justify-center bg-linear-to-b from-white/30 via-white via-41% to-white overflow-hidden',
              className,
            )}
          >
            <div
              ref={sectionRef}
              className="px-4 sm:p-0 opacity-0 flex flex-col items-center justify-center gap-2.5 w-full h-fit"
            >
              {tag && (
                <Badge className="rounded-full py-2.5 px-5 bg-white text-body-xs font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
                  {tag}
                </Badge>
              )}
              <h1 className="text-nowrap sm:text-wrap max-w-240 text-center tracking-[-1.4px] leading-[1.2em] text-neutral-900 text-[2.13rem] sm:text-[3.38rem] lg:text-[4.69rem]">
                {title?.map((node, i) => {
                  if (node.type === 'lineBreak') {
                    return <br key={i} />;
                  }

                  const Component = node.strong ? 'strong' : 'span';

                  return (
                    <Component
                      key={`${i}-${node.text}`}
                      className={cn(styleParse(node))}
                    >
                      {node.text}
                    </Component>
                  );
                })}
              </h1>

              {description && (
                <p className="max-w-150 w-full text-[1rem] sm:text-body-md text-center tracking-normal font-inter font-medium text-neutral-600 leading-[1.3em]">
                  {description?.map((node, i) => {
                    if (node.type === 'lineBreak') {
                      return <br className="hidden sm:static" key={i} />;
                    }

                    return (
                      <span key={i} className={cn('inline', styleParse(node))}>
                        {node.text}{' '}
                      </span>
                    );
                  })}
                </p>
              )}
              {children}
            </div>
          </div>
        </section>
      )
    );
  },
);
