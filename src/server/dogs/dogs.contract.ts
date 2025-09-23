import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import {customerSchema} from '../customers/customers.contract';

const c = initContract();

export const weightSchema = z.object({
  id: z.string().uuid(),
  value: z.number().min(0),
  createdAt: z.date(),
});

export const dogSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
  photo: z.string().optional(),
  bornAt: z.date(),
  owner: customerSchema.optional(),
  weights: z.array(weightSchema),
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
  addWeight: {
    method: 'POST',
    path: '/:id/weight',
    body: z.object({
      value: z.number().min(0),
    }),
    responses: {
      201: dogSchema,
    },
  },
  updateDog: {
    method: 'PATCH',
    body: z.object({
      name: z.string().optional(),
      assignedName: z.string().optional(),
      passport: z.string().optional(),
      chipId: z.string().optional(),
    }),
    path: '/:id',
    responses: {
      200: dogSchema,
    },
  },
});
