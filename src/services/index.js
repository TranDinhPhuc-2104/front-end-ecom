import { API_CONFIG } from './api.config.js';
import { httpClient, TokenManager, ApiError } from './httpClient.js';
import { authService } from './auth.service.js';
import { userService } from './user.service.js';
import { productService } from './product.service.js';
import { categoryService } from './category.service.js';
import { cartService } from './cart.service.js';
import { orderService } from './order.service.js';
import { revenueService } from './revenue.service.js';
import { uiHelper } from './ui.helper.js';

// Export all modules
export {
  API_CONFIG,
  httpClient,
  TokenManager,
  ApiError,
  authService,
  userService,
  productService,
  categoryService,
  cartService,
  orderService,
  revenueService,
  uiHelper
};

// Bind to window for easy access in traditional script tags
if (typeof window !== 'undefined') {
  window.API_CONFIG = API_CONFIG;
  window.httpClient = httpClient;
  window.TokenManager = TokenManager;
  window.ApiError = ApiError;
  window.authService = authService;
  window.userService = userService;
  window.productService = productService;
  window.categoryService = categoryService;
  window.cartService = cartService;
  window.orderService = orderService;
  window.revenueService = revenueService;
  window.uiHelper = uiHelper;

  window.Services = {
    API_CONFIG,
    httpClient,
    TokenManager,
    ApiError,
    authService,
    userService,
    productService,
    categoryService,
    cartService,
    orderService,
    revenueService,
    uiHelper
  };
}
