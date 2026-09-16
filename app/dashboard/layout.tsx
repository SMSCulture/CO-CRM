import { ProtectedPage } from '@/components/protected-page';
import { DashboardSidebar } from './components/dashboard-sidebar';
import { DashboardTopbar } from './components/dashboard-topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <div className="dashboard-theme flex min-h-screen bg-slate-50/70">
        <div data-dashboard-sidebar><DashboardSidebar /></div>
        <div data-dashboard-shell className="min-w-0 flex-1"><div data-dashboard-topbar><DashboardTopbar /></div><main data-dashboard-main className="mx-auto max-w-[1600px] p-5 lg:p-8">{children}</main></div>
      </div>
    </ProtectedPage>
  );
}
