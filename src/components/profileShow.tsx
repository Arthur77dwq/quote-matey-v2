import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

import { cn, nameAcronoym } from '@/lib/utils';

import { Avatar } from './ui/avatar';

export function ProfileShow({
  ref,
  name,
  desc,
  image,
  href,
  className,
}: {
  ref?: React.RefObject<HTMLAnchorElement | null>;
  name: string;
  desc: string;
  image: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      ref={ref}
      className={cn(
        'flex flex-col justify-between items-center gap-5 h-full w-50',
        className,
      )}
    >
      <Avatar className="size-32.5">
        <AvatarImage
          className="h-32.2 w-32.2"
          width={130}
          height={130}
          src={image}
          alt={`${name}, ${desc} @ QuoteMatey`}
        />
        <AvatarFallback>{nameAcronoym(name) || 'QM'}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center items-center gap-.5">
        <h3 className="text-[1.13rem] md:text-2xl text-neutral-900 font-semibold">
          {name}
        </h3>
        <h4 className="text-[0.75rem] md:text-[0.88rem] text-neutral-600 text-center font-medium text-wrap md:text-nowrap">
          {desc}
        </h4>
      </div>
    </Link>
  );
}
