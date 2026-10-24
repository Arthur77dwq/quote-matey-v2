'use client';
import { Navbar } from '@/components/chat-navbar';
import SideBar from '@/components/dashboard/sidebar';
import { DASHBOARD_DATA } from '@/constant/data/dashboard';
import { PageProvider } from '@/context/PageContext';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sidebar } = DASHBOARD_DATA;

  return (
    <section className="relative flex max-h-screen max-w-screen overflow-hidden">
      <aside className="min-w-fit">
        {sidebar?.active && <SideBar {...sidebar} />}
      </aside>
      <PageProvider>
        <main className="w-full h-full z-0">
          <Navbar />
          <div className="h-full w-full">{children}</div>
        </main>
      </PageProvider>
    </section>
  );
}
