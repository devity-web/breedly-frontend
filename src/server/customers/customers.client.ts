import {createQueryKeys} from '@lukemorales/query-key-factory';
import {initQueryClient} from '@ts-rest/react-query';
import {customersContract} from './customers.contract';

export const customersClient = initQueryClient(customersContract, {
  baseUrl: 'http://localhost:3000/api/customers',
  baseHeaders: {},
});

export const customersKeys = createQueryKeys('customers', {
  getAll: null,
  getById: (id: string) => [id],
});
