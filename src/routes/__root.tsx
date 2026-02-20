import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools';
import {Toaster} from '@/components/ui/sonner';
import type {AuthContext} from '@/context/auth.context';

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster />
    </>
  );
};

export const Route = createRootRouteWithContext<AuthContext>()({
  component: () => <RootLayout />,
});
