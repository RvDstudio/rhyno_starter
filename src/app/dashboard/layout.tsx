import DashboardHeader from "@/src/components/dashboard_header";
import Sidebar from "@/src/components/Sidebar";

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
