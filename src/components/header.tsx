'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/button';
import { AUTH_ROUTES } from '@/constant/config/route';
import { GLOBAL_DATA } from '@/constant/data/global';
import { matchRoute } from '@/lib/utils';

import { HamBurgerMenu } from './hamburgerMenu';
import { NavBar } from './navBar/navBar';
import { NavBarMobile } from './navBar/navBarMobile';

export const getGlobalData = () => {
  return GLOBAL_DATA;
};

export function Header() {
  const { headers } = getGlobalData();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const pathname = usePathname();
  const shouldHide = matchRoute(pathname, [...AUTH_ROUTES, '/chat']);

  return (
    <>
      {!shouldHide && headers?.type === 'GLOBAL_HEADER' && (
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
                {headers?.logo?.active ? (
                  <Link
                    href={headers?.logo?.href}
                    target={headers?.logo?.target}
                  >
                    <Image
                      className="w-35 sm:w-42.5 sm:h-8.7"
                      src={headers?.logo.src}
                      alt={headers?.logo.alt}
                      width={170}
                      height={35}
                    />
                  </Link>
                ) : (
                  <Image
                    className="w-35 sm:w-42.5 sm:h-8.7"
                    src={headers?.logo.src}
                    alt={headers?.logo.alt}
                    width={170}
                    height={35}
                  />
                )}

                {headers?.navBar.active && (
                  <NavBar navLinks={headers?.navBar.links || []} />
                )}
                <div className="h-full flex items-center justify-between gap-2">
                  {headers?.buttons &&
                    headers?.buttons?.length > 0 &&
                    headers?.buttons?.map((button, i) => {
                      return (
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
                      );
                    })}
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
