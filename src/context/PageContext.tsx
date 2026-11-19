import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { HeaderType, PageContextType } from '@/types/dashboard';

const PageContext = createContext<PageContextType | null>(null);

export function PageProvider({ children }: { children: ReactNode }) {
  const [contextData, setContextData] = useState<HeaderType | null>(null);

  const value: PageContextType = useMemo(
    () => ({
      pageInfo: contextData,
      setPageInfo: setContextData,
    }),
    [contextData],
  );

  return <PageContext value={value}>{children}</PageContext>;
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within an PageProvider');
  }
  return context;
}

export default PageContext;
