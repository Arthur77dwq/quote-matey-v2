'use client';
import { useSearchParams } from 'next/navigation';

import { OverlayBg } from '@/components/overlay-bg';
import { GLOBAL_DATA } from '@/constant/data/global';

import { AuthFormSection } from './auth-form';

export function AuthScreen() {
  const { authDialog } = GLOBAL_DATA;
  const params = useSearchParams();

  if (params.get('reason') === 'unauthorized') {
    return (
      <OverlayBg>
        <AuthFormSection
          className="sm:relative w-full sm:w-fit max-w-150 p-5 h-full sm:h-fit! sm:rounded-[1rem]"
          {...authDialog}
        />
      </OverlayBg>
    );
  }

  return null;
}
