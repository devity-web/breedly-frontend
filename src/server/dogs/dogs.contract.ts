import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import {customerSchema} from '../customers/customers.contract';

const c = initContract();

export const dogSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
  photo: z.string().optional(),
  bornAt: z.date(),
  owner: customerSchema.optional(),
});

export const dogsContract = c.router({
  getDogs: {
    method: 'GET',
    path: '/',
    responses: {
      200: z.array(dogSchema),
    },
  },
  getDogById: {
    method: 'GET',
    path: '/:id',
    responses: {
      200: dogSchema,
    },
  },
});
