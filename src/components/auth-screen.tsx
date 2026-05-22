'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Login } from '@/components/login';
import { OverlayBg } from '@/components/overlay-bg';
import { ResetPassword } from '@/components/reset-password';
import { SignUp } from '@/components/signup';

export function AuthScreen() {
  const [hasAccount, setHasAccount] = useState(true);
  const [resetPassword, setResetPassword] = useState(false);
  const params = useSearchParams();

  const resetToggle = () => setResetPassword(!resetPassword);

  const renderAuthForm = () => {
    if (resetPassword) {
      return (
        <ResetPassword className="animate-drop w-full rounded-none sm:rounded-xl" />
      );
    }

    if (hasAccount) {
      return (
        <Login
          className="animate-drop w-full rounded-none sm:rounded-xl"
          toggle={() => setHasAccount(!hasAccount)}
          resetPassword={resetToggle}
        />
      );
    }

    return (
      <SignUp
        className="animate-drop w-full rounded-none sm:rounded-xl"
        toggle={() => setHasAccount(!hasAccount)}
        resetPassword={resetToggle}
      />
    );
  };

  if (params.get('reason') === 'unauthorized') {
    return <OverlayBg>{renderAuthForm()}</OverlayBg>;
  }

  return null;
}
