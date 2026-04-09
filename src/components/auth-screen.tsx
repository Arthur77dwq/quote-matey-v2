'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Login } from '@/components/login';
import { OverlayBg } from '@/components/overlay-bg';
import { SignUp } from '@/components/signup';

export function AuthScreen() {
  const [hasAccount, setHasAccount] = useState(true);
  const params = useSearchParams();

  const renderAuthForm = () => {
    if (hasAccount) {
      return (
        <Login
          className="animate-drop w-full rounded-none sm:rounded-xl"
          toggle={() => setHasAccount(!hasAccount)}
        />
      );
    }
    return (
      <SignUp
        className="animate-drop w-full rounded-none sm:rounded-xl"
        toggle={() => setHasAccount(!hasAccount)}
      />
    );
  };

  if (params.get('reason') === 'unauthorized') {
    return <OverlayBg>{renderAuthForm()}</OverlayBg>;
  }

  return null;
}
