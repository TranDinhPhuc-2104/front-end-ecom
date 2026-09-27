import { API_CONFIG } from './api.config.js';

/**
 * Custom Error Class for API responses
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Token manager for User and Admin sessions
 */
export const TokenManager = {
  getUserToken() {
    return localStorage.getItem(API_CONFIG.USER_TOKEN_KEY);
  },
  setUserToken(token) {
    if (token) {
      localStorage.setItem(API_CONFIG.USER_TOKEN_KEY, token);
    }
  },
  removeUserToken() {
    localStorage.removeItem(API_CONFIG.USER_TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.USER_ACCOUNT_ID_KEY);
  },

  getAdminToken() {
    return localStorage.getItem(API_CONFIG.ADMIN_TOKEN_KEY);
  },
  setAdminToken(token) {
    if (token) {
      localStorage.setItem(API_CONFIG.ADMIN_TOKEN_KEY, token);
    }
  },
  removeAdminToken() {
    localStorage.removeItem(API_CONFIG.ADMIN_TOKEN_KEY);
  },

  clearAll() {
    this.removeUserToken();
    this.removeAdminToken();
  }
};

/**
 * Core HTTP Client based on native fetch
 */
export const httpClient = {
  /**
   * Builds the full URL with query parameters
   */
  buildUrl(endpoint, params = {}) {
    const baseUrl = (API_CONFIG.BASE_URL || '').replace(/\/+$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${baseUrl}${cleanEndpoint}`;

    const queryKeys = Object.keys(params).filter(
      key => params[key] !== undefined && params[key] !== null && params[key] !== ''
    );

    if (queryKeys.length > 0) {
      const queryString = queryKeys
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    return url;
  },

  /**
   * Main request method
   * @param {string} endpoint - API route (e.g. '/product', '/cart')
   * @param {object} options - Request options
   *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE'
   *   - params: query parameters object
   *   - body: payload data object
   *   - authType: 'user' | 'admin' | 'auto' | 'none' (default: 'auto')
   *   - headers: custom headers
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      params = {},
      body = null,
      authType = 'auto',
      headers = {},
      ...customConfig
    } = options;

    const url = this.buildUrl(endpoint, params);

    // Determine authentication header
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    let token = null;
    if (authType === 'admin') {
      token = TokenManager.getAdminToken();
    } else if (authType === 'user') {
      token = TokenManager.getUserToken();
    } else if (authType === 'auto') {
      // Prioritize adminToken if in admin area or accessToken exists, otherwise user token
      token = TokenManager.getAdminToken() || TokenManager.getUserToken();
    }

    if (token && authType !== 'none') {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers: requestHeaders,
      ...customConfig,
    };

    if (body !== null && body !== undefined) {
      if (typeof body === 'string') {
        config.body = body;
      } else if (body instanceof FormData) {
        delete requestHeaders['Content-Type']; // Let browser set boundary
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, config);

      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage = (data && data.message)
          || (data && data.error)
          || (typeof data === 'string' && data)
          || `Request failed with status ${response.status}`;

        throw new ApiError(errorMessage, response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message || 'Lỗi kết nối tới máy chủ API', 0, null);
    }
  },

  get(endpoint, params = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET', params });
  },

  post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  },

  put(endpoint, body = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
};
