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
    <section className="relative flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      <aside className="min-w-fit shrink-0">
        {sidebar?.active && <SideBar {...sidebar} />}
      </aside>
      <main className="min-w-0 h-full flex-1 z-0 flex flex-col pt-[72px] md:pt-0">
        <ChatNavbar />
        <div className="min-h-0 flex-1 w-full">{children}</div>
      </main>
    </section>
  );
}
