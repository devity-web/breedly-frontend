import {createQueryKeys} from '@lukemorales/query-key-factory';
import {initQueryClient} from '@ts-rest/react-query';
import {getBaseUrl} from '@/utils/get-base-url';
import {customersContract} from './customers.contract';

export const customersClient = initQueryClient(customersContract, {
  baseUrl: `${getBaseUrl()}/customers`,
  credentials: 'include',
});

export const customersKeys = createQueryKeys('customers', {
  getAll: null,
  getById: (id: string) => [id],
});
