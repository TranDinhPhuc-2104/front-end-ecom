import { httpClient, TokenManager } from './httpClient.js';

export const authService = {
  /**
   * User login
   * @param {object} credentials - { gmail, password }
   * @returns {Promise<object>} ApiResponse
   */
  async login({ gmail, password }) {
    const data = await httpClient.post('/auth/login', { gmail, password }, { authType: 'none' });
    if (data?.result?.token) {
      TokenManager.setUserToken(data.result.token);
    }
    return data;
  },

  /**
   * User registration
   * @param {object} payload - { gmail, password }
   * @returns {Promise<object>} ApiResponse
   */
  async register({ gmail, password }) {
    return await httpClient.post('/auth/register', { gmail, password }, { authType: 'none' });
  },

  /**
   * Admin login
   * @param {object} credentials - { gmail, password }
   * @returns {Promise<object>} ApiResponse
   */
  async adminLogin({ gmail, password }) {
    const data = await httpClient.post('/auth/admin/login', { gmail, password }, { authType: 'none' });
    if (data?.result?.token && data.result.authenticated) {
      TokenManager.setAdminToken(data.result.token);
    }
    return data;
  },

  /**
   * Logout user
   */
  logoutUser() {
    TokenManager.removeUserToken();
  },

  /**
   * Logout admin
   */
  logoutAdmin() {
    TokenManager.removeAdminToken();
  },

  /**
   * Check if user is logged in
   */
  isUserLoggedIn() {
    return Boolean(TokenManager.getUserToken());
  },

  /**
   * Check if admin is logged in
   */
  isAdminLoggedIn() {
    return Boolean(TokenManager.getAdminToken());
  },

  getUserToken() {
    return TokenManager.getUserToken();
  },

  getAdminToken() {
    return TokenManager.getAdminToken();
  }
};
