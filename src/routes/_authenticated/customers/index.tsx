import {createFileRoute} from '@tanstack/react-router';
import {Customers} from '@/pages/customers/customers';

export const Route = createFileRoute('/_authenticated/customers/')({
  component: Customers,
});
