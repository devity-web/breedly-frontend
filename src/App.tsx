import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {ThemeProvider} from './components/theme-provider';
import {AuthProvider, useAuth} from './context/auth.context';
import {routeTree} from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: undefined!,
});

const queryClient = new QueryClient();

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={auth} />;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
