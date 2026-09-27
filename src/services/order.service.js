import { httpClient } from './httpClient.js';

export const orderService = {
  /**
   * Place a new order
   * @param {object} orderData - { fullName, phone, address, paymentMethod }
   * @returns {Promise<object>} ApiResponse
   */
  async createOrder(orderData) {
    return await httpClient.post('/orders/create', orderData, { authType: 'user' });
  },

  /**
   * Get list of orders for the currently authenticated user
   * @returns {Promise<object>} ApiResponse with list in .result
   */
  async getMyOrders() {
    return await httpClient.get('/orders/getmyOrders', {}, { authType: 'user' });
  },

  /**
   * Get details of a specific order
   * @param {string|number} orderId
   * @returns {Promise<object>} ApiResponse with items in .result
   */
  async getOrderDetail(orderId) {
    return await httpClient.get(`/orderdetail/${orderId}`, {}, { authType: 'auto' });
  },

  /**
   * Cancel an order by user
   * @param {string|number} orderId
   * @returns {Promise<object>} ApiResponse
   */
  async cancelOrder(orderId) {
    return await httpClient.put(`/orders/cancel/${orderId}`, {}, { authType: 'user' });
  },

  // ================= ADMIN APIs =================

  /**
   * Admin: Get all orders across the system
   * @returns {Promise<object>}
   */
  async getAllOrdersAdmin() {
    return await httpClient.get('/orders/profile', {}, { authType: 'admin' });
  },

  /**
   * Admin: Update order information and status
   * @param {string|number} orderId
   * @param {object} orderData - { fullName, phone, address, paymentMethod, status }
   * @returns {Promise<object>}
   */
  async updateOrderAdmin(orderId, orderData) {
    return await httpClient.put(`/orders/update/${orderId}`, orderData, { authType: 'admin' });
  }
};
