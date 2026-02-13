import z from 'zod';

export const statsSchema = z.object({
  dogs: z.number(),
  customers: z.number(),
  photos: z.number(),
  poops: z.number(),
});
