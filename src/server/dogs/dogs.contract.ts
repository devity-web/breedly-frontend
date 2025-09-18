import {initContract} from '@ts-rest/core';
import {z} from 'zod';

const c = initContract();

export const dogSchema = z.object({
  name: z.string(),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
  photo: z.string().optional(),
  bornAt: z.date(),
  owner: z.any().optional(),
});

export const dogsContract = c.router({
  getDogs: {
    method: 'GET',
    path: '/',
    responses: {
      200: z.array(dogSchema),
    },
  },
});
