import { Outlet } from "react-router";
import { MainNav } from "@/components/main-nav";
import { AuthProvider } from "@/lib/auth";

export function RootLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <MainNav />
        <main>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}