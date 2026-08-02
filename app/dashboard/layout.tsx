import { ProtectedPage } from "@/components/protected-page";
import { DashboardSidebar } from "./components/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <div className="dashboard-theme flex min-h-screen bg-background">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </ProtectedPage>
  );
}
