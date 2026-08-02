import { DashboardSidebar } from "./components/dashboard-sidebar";

// TODO: auth is temporarily bypassed for local preview — the real
// <ProtectedPage> wrapper (role-gated, redirects to /login) lives in
// components/protected-page.tsx and just needs to go back around
// {children} below once we're testing against real accounts/roles.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-theme flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
