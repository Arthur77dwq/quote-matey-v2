'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/button';
import { DomNode, DynamicNode } from '@/components/dome-node';
import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { SideBarType, StatCategory, StatSummary } from '@/types/dashboard';
import { Highlight, NavBar } from '@/types/global';

function VerticalNavBar({ links, className }: NavBar & { className?: string }) {
  const pathname = usePathname();
  const Highlight = ({ type, defaultValue }: Highlight) => {
    switch (type) {
      case 'dot':
        return <span />;
      default:
        return <Badge>{defaultValue}</Badge>;
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

function StatsCard({ style, title, stats, primaryCTA }: StatSummary) {
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
        <div className="w-full flex items-center justify-start bg-[#D8D7D7] rounded-full overflow-hidden">
          <span
            className="h-2.5 rounded-md bg-orange-600 transition-all flex-1"
            style={{ transform: `translateX(-${100 - 40}%)` }}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-1 py-1">
          {stats.map(
            (stat: StatCategory, i: number) =>
              stat.active && (
                <p
                  key={i}
                  className="relative w-full flex items-center gap-2 text-xs font-semibold text-neutral-700"
                >
                  <span className="w-fit flex items-center justify-start gap-1">
                    {stat.beforeValue?.active && (
                      <DomNode children={stat.beforeValue} />
                    )}
                    {stat.defaultValue?.active && (
                      <DomNode children={stat.defaultValue} />
                    )}
                  </span>
                  {stat.afterValue?.active && (
                    <span
                      className={cn(
                        stat.afterValue.type === 'ICON'
                          ? 'absolute right-0'
                          : '',
                      )}
                    >
                      <DomNode children={stat.afterValue} />
                    </span>
                  )}
                </p>
              ),
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

export default function SideBar({
  active,
  logo,
  primaryCta,
  navBar,
  statSummary,
}: SideBarType) {
  return (
    active && (
      <div className="w-full h-screen py-5 px-2 flex flex-col items-center gap-3">
        {/* BRAND Identity */}
        <div className="w-full h-8 flex items-center px-3">
          {logo?.active &&
            (logo.href ? (
              <Link
                href={logo.href}
                target={logo.target}
                className="w-full h-full flex items-center justify-start"
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
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 item-center w-full">
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
          {navBar?.active && <VerticalNavBar className="w-full" {...navBar} />}
        </div>

        {/* Bottom */}
        <div className="w-full h-fit flex flex-col justify-between items-center gap-2 mt-auto">
          {statSummary?.active && <StatsCard {...statSummary} />}
        </div>
      </div>
    )
  );
}
