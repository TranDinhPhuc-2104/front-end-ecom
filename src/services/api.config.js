/**
 * API Configuration
 * Centralized settings for backend API connectivity
 */
export const API_CONFIG = {
  // Can be configured via environment variable VITE_API_BASE_URL or defaults to localhost:8080
  BASE_URL: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : 'http://localhost:8080',
  
  // Storage keys for authentication tokens
  USER_TOKEN_KEY: 'token',
  ADMIN_TOKEN_KEY: 'accessToken',
  USER_ACCOUNT_ID_KEY: 'idAccount',
  
  // Request timeout in milliseconds
  TIMEOUT: 15000,
};
