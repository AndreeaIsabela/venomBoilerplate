import axios from 'axios';

import store from '@/store';
import VueRouter from 'vue-router';

/**
 * Redirect the user to login page and remove the token from localStorage
 * if the status code from response is 401.
 */
export function unauthorizedRequest(router: any) {
  return axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        store.dispatch('user/destroySession');

        router.push({ name: 'login' });

        window.alert('Your session has expired. Please login again.');
      }

      return Promise.reject(error);
    },
  );
}
