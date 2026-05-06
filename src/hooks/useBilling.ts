'use client';

import { useEffect, useState } from 'react';

import { apiJson } from '@/lib/api';

export interface BillingData {
  subscription?: {
    id: string;
    status: string;
    planId: string;
    currentPeriodEnd?: string;
  } | null;
}

export function useBilling() {
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refetch() {
    setLoading(true);

    try {
      const res = await apiJson<BillingData>('/api/billing/me');
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function loadBilling() {
      try {
        const res = await apiJson<BillingData>('/api/billing/me');

        if (mounted) {
          setData(res);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadBilling();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    data,
    loading,
    refetch,
  };
}
