import { httpClient } from './httpClient.js';

export const revenueService = {
  /**
   * Admin: Get revenue statistics
   * @param {string} dateString - Format YYYY-MM-DD
   * @param {'date'|'month'|'year'} type - Aggregation type
   * @returns {Promise<object>} ApiResponse with revenue details and chartData
   */
  async getRevenue(dateString, type = 'date') {
    return await httpClient.get('/revenue', { date: dateString, type }, { authType: 'admin' });
  }
};
