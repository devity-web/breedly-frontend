import {initContract} from '@ts-rest/core';
import {z} from 'zod';

const c = initContract();

export const customerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const customersContract = c.router({});
