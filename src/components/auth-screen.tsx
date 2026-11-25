'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { OverlayBg } from '@/components/overlay-bg';
import { GLOBAL_DATA } from '@/constant/data/global';

import { AuthFormSection } from './auth-form';

export function AuthScreen() {
  const { authDialog, authDialogLogin } = GLOBAL_DATA;
  const params = useSearchParams();
  const router = useRouter();

  const authParam = params.get('auth');
  const unauthorized = params.get('reason') === 'unauthorized';
  const type = authParam === 'login' ? 'login' : 'signup';
  const open = authParam === 'login' || authParam === 'signup' || unauthorized;
  const config = type === 'login' ? authDialogLogin : authDialog;

  if (!open) return null;

  return (
    <OverlayBg>
      {/* Swap popup content between login/signup instead of navigating */}
      <div
        className="w-full h-full flex justify-center items-center"
        onClick={(e) => {
          const anchor = (e.target as HTMLElement).closest('a');
          const href = anchor?.getAttribute('href');
          if (href === '/login' || href === '/signup') {
            e.preventDefault();
            router.replace(
              href === '/login' ? '/?auth=login' : '/?auth=signup',
            );
          }
        }}
      >
        <AuthFormSection
          className="sm:relative w-full sm:w-fit max-w-125 h-full sm:h-fit! sm:rounded-[1rem]"
          onClose={() => router.replace('/')}
          {...config}
        />
      </div>
    </OverlayBg>
  );
}
