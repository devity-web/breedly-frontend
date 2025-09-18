import {initQueryClient} from '@ts-rest/react-query';
import {dogsContract} from './dogs.contract';

export const dogsClient = initQueryClient(dogsContract, {
  baseUrl: 'http://localhost:3000/api/dogs',
  baseHeaders: {},
});
