import { Module } from 'vuex';
import IRootState from '../../../types/IRootState';
import IUserState from '../../../types/IUserState';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

/**
 * Exporting user state.
 */
export const state: IUserState = {
  email: localStorage.getItem(btoa('emailAddress')) || '',
  token: localStorage.getItem(btoa('token')) || '',
  isLoggedIn: !! localStorage.getItem(btoa('token')),
};

const namespaced: boolean = true;

/**
 * Exporting user module.
 */
export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
} as Module<IUserState, IRootState>;
