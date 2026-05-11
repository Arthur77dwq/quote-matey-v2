'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/pricing');
    }, 3000);
  });

  return <div>Subscription successful!</div>;
}
