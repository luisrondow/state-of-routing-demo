import { MainNav } from '@/components/main-nav'
import { AuthProvider } from '@/lib/auth'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthProvider>
        <MainNav />
        <Outlet />
      </AuthProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
