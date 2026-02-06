import {initContract} from '@ts-rest/core';
import {z} from 'zod';

const c = initContract();

export const customerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  phone: z.string(),
  createdAt: z.date(),
});

export const customersContract = c.router({
  getCustomers: {
    method: 'GET',
    path: '/',
    responses: {
      200: z.array(customerSchema),
    },
  },
});
