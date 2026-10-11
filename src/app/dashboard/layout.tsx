import { DASHBOARD_DATA } from '@/constant/data/dashboard';

import SideBar from './components/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sidebar } = DASHBOARD_DATA;

  return (
    <section className="grid grid-cols-7">
      <aside className="col-span-1 border-0 border-r-2 border-black/20 z-20">
        {sidebar?.active && <SideBar {...sidebar} />}
      </aside>
      <main className="relative col-span-6">{children}</main>
    </section>
  );
}
