import {initContract} from '@ts-rest/core';
import {statsSchema} from './dashboard.schema';

const c = initContract();

export const dashboardContract = c.router({
  getStats: {
    method: 'GET',
    path: '/',
    responses: {
      200: statsSchema,
    },
  },
});
