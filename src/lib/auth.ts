import {createAuthClient} from 'better-auth/react';
import {getBaseUrl} from '@/utils/get-base-url';

export const authClient = createAuthClient({
  baseURL: `${getBaseUrl()}/auth`,
});
