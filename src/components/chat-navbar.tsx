'use client';
import { useAuth } from '@/context/AuthContext';

import { AccountMenu } from './account-menu';
import { Icon } from './icon';

export function ChatNavbar() {
  const { user, logOut } = useAuth();
  return (
    <header className="flex items-center justify-end py-5 h-15 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <span className="flex items-center justify-between gap-2 w-fit h-7 bg-white ring-1 ring-neutral-200 p-1 rounded-md">
        <span className="w-fit h-full flex items-center justify-center">
          <Icon name="Bolt" className="text-[#FF814C] size-4" strokeWidth={4} />
        </span>
        <span className="w-full h-full flex items-center justify-center text-xs font-bold">
          900 pts
        </span>
      </span>
      {!!user && <AccountMenu className="" user={user} logOut={logOut} />}
    </header>
  );
}
