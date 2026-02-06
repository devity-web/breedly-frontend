import {createFileRoute} from '@tanstack/react-router';
import {Customers} from '@/pages/customers/customers';

export const Route = createFileRoute('/customers/')({
  component: Customers,
});
