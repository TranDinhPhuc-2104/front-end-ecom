import { authService } from './auth.service.js';
import { userService } from './user.service.js';
import { cartService } from './cart.service.js';

export const uiHelper = {
  /**
   * Updates the navbar greeting with the user's first name
   */
  async updateNavGreeting() {
    const greetingEl = document.getElementById('nav-greeting');
    const authLink = document.getElementById('auth-link');
    const token = authService.getUserToken();

    if (!token) {
      if (greetingEl) greetingEl.classList.add('d-none');
      if (authLink) {
        authLink.innerText = 'Login';
        authLink.href = 'login.html';
        authLink.classList.remove('text-danger');
        authLink.onclick = null;
      }
      return;
    }

    try {
      const response = await userService.getProfile();
      const user = response?.result || {};
      const firstName = user.firstName || 'Bạn';

      if (greetingEl) {
        greetingEl.innerHTML = `Hi, <span class="text-dark">${firstName}</span> 👋`;
        greetingEl.classList.remove('d-none');
      }

      if (authLink) {
        authLink.innerText = 'Logout';
        authLink.classList.add('text-danger');
        authLink.href = 'javascript:void(0);';
        authLink.onclick = (e) => {
          e?.preventDefault?.();
          authService.logoutUser();
          window.location.href = 'index.html';
        };
      }
    } catch (error) {
      console.warn('Không thể đồng bộ thông tin người dùng lên navbar:', error);
    }
  },

  /**
   * Syncs the shopping cart badge count with the server
   */
  async updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    const token = authService.getUserToken();

    if (!cartBadge || !token) {
      if (cartBadge) cartBadge.innerText = '0';
      return;
    }

    try {
      const response = await cartService.getCart();
      const totalCount = cartService.calculateTotalItems(response);
      cartBadge.innerText = totalCount;
    } catch (error) {
      console.warn('Không thể cập nhật badge giỏ hàng từ máy chủ:', error);
    }
  },

  /**
   * Renders the login / logout button state in the navbar dropdown
   */
  renderAuthMenu() {
    const authLink = document.getElementById('auth-link');
    const token = authService.getUserToken();

    if (!authLink) return;

    if (token) {
      authLink.innerText = 'Logout';
      authLink.classList.add('text-danger');
      authLink.onclick = (e) => {
        e?.preventDefault?.();
        authService.logoutUser();
        window.location.href = 'index.html';
      };
    } else {
      authLink.innerText = 'Login';
      authLink.classList.remove('text-danger');
      authLink.onclick = () => {
        window.location.href = 'login.html';
      };
    }
  },

  /**
   * Initializes all standard navbar elements in one single call
   */
  initCustomerNavbar() {
    this.renderAuthMenu();
    this.updateNavGreeting();
    this.updateCartBadge();
  }
};
