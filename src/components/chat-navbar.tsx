'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { search } from '@/app/dashboard/actions/dashboardGlobalSearch';
import { SEARCH_DEMO_DATA } from '@/constant/data/dashboard';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

import { AccountMenu } from './account-menu';
import { Icon } from './icon';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export function DashboardGlobalSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [active, setActive] = useState<{
    group_index: number | null;
    item_index: number | null;
    id: string | null;
  }>({
    group_index: null,
    item_index: null,
    id: null,
  });
  const [data, setData] = useState<typeof SEARCH_DEMO_DATA | null>(null);
  const router = useRouter();

  const handleHotKey = useCallback(
    (e: KeyboardEvent) => {
      if (data !== null) {
        if (e.key === 'Escape') {
          setOpen(false);
          inputRef.current?.blur();
        }

        let { group_index, item_index, id } = active;
        const group = data.groups[group_index!];
        const group_length = data.groups.length - 1;

        if (e.key === 'Enter') {
          if (group.items[item_index!].url.active)
            router.push(group.items[item_index!].url.href);
        }

        if (e.key === 'ArrowDown') {
          const item_length = group.items.length - 1;
          if (item_index !== null && item_length > item_index) {
            item_index++;
          } else if (group_index !== null && item_length === item_index) {
            if (group_length > group_index) {
              group_index++;
              item_index = 0;
            } else if (group_length === group_index) {
              group_index = 0;
              item_index = 0;
            }
          }
          id = data.groups[group_index!].items[item_index!].id;
        } else if (e.key === 'ArrowUp') {
          if (item_index !== null && item_index > 0) {
            item_index--;
          } else if (group_index !== null && 0 === item_index) {
            if (0 < group_index) {
              group_index--;
              item_index = data.groups[group_length].items.length - 1;
            } else if (0 === group_index) {
              group_index = group_length;
              item_index = data.groups[group_length].items.length - 1;
            }
          }

          id = data.groups[group_index!].items[item_index!].id;
        }

        setActive({
          id,
          group_index,
          item_index,
        });
      }
    },
    [active, data, router],
  );

  useEffect(() => {
    const timer = setTimeout(async () => {
      setData(null);
      if (query) {
        search(query).then((res) => {
          setActive({
            group_index: 0,
            item_index: 0,
            id: res.groups[0].items[0].id,
          });
          setData(res);
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    window.addEventListener('keydown', handleHotKey);
    return () => window.removeEventListener('keydown', handleHotKey);
  }, [data, handleHotKey]);

  return (
    <div className="relative flex flex-col justify-center items-center gap-5">
      <InputGroup
        className={cn(
          'min-w-xs h-10 rounded-md ring-1 ring-neutral-200 border-[#E8E8EA] focus-within:border-[#E8E8EA]! focus-within:ring-0!',
          className,
        )}
      >
        <InputGroupInput
          ref={inputRef}
          onFocus={() => setOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search quotes, jobs, templates..."
          className="text-xs"
        />
        <InputGroupAddon>
          <Icon name="Search" className="text-neutral-400" strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
      {data && open && (
        <div className="overflow-y-auto overscroll-contain py-3 absolute top-12 min-w-xs w-80 max-h-screen flex flex-col items-center bg-white rounded-md border-neutral-200 ring-1 ring-neutral-100">
          <p className="pt-0 px-3 pb-2 w-full border-b-2 border-neutral-200/50 flex items-center justify-between text-xs">
            <span className="font-semibold">
              {data.totalResults} results for "{data.query}"
            </span>
            <span className="text-neutral-300">{data.organization.name}</span>
          </p>
          {data.groups.length &&
            data.groups.map((group, i) => (
              <div
                key={i}
                className="w-full px-3 py-2 flex flex-col gap-1 items-center"
              >
                <p className="text-xs text-neutral-500 w-full flex items-center gap-2">
                  <span className="font-semibold">{group.label}</span>
                  <span>{group.count}</span>
                </p>
                <div className="relative flex flex-col gap-2 w-full">
                  {group.items.map((item, k) => (
                    <Link
                      href={item.url.active ? item.url.href : ''}
                      target={item.url.target}
                      key={k + i}
                      className={cn(
                        'group flex w-full items-center justify-between gap-3 rounded-md px-2 py-1',
                        active.id === item.id ? 'bg-[#FFF0E9]' : 'bg-white',
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-8/10">
                        <div
                          className={cn(
                            'p-2 rounded-md flex items-center justify-center w-fit',
                            active.id === item.id ? 'bg-white' : 'bg-[#F5F6F8]',
                          )}
                        >
                          {item.type === 'quote' && (
                            <Icon
                              name="FileText"
                              className={cn(
                                'size-4',
                                active.id === item.id
                                  ? 'text-[#FF5000]'
                                  : 'text-[#747B85]',
                              )}
                            />
                          )}
                          {item.type === 'job' && (
                            <Icon
                              name="Wrench"
                              className={cn(
                                'size-4',
                                active.id === item.id
                                  ? 'text-[#FF5000]'
                                  : 'text-[#747B85]',
                              )}
                            />
                          )}
                          {item.type === 'quote_template' && (
                            <Icon
                              name="LayoutPanelTop"
                              className={cn(
                                'size-4',
                                active.id === item.id
                                  ? 'text-[#FF5000]'
                                  : 'text-[#747B85]',
                              )}
                            />
                          )}
                        </div>
                        <div className="flex flex-col items-start justify-center gap-1 w-fit">
                          <p className="text-xs text-neutral-900 text-nowrap">
                            {item.title}
                          </p>
                          <ul className="text-nowrap text-ellipsis text-xs text-neutral-600 w-full flex items-center gap-px list-none">
                            {item.type === 'quote_template' ? (
                              <>
                                <li key="id">
                                  <span className="text-xs">
                                    Quote Template
                                  </span>
                                </li>
                                <li
                                  key="items-count"
                                  className="flex items-center "
                                >
                                  <Icon name="Dot" className="size-3" />
                                  <span className="text-xs">
                                    {item.lineItemCount} line items
                                  </span>
                                </li>
                              </>
                            ) : (
                              <li key="id" className="text-nowrap">
                                {item.id}
                              </li>
                            )}
                            {item.type === 'quote' ? (
                              <>
                                <li
                                  key="customer"
                                  className="flex items-center "
                                >
                                  <Icon name="Dot" className="size-3" />
                                  <span className="text-nowrap">
                                    {item.customer.name}
                                  </span>
                                </li>
                                <li className="flex items-center ">
                                  <Icon name="Dot" className="size-3" />{' '}
                                  <span className="text-xs">$</span>{' '}
                                  {item.amount.value}
                                </li>
                                <li className="flex items-center ">
                                  <Icon name="Dot" className="size-3" />
                                  {item.status}
                                </li>
                              </>
                            ) : (
                              item.type === 'job' && (
                                <li
                                  key="location"
                                  className="flex items-center"
                                >
                                  <Icon name="Dot" className="size-3" />
                                  <span className="text-xs">
                                    {item.location.address}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-full w-4">
                        <Icon
                          name="CornerDownLeft"
                          className={cn(
                            'text-[#FF5000] size-4',
                            active.id === item.id ? 'flex' : 'hidden',
                          )}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          <div className="pt-2 px-3 pb-0 flex items-center justify-between text-xs font-extralight text-neutral-700 w-full border-t-2 border-neutral-200/50">
            <div className="flex gap-3 items-center">
              <span className="flex gap-2 justify-center items-center">
                <Icon name="ArrowDownUp" className="size-3" />
                <span>to navigate</span>
              </span>
              <span className="flex gap-2 justify-center items-center">
                <Icon name="CornerDownLeft" className="size-3" />
                <span>to open</span>
              </span>
            </div>
            <span>esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatNavbar() {
  const { user, logOut } = useAuth();
  return (
    <header className="flex items-center justify-end gap-5 py-5 h-15 bg-white/80 backdrop-blur-xl border-b border-neutral-300 border-border/50">
      {/* Dashboard Global search */}
      <DashboardGlobalSearch className="w-80 hidden md:flex" />
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
