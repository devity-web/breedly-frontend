import {createQueryKeys} from '@lukemorales/query-key-factory';
import {initQueryClient} from '@ts-rest/react-query';
import {getBaseUrl} from '@/utils/get-base-url';
import {dashboardContract} from './dashboard.contract';

export const dashboardClient = initQueryClient(dashboardContract, {
  baseUrl: `${getBaseUrl()}/dashboard`,
  credentials: 'include',
});

export const dashboardKeys = createQueryKeys('dashboard', {
  getStats: null,
});
