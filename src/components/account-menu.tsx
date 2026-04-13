import { LogOut as LogOutIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { User } from '@/types/global';

import { Profile } from './profile';

type Props = {
  user: User;
  logOut: () => Promise<void>;
};

export function AccountMenu({ user, logOut }: Props) {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleProfileShow = () => setShow((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <Profile
        user={user}
        onClick={toggleProfileShow}
        className={twMerge(show && 'bg-secondary/80 text-foreground')}
      />

      {show && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-2 border-b">
            <p className="text-sm font-medium">{user?.displayName || ''}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              logOut();
              setShow(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50 transition group"
          >
            <LogOutIcon
              size={16}
              className="text-gray-500 group-hover:text-red-500"
            />
            <span className="group-hover:text-red-600">Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}
