import Vue from 'vue';
import Vuex from 'vuex';
import IRootState from '../types/IRootState';
import user from './modules/user/index';

/**
 * Tell Vue to use Vuex.
 */
Vue.use(Vuex);

/**
 * Global store singleton.
 */
export default new Vuex.Store<IRootState>({
  state: {
    version: '1.0.0',
  },
  modules: {
    user,
  },

  strict: process.env.NODE_ENV !== 'production',
});
