import z from 'zod';
import {customerSchema} from '../customers/customers.contract';

export const dogFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
  bornAt: z.string().datetime(),
});

export const weightSchema = z.object({
  id: z.string().uuid(),
  value: z.number().min(0),
  createdAt: z.date(),
});

export const poopSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
});

export const dogSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  assignedName: z.string().optional(),
  passport: z.string().optional(),
  chipId: z.string().optional(),
  photo: z.string().optional(),
  bornAt: z.string().date(),
  owner: customerSchema.optional(),
  weights: z.array(weightSchema),
  poops: z.array(poopSchema),
});
