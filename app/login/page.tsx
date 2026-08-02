import { LoginWizard } from "./components/login-wizard";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[400px] rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">CO CRM</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in with your CultureOwl account</p>
        </div>
        <LoginWizard />
      </div>
    </main>
  );
}
