import { httpClient } from './httpClient.js';

export const productService = {
  /**
   * Get featured products (e.g. for homepage)
   * @param {number} page
   * @param {number} size
   * @returns {Promise<object>}
   */
  async getFeaturedProducts(page = 1, size = 10) {
    return await httpClient.get('/product', { page, size }, { authType: 'none' });
  },

  /**
   * Get paginated products with category and sorting filters
   * @param {object} options - { page, size, cateId, sort }
   * @returns {Promise<object>}
   */
  async getProducts({ page = 1, size = 6, cateId = 'all', sort = 'featured' } = {}) {
    if (cateId && cateId !== 'all') {
      return await httpClient.get(`/product/cate/${cateId}`, {}, { authType: 'none' });
    }

    if (sort === 'lowToHigh' || sort === 'highToLow') {
      return await httpClient.get('/product/sort', { page, size, sort }, { authType: 'none' });
    }

    return await httpClient.get('/product', { page, size }, { authType: 'none' });
  },

  /**
   * Get product details by ID
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async getProductById(id) {
    return await httpClient.get(`/product/${id}`, {}, { authType: 'none' });
  },

  /**
   * Search products by name keyword
   * @param {string} namePro
   * @returns {Promise<object>}
   */
  async searchProductsByName(namePro) {
    return await httpClient.get(`/product/namepro/${encodeURIComponent(namePro)}`, {}, { authType: 'none' });
  },

  // ================= ADMIN APIs =================

  /**
   * Admin: Get all products
   * @returns {Promise<object>}
   */
  async getAllProductsAdmin() {
    return await httpClient.get('/admin/product', {}, { authType: 'admin' });
  },

  /**
   * Admin: Create new product
   * @param {object} productData - { namePro, price, quantity, idCate, description, image }
   * @returns {Promise<object>}
   */
  async createProduct(productData) {
    return await httpClient.post('/admin/product', productData, { authType: 'admin' });
  },

  /**
   * Admin: Update product by ID
   * @param {string|number} id
   * @param {object} productData
   * @returns {Promise<object>}
   */
  async updateProduct(id, productData) {
    return await httpClient.put(`/admin/product/update/${id}`, productData, { authType: 'admin' });
  },

  /**
   * Admin: Delete product by ID
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async deleteProduct(id) {
    return await httpClient.delete(`/admin/product/${id}`, { authType: 'admin' });
  }
};
