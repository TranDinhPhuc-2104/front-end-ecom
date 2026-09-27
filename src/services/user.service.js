import { httpClient } from './httpClient.js';

export const userService = {
  /**
   * Get current user profile
   * @returns {Promise<object>} ApiResponse with user profile in .result
   */
  async getProfile() {
    return await httpClient.get('/ui/myProfile', {}, { authType: 'user' });
  },

  /**
   * Update current user profile
   * @param {object} profileData - { firstName, lastName, dob, phone, address }
   * @returns {Promise<object>} ApiResponse
   */
  async updateProfile(profileData) {
    return await httpClient.put('/ui/update', profileData, { authType: 'user' });
  }
};
