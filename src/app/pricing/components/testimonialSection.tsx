'use client';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { RefObject, useRef } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';
import { cn, nameAcronoym } from '@/lib/utils';
import { TESTIMONIAL, UserTestimonial } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
  cardsRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
  cardsRef: RefObject<Record<string, HTMLDivElement>>;
}) => {
  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
    const cards = Object.values(cardsRef.current);

    gsap.from(cards, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: cards,
        start: 'top 70%',
      },
      stagger: 0.15,
    });
  });
};

export function TestimonialCard({
  rating,
  comment,
  user,
  className,
  ref,
}: UserTestimonial & {
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <Card
      ref={ref}
      className={cn(
        'flex gap-auto justify-between bg-white w-full h-full rounded-[0.625rem] sm:rounded-[1.87rem] border-0 p-10',
        className,
      )}
    >
      <CardContent className="gap-2.5 flex flex-col p-0">
        <p className="flex">
          {Array.from({ length: rating }, (_, i) => i).map((x: number) => (
            <Star key={x} fill="#FFD700" stroke="#FFD700" size={18} />
          ))}
        </p>
        <p className="text-[1.12rem] font-inter font-medium text-neutral-900">
          {comment}
        </p>
      </CardContent>
      <CardFooter className="p-0">
        <div className="flex justify-start items-center gap-4 w-full h-fit">
          <Avatar className="size-12">
            <AvatarImage
              className="size-12 object-cover"
              width={30}
              height={30}
              src={user.image.src}
              alt={`${user.name}, ${user.trade} user of QuoteMatey`}
            />
            <AvatarFallback>{nameAcronoym(user.name) || 'User'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-between">
            <span className="whitespace-nowrap text-[1.37rem] font-inter font-medium text-neutral-900">
              {user.name}
            </span>
            <span className="text-[0.88rem] text-neutral-600 font-inter font-medium">
              {user.trade}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Testimonial({
  title,
  testimonials,
  className,
  ...prop
}: TESTIMONIAL) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Record<string, HTMLDivElement>>({});

  useSectionAnimation({ sectionRef, cardsRef });

  const setCardRef = (i: number) => (element: HTMLDivElement) => {
    cardsRef.current[i] = element;
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex flex-col justify-center items-center gap-2.5 w-full h-fit sm:h-272.5 lg:h-257.25',
        className,
      )}
    >
      <div
        className={
          'absolute inset-0 flex items-center justify-center overflow-hidden'
        }
      >
        <div className="w-full h-full">
          <Image
            src={prop.BGImage.src}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col justify-between items-center w-full h-full z-3">
        <div
          className={
            'w-full h-25 sm:h-40 lg:h-50 flex items-end justify-center bg-[linear-gradient(to_bottom,white_0%,rgba(255,255,255,0.85)_40%,rgba(255,255,255,0.4)_70%,transparent_100%)] overflow-hidden z-2'
          }
        />
        <div className="px-5 lg:px-12 gap-7.5 max-w-325 w-full h-fit grid grid-cols-1 grid-row-4 sm:grid-cols-2 sm:grid-row-3 lg:grid-cols-3 lg:grid-rows-2">
          <div className="col-span-1 sm:col-span-2 flex flex-col items-start pb-5 gap-5">
            <h2 className="leading-[1.2em] whitespace-normal sm:whitespace-nowrap lg:whitespace-normal font-bold text-[2.125rem] sm:text-[2.75rem] lg:text-[3.75rem] w-full lg:w-160 text-white">
              {title}
            </h2>
            <p className="text-[1rem] font-inter font-medium text-white flex justify-start items-center gap-1.5">
              <Star fill="#FFD700" stroke="#FFD700" size={18} />
              <span>{prop.rating || ''}</span>
            </p>
          </div>
          {testimonials.map((testimonial: UserTestimonial, i: number) => (
            <TestimonialCard
              ref={setCardRef(i)}
              {...testimonial}
              className="h-74.75 sm:h-auto"
              key={i}
            />
          ))}
        </div>
        <div
          className={
            'w-full h-25 sm:h-40 lg:h-50 flex items-end justify-center bg-linear-to-b from-white/0 via-white/70 via-27% to-white overflow-hidden z-2'
          }
        />
      </div>
    </section>
  );
}
