import { MutationTree } from 'vuex';
import ILoginResponse from '../../../types/ILoginResponse';
import IUserState from '../../../types/IUserState';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './mutation_types';

/**
 * Exporting mutations object.
 */
export default {
  /**
   * Set user's session.
   *
   * @param {IUserState} state
   * @param {ILoginResponse} loginResponse
   * @returns void
   */
  [LOGIN_SUCCESS](state: IUserState, loginResponse: ILoginResponse): void {
    state.email = loginResponse.email;
    state.token = loginResponse.token;
    state.isLoggedIn = true;
    localStorage.setItem(btoa('emailAddress'), loginResponse.email);
    localStorage.setItem(btoa('token'), loginResponse.token);
  },

  /**
   * Destroy user's session.
   *
   * @param {IUserState} state
   * @returns void
   */
  [LOGOUT_SUCCESS](state: IUserState): void {
    state.email = '';
    state.token = '';
    state.isLoggedIn = false;
    localStorage.removeItem(btoa('emailAddress'));
    localStorage.removeItem(btoa('token'));
  },
} as MutationTree<IUserState>;
