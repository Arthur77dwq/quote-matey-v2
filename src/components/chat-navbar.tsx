'use client';
import { useAuth } from '@/context/AuthContext';

import { AccountMenu } from './account-menu';
import { Icon } from './icon';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export function ChatNavbar() {
  const { user, logOut } = useAuth();
  const search = () => {};
  return (
    <header className="flex items-center justify-end gap-5 py-5 h-15 bg-white/80 backdrop-blur-xl border-b border-neutral-300 border-border/50">
      {/* Dashboard Global search */}
      <InputGroup className="max-w-xs h-10 rounded-md ring-1 ring-neutral-200 border-[#E8E8EA] focus-within:border-[#E8E8EA]! focus-within:ring-0!">
        <InputGroupInput
          onChange={search}
          placeholder="Search quotes, jobs, templates..."
          className="font-semibold"
        />
        <InputGroupAddon>
          <Icon name="Search" className="text-neutral-400" strokeWidth={3} />
        </InputGroupAddon>
      </InputGroup>

      {/* Points */}
      <span className="flex items-center justify-between gap-2 px-3 w-fit h-10 bg-white ring-1 ring-neutral-200 p-1 rounded-md">
        <span className="w-fit h-full flex items-center justify-center">
          <Icon name="Bolt" className="text-[#FF814C] size-5" strokeWidth={4} />
        </span>
        <span className="w-full h-full flex items-center justify-center text-xs font-bold">
          900 pts
        </span>
      </span>

      {/* seperator */}
      <span className="h-10 w-px rounded-full bg-neutral-300/60" />
      {/* profile */}
      {!!user && <AccountMenu user={user} logOut={logOut} />}
    </header>
  );
}
