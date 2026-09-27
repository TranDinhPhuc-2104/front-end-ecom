import { httpClient } from './httpClient.js';

export const cartService = {
  /**
   * Get current user's cart
   * @returns {Promise<object>} ApiResponse with cart in .result
   */
  async getCart() {
    return await httpClient.get('/cart', {}, { authType: 'user' });
  },

  /**
   * Add a product to the cart
   * @param {number|string} productId
   * @param {number} quantity
   * @returns {Promise<object>}
   */
  async addToCart(productId, quantity = 1) {
    const payload = {
      login: null,
      cartItems: [
        {
          product: { id: parseInt(productId, 10) },
          quantity: parseInt(quantity, 10)
        }
      ]
    };
    return await httpClient.post('/cart', payload, { authType: 'user' });
  },

  /**
   * Update quantity of a cart item
   * @param {number|string} idCI - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<object>}
   */
  async updateItemQuantity(idCI, quantity) {
    return await httpClient.put(`/cart/items/${idCI}`, null, {
      authType: 'user',
      params: { quantity }
    });
  },

  /**
   * Delete an item from the cart
   * @param {number|string} idCI - Cart item ID
   * @returns {Promise<object>}
   */
  async deleteCartItem(idCI) {
    return await httpClient.delete(`/cart/items/${idCI}`, { authType: 'user' });
  },

  /**
   * Clear all items in the cart
   * @param {Array<number|string>} idCIList
   * @returns {Promise<Array>}
   */
  async clearCart(idCIList = []) {
    return await Promise.all(idCIList.map(id => this.deleteCartItem(id)));
  },

  /**
   * Helper to compute total item count from cart data
   * @param {object} cartResponse - Raw API response or cart object
   * @returns {number}
   */
  calculateTotalItems(cartResponse) {
    if (!cartResponse) return 0;
    const cartObj = cartResponse.result || cartResponse;
    const items = cartObj.cartItems || [];
    return items.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  }
};
