import {createQueryKeys} from '@lukemorales/query-key-factory';
import {initQueryClient} from '@ts-rest/react-query';
import {getBaseUrl} from '@/utils/get-base-url';
import {dogsContract} from './dogs.contract';

export const dogsClient = initQueryClient(dogsContract, {
  baseUrl: `${getBaseUrl()}/dogs`,
  baseHeaders: {},
});

export const dogsKeys = createQueryKeys('dogs', {
  getAll: null,
  getById: (id: string) => [id],
});
