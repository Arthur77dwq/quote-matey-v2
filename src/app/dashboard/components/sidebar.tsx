'use client';
import { useGSAP } from '@gsap/react';
import { TooltipContent } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

import { Button } from '@/components/button';
import { DashboardGlobalSearch } from '@/components/chat-navbar';
import { DomNode, DynamicNode } from '@/components/dome-node';
import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { gsap } from '@/lib/animations/plugins';
import { cn, shortNumber } from '@/lib/utils';
import { SideBarType, StatSummary } from '@/types/dashboard';
import { Highlight, NavBar } from '@/types/global';

function VerticalNavBar({ links, className }: NavBar & { className?: string }) {
  const pathname = usePathname();
  const Highlight = ({ type, defaultValue, style }: Highlight) => {
    switch (type) {
      case 'dot':
        return <span style={{ ...style }} className="text-xs rounded-full" />;
      default:
        return (
          <Badge style={{ ...style }} className="text-xs rounded-full">
            {defaultValue}
          </Badge>
        );
    }
  };
  return (
    <div
      className={cn(
        'm-w-fit min-h-fit flex flex-col items-center gap-2',
        className,
      )}
    >
      {links?.map((link, index) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={`${index}-${link.href}`}
            href={link.href}
            target={link.target}
            className={cn(
              'flex w-full items-center justify-between font-semibold text-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 rounded-md px-3 py-1',
              isActive ? 'bg-[#FFEEE8] text-orange-500' : '',
            )}
          >
            <span className="flex gap-2">
              {link.icon?.active && (
                <Icon
                  name={link.icon.icon}
                  className="h-5 min-w-fit"
                  style={{
                    stroke: link.icon.color,
                    strokeWidth: link.icon.strokeWidth,
                  }}
                />
              )}
              <span>{link.text}</span>
            </span>
            {link.highlight?.active && <Highlight {...link.highlight} />}
          </Link>
        );
      })}
    </div>
  );
}

function StatsCard({ style, title, primaryCTA, consumption }: StatSummary) {
  const tooltipContainerRef = useRef<HTMLDivElement>(null);

  const setTooltipContainerRef = useCallback(
    (element: HTMLDivElement | null) => {
      tooltipContainerRef.current = element;

      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          xPercent: -100,
        },
        {
          opacity: 1,
          xPercent: 0,
          duration: 0.5,
          ease: 'power.out',
          clearProps: 'opacity,transform',
        },
      );
    },
    [],
  );

  return (
    <Card
      className="w-full h-fit gap-0 p-3 bg-[#FFEEE8] border-0 rounded-md"
      style={{
        ...style,
      }}
    >
      {title.active && (
        <CardHeader className="w-full p-0">
          <CardTitle className="w-full p-0 text-xs flex items-center justify-between">
            {title.beforeValue?.active && (
              <DomNode children={title.beforeValue} />
            )}
            {title.defaultValue?.active && (
              <span className="text-sm font-bold">
                <DomNode children={title.defaultValue} />
              </span>
            )}
            {title.afterValue?.active && (
              <span className="text-orange-600 font-bold">
                <DomNode children={title.afterValue} />
              </span>
            )}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="w-full h-fit p-0 pt-1">
        <div className="flex gap-2">
          <div className="w-full flex items-center justify-start bg-[#D8D7D7] rounded-full overflow-hidden">
            <span
              className="h-2.5 rounded-md bg-orange-600 transition-all flex-1"
              style={{
                transform: `translateX(-${consumption.total - consumption.used}%)`,
              }}
            />
          </div>
          {consumption?.icon && consumption.icon.active && (
            <Tooltip>
              <TooltipTrigger>
                <Icon
                  name={consumption.icon.icon}
                  className="w-fit h-3"
                  style={{ stroke: consumption.icon.color }}
                />
              </TooltipTrigger>
              <TooltipContent
                ref={setTooltipContainerRef}
                className="bg-neutral-100 rounded-md shadow-sm py-1.5 pl-6 pr-3 flex flex-col items-start gap-1 -z-10"
                side="right"
              >
                {consumption.stats.map((stat, i: number) => (
                  <p key={i} className="text-xs ">
                    <span className="font-semibold">{stat.name}:</span>{' '}
                    {shortNumber(stat.used)}/{shortNumber(stat.total)}
                  </p>
                ))}
                <p className="text-xs ">
                  <span className="font-semibold">Points:</span>{' '}
                  {shortNumber(consumption.used)}/
                  {shortNumber(consumption.total)}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
      <CardFooter className="w-full p-0 pt-2">
        {primaryCTA.active && (
          <div className="w-full">
            <Button
              variant="outline"
              className="flex flex-col gap-1 p-2 text-white bg-orange-600 w-full h-fit rounded-md"
            >
              {primaryCTA.title.active && (
                <DynamicNode className="w-full text-xs" {...primaryCTA.title} />
              )}
              {primaryCTA.description.active && (
                <DynamicNode
                  className="w-full text-md"
                  {...primaryCTA.description}
                />
              )}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function Search() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  return (
    <>
      {isMobile && (
        <Drawer open={open} onOpenChange={setOpen} direction="bottom">
          <DrawerTrigger className="flex items-center gap-2 w-22 bg-neutral-100/30 rounded-full p-3 shadow-xs border-px border-neutral-100">
            <Icon name="Search" className="text-neutral-600 size-4" />
            <span className="text-xs font-normal text-neutral-500">Search</span>
          </DrawerTrigger>

          <DrawerContent className="overflow-y-auto overscroll-contain min-h-[90vh] px-5 border-px border-neutral-100 bg-white">
            <DialogTitle className="text-xs font-semibold text-neutral-500"></DialogTitle>
            <DashboardGlobalSearch className="w-full" />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default function SideBar({
  active,
  logo,
  primaryCta,
  navBar,
  statSummary,
  bottom,
  className,
}: SideBarType & { className?: string }) {
  const navigationBarRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const animation = useRef<gsap.core.Tween | null>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (!isMobile || !navigationBarRef.current) return;
      animation.current ??= gsap.fromTo(
        navigationBarRef.current,
        { opacity: 0, xPercent: -100 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 0.5,
          ease: 'power.out',
          paused: true,
          onReverseComplete: () => setOpen((prev) => !prev),
        },
      );
    },
    { dependencies: [isMobile], revertOnUpdate: true },
  );

  const toggleMenu = () => {
    if (isMobile) {
      if (open) animation.current?.reverse();
      else animation.current?.play();

      if (!open) setOpen((prev) => !prev);
    }
  };
  return (
    active && (
      <div
        className={cn(
          'fixed top-0 md:static inset-0 min-w-fit border-0 border-r-2 border-black/20 z-40 w-full bg-white py-5 px-2 flex flex-col items-center gap-3',
          open ? 'h-screen' : 'h-fit md:h-screen',
          className,
        )}
      >
        {/* BRAND Identity */}
        <div className="w-full h-8 flex items-center justify-between px-3">
          {logo?.active &&
            (logo.href ? (
              <Link
                href={logo.href}
                target={logo.target}
                className="w-fit h-full flex items-center justify-start"
              >
                <Image
                  className="w-fit h-full"
                  width={512}
                  height={105}
                  src={logo.src}
                  alt={logo?.alt}
                  style={{ aspectRatio: logo?.aspect }}
                />
              </Link>
            ) : (
              <Image
                className="w-fit h-full"
                width={512}
                height={105}
                src={logo.src}
                alt={logo?.alt}
                style={{ aspectRatio: logo?.aspect }}
              />
            ))}
          <div className="flex items-center gap-2">
            {/* <span className="flex md:hidden items-center justify-between gap-2 px-3 w-fit h-10 bg-white ring-1 ring-neutral-200 p-1 rounded-md">
              <span className="w-fit h-full flex items-center justify-center">
                <Icon
                  name="Bolt"
                  className="text-[#FF814C] size-5"
                  strokeWidth={4}
                />
              </span>
              <span className="w-full h-full flex items-center justify-center text-xs font-bold">
                900 pts
              </span>
            </span> */}
            <Search />
            <button
              onClick={toggleMenu}
              className={cn(
                'size-11 flex md:hidden justify-center items-center rounded-md',
                open ? 'bg-[#FAFBFD]' : 'bg-[#FFF0E9] ',
              )}
            >
              <Icon
                name={open ? 'X' : 'Menu'}
                className={cn(open ? '' : 'text-[#FF5000]')}
              />
            </button>
          </div>
        </div>

        <div
          ref={navigationBarRef}
          className={cn(
            'w-full h-full flex flex-col gap-5',
            open ? 'flex' : 'hidden md:flex',
          )}
        >
          {/* Body */}
          <div className={cn('flex flex-col gap-2 item-center w-full')}>
            {/* Primary CTA */}
            {primaryCta?.active && (
              <div className="w-full">
                <Button
                  variant="outline"
                  className="text-white bg-orange-600 w-full rounded-md"
                >
                  {primaryCta.title.active && (
                    <DynamicNode {...primaryCta.title} />
                  )}
                </Button>
              </div>
            )}

            {/* Vertical Navigation Bar */}
            {navBar?.active && (
              <VerticalNavBar className="w-full" {...navBar} />
            )}
          </div>

          {/* Bottom */}
          <div
            className={cn(
              'w-full h-fit flex flex-col justify-between items-center gap-3 md:mt-auto',
            )}
          >
            {statSummary?.active && <StatsCard {...statSummary} />}
            {bottom?.active && (
              <Card className="w-full border-0 p-3 flex flex-row gap-0 outline-2 outline-[#D8D7D7] bg-[#D8D7D7]/10 rounded-md">
                <div className="w-fit h-full flex">
                  <Icon
                    name={bottom.icon.icon}
                    className="h-3.5 min-w-fit"
                    style={{
                      stroke: bottom.icon.color,
                      strokeWidth: bottom.icon.strokeWidth,
                    }}
                  />
                </div>
                <CardContent className="w-full h-full flex flex-col gap-2 p-0 text-sm">
                  <div>
                    <CardTitle className="flex items-center gap-1 font-bold">
                      {bottom.title}
                    </CardTitle>
                    <CardDescription className="text-neutral-600">
                      {bottom.description}
                    </CardDescription>
                  </div>
                  {bottom.link.active && (
                    <Link
                      href={bottom.link.href}
                      target={bottom.link.target}
                      className="text-[#97ACD9] font-semibold flex items-center text-xs hover:underline"
                    >
                      {bottom.link.text}
                      {bottom.link.icon?.active && (
                        <Icon
                          name={bottom.link.icon.icon}
                          className="h-4 min-w-fit"
                          style={{
                            stroke: bottom.link.icon.color,
                            strokeWidth: bottom.link.icon.strokeWidth,
                          }}
                        />
                      )}
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  );
}
