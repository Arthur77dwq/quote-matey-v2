'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/billing');
    }, 3000);
  });

  return <div>Subscription successful!</div>;
}
