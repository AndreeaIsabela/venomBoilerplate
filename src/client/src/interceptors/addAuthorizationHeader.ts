import axios from 'axios';

import store from '@/store';

/**
 * Set authorization header.
 */
export function addAuthorizationHeader() {
  return axios.interceptors.request.use(
    (config) => {
      const token = store.getters['user/token'];
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`;
        config.headers['Pragma'] = 'no-cache';
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    },
  );
}
