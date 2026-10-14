import { DASHBOARD_DATA } from '@/constant/data/dashboard';

import SideBar from './components/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sidebar } = DASHBOARD_DATA;

  return (
    <section className="relative flex max-h-screen max-w-screen">
      <aside className="min-w-fit">
        {sidebar?.active && <SideBar {...sidebar} />}
      </aside>
      <main className="flex-1 z-0">{children}</main>
    </section>
  );
}
