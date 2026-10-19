import { ChatNavbar } from '@/components/chat-navbar';
import { DASHBOARD_DATA } from '@/constant/data/dashboard';

import SideBar from './components/sidebar';

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
      <main className="w-full h-full z-0">
        <ChatNavbar />
        <div className="h-full w-full">{children}</div>
      </main>
    </section>
  );
}
