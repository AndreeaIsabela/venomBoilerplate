import { GetterTree } from 'vuex';
import IRootState from '../../../types/IRootState';
import IUserState from '../../../types/IUserState';

/**
 * Exporting user getters object.
 */
export default {
  /**
   * Get user's email address.
   *
   * @param {IUserState} state
   * @returns {string} email
   */
  email(state: IUserState): string {
    return state.email;
  },

  /**
   * Check and see if the user is authenticated or not.
   *
   * @param {IUserState} state
   * @returns {boolean}
   */
  isLoggedIn(state: IUserState): boolean {
    return state.isLoggedIn;
  },
} as GetterTree<IUserState, IRootState>;
