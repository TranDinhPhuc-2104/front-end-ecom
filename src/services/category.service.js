import { httpClient } from './httpClient.js';

export const categoryService = {
  /**
   * Get all categories
   * @returns {Promise<Array|object>} List of categories
   */
  async getCategories() {
    return await httpClient.get('/cate', {}, { authType: 'none' });
  },

  // ================= ADMIN APIs =================

  /**
   * Admin: Create new category
   * @param {object} categoryData - { nameCate }
   * @returns {Promise<object>}
   */
  async createCategory(categoryData) {
    return await httpClient.post('/admin/cate', categoryData, { authType: 'admin' });
  },

  /**
   * Admin: Update category
   * @param {string|number} id
   * @param {object} categoryData - { nameCate }
   * @returns {Promise<object>}
   */
  async updateCategory(id, categoryData) {
    return await httpClient.put(`/admin/cate/cate/${id}`, categoryData, { authType: 'admin' });
  },

  /**
   * Admin: Delete category
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async deleteCategory(id) {
    return await httpClient.delete(`/admin/cate/catedelete/${id}`, { authType: 'admin' });
  }
};
