import {createFileRoute, redirect} from '@tanstack/react-router';
import LoginPage from '@/pages/login/login';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
  beforeLoad: ({context}) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
});
