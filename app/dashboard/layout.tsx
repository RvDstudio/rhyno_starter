import DashboardHeader from "@/components/dashboard_header";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}
