import { User } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { User as UserType } from '@/types/global';

type Props = {
  user: UserType;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Profile({ user, children, className, onClick }: Props) {
  return (
    <>
      <button
        className={twMerge(
          'rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/80',
          className,
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 px-2.5 py-1 w-full">
          <div className="size-10 rounded-full flex items-center justify-center overflow-hidden shadow-sm border border-neutral-200">
            {user?.photoURL ? (
              <Image
                priority
                src={user.photoURL}
                alt={`${user.displayName || 'User'} avatar`}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <User className="text-neutral-500" />
            )}
          </div>

          {user?.displayName && (
            <span className="hidden lg:flex">{user.displayName}</span>
          )}
        </div>
      </button>
      {children}
    </>
  );
}
