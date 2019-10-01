import axios from 'axios';
import { ActionTree } from 'vuex';
import ICredentials from '../../../types/ICredentials';
import ILoginResponse from '../../../types/ILoginResponse';
import IRootState from '../../../types/IRootState';
import IUser from '../../../types/IUser';
import IUserState from '../../../types/IUserState';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './mutation_types';

/**
 * Exporting actions object.
 */
export default {
  /**
   * Create a new user account.
   *
   * @param {Commit} commit
   * @param {IUser} user
   * @returns {Promise<void>}
   */
  async createUser({ commit }, user: IUser): Promise<void> {
    await axios.post('http://localhost:3000/user/register', user).then((response) => {
      const loginResponse: ILoginResponse = response.data;
      commit(LOGIN_SUCCESS, loginResponse);
    });
  },

  /**
   * Authenticate the given user.
   *
   * @param {Commit} commit
   * @param {Object} credentials
   * @returns {Promise<void>}
   */
  async authenticateUser({ commit }, credentials: ICredentials): Promise<void> {
    await axios.post('http://localhost:3000/user/login', credentials).then((response) => {
      const loginResponse: ILoginResponse = response.data;
      commit(LOGIN_SUCCESS, loginResponse);
    });
  },

  /**
   * Destroy user's session.
   *
   * @param {Commit} commit
   * @returns {Promise<void>}
   * @returns {Promise<void>}
   */
  destroySession({ commit }): Promise<void> {
    return new Promise((resolve, reject) => {
      commit(LOGOUT_SUCCESS);
      resolve();
    });
  },
} as ActionTree<IUserState, IRootState>;
