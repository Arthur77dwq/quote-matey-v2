import SideBar from './components/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid grid-cols-10">
      <aside className="col-span-2 bg-accent-500 z-20">
        <SideBar />
      </aside>
      <main className="relative col-span-8">{children}</main>
    </section>
  );
}
