'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/button';
import { DynamicNode } from '@/components/dome-node';
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
import { SideBarType } from '@/types/dashboard';
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
              isActive ? 'bg-orange-100 text-orange-500' : '',
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
        <div className="w-full h-fit flex flex-col justify-between items-center gap-2 self-end">
          {statSummary?.active && (
            <Card
              className="w-full h-fit"
              style={{
                ...statSummary.style,
              }}
            >
              <CardHeader>
                <CardTitle>
                  <DynamicNode {...statSummary.title} />
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter></CardFooter>
            </Card>
          )}
        </div>
      </div>
    )
  );
}
