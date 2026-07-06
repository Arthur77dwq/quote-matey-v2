'use client';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { GLOBAL_DATA } from '@/constant/data/global';
import { gsap } from '@/lib/animations/plugins';

import { HamBurgerMenu } from './hamburgerMenu';
import { NavBar } from './navBar/navBar';
import { NavBarMobile } from './navBar/navBarMobile';
import { Button } from './ui/button';

export const getGlobalData = () => {
  return GLOBAL_DATA;
};

const useRollMove = ({
  leftArrowRef,
  rightArrowRef,
  textRef,
}: {
  leftArrowRef: React.RefObject<HTMLButtonElement | null>;
  rightArrowRef: React.RefObject<HTMLButtonElement | null>;
  textRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const rollMove = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.set(leftArrowRef.current, {
      rotate: -45,
    });
    rollMove.current = gsap.timeline({ paused: true });
    rollMove.current.to(leftArrowRef.current, {
      x: -13,
      rotate: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
    rollMove.current.to(
      rightArrowRef.current,
      {
        xPercent: 150,
        rotate: 45,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<',
    );
    rollMove.current.to(
      textRef.current,
      {
        xPercent: 27,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<',
    );
  });
  return rollMove;
};

export function Header() {
  const { headers } = getGlobalData();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const leftArrowRef = useRef<HTMLButtonElement | null>(null);
  const textRef = useRef<HTMLButtonElement | null>(null);
  const rightArrowRef = useRef<HTMLButtonElement | null>(null);
  const rollMove = useRollMove({ leftArrowRef, rightArrowRef, textRef });

  return (
    <>
      {headers?.type === 'GLOBAL_HEADER' && (
        <>
          <div className="fixed z-200 top-0 w-full flex flex-col justify-center items-center p-5">
            <div
              className="
              absolute
              top-0
              inset-0
              h-10
              bg-neutral-950/2
              backdrop-blur-[5px]
              [mask-:linear-gradient(to_bottom,black_70%,transparent)]
              [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent)]
              "
            />
            <div
              className={twMerge(
                'z-200 relative w-full lg:w-auto lg:h-fit',
                open && 'h-screen',
              )}
            >
              <div className="rounded-md shadow-[0_0_0_4px_#DDE5EDB3] lg:min-w-40 h-14.5 bg-white w-full lg:w-3xl flex justify-between items-center p-2.5">
                <Image
                  className="w-35 sm:w-42.5 sm:h-8.7"
                  src={headers?.logo.src}
                  alt={headers?.logo.alt}
                  width={170}
                  height={35}
                />

                {headers?.navBar.active && (
                  <NavBar navLinks={headers?.navBar.links || []} />
                )}
                <div className="h-full flex items-center justify-between gap-2">
                  {/* {headers?.buttons &&
                headers?.buttons?.length > 0 &&
                headers?.buttons?.map((btn, index) => {
                  return ( */}
                  <Button
                    variant="outline"
                    className="hidden md:flex bg-white border border-[#E5E7EB] w-23 rounded-2xl cursor-pointer"
                  >
                    Login
                  </Button>

                  <Button
                    onMouseEnter={() => rollMove.current?.play()}
                    onMouseLeave={() => rollMove.current?.reverse()}
                    className="p-2.5 pl-6 relative overflow-hidden cursor-pointer flex items-center justify-between gap-1.25 w-fit h-fit rounded-full text-white bg-linear-to-br from-[#637696] via-[#5A7AAD] via-20% to-[#2D4A7A]"
                  >
                    <span
                      ref={leftArrowRef}
                      key="left"
                      className="absolute -translate-x-12 bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
                    >
                      <ArrowRight />
                    </span>
                    <span ref={textRef}>Start Free</span>
                    <span
                      ref={rightArrowRef}
                      key="right"
                      className=" bg-white text-black text-body-xs justify-self-end flex items-center justify-center rounded-full size-5.5"
                    >
                      <ArrowRight />
                    </span>
                  </Button>

                  {/* );
                })} */}
                  <HamBurgerMenu onClick={toggle} />
                </div>
              </div>
              {headers?.navBar.active && (
                <NavBarMobile
                  open={open}
                  navLinks={headers?.navBar.links || []}
                />
              )}
            </div>
          </div>
          <div
            className={twMerge(
              'backdrop-blur-md inset-0 z-100',
              open ? 'fixed' : 'hidden',
            )}
          />
        </>
      )}
    </>
  );
}
