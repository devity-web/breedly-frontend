import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import {dogFormSchema, dogSchema} from './dogs.schemas';

const c = initContract();

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
  addHealth: {
    method: 'POST',
    path: '/:id/health',
    body: z.object({
      description: z.string(),
    }),
    responses: {
      201: dogSchema,
    },
  },
  addPoop: {
    method: 'POST',
    path: '/:id/poop',
    body: null,
    responses: {
      201: dogSchema,
    },
  },
  addPhoto: {
    method: 'POST',
    path: '/:id/photo',
    body: z.object({
      file: z.instanceof(File),
    }),
    contentType: 'multipart/form-data',
    responses: {
      201: dogSchema,
    },
  },
  deletePhoto: {
    method: 'DELETE',
    path: '/:id/photo/:photoId',
    body: null,
    responses: {
      201: dogSchema,
    },
  },
  createDog: {
    method: 'POST',
    path: '/',
    body: dogFormSchema,
    responses: {
      200: dogSchema,
    },
  },
  updateDog: {
    method: 'PATCH',
    body: dogFormSchema,
    path: '/:id',
    responses: {
      200: dogSchema,
    },
  },
});
