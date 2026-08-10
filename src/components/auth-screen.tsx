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
          className="w-fit h-fit! rounded-[1rem]"
          {...authDialog}
        />
      </OverlayBg>
    );
  }

  return null;
}
