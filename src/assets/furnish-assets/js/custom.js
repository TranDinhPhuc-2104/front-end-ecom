
// Custom JS
document.addEventListener('DOMContentLoaded', () => {
  console.log('Bootstrap + Vite setup is ready!');

  const token = localStorage.getItem("token");

  // Hide cart icon if not logged in
  const cartIcon = document.querySelector('a[href="cart.html"]');
  if (cartIcon) {
    if (token) {
      cartIcon.style.display = "";
    } else {
      cartIcon.style.display = "none";
    }
  }

  // Check if logged in user has ADMIN role and render Admin Dashboard link
  if (token) {
    let isAdmin = false;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);

      // Quét tất cả các trường trong payload để tìm quyền ADMIN (ví dụ ROLE_: "admin")
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          const val = payload[key];
          if (typeof val === 'string' && val.toUpperCase().includes('ADMIN')) {
            isAdmin = true;
            break;
          }
          if (Array.isArray(val) && val.some(r => typeof r === 'string' && r.toUpperCase().includes('ADMIN'))) {
            isAdmin = true;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Lỗi giải mã token kiểm tra quyền Admin:", e);
    }

    if (isAdmin) {
      // Đồng bộ token sang accessToken cho Admin Dashboard
      localStorage.setItem('accessToken', token);

      // 1. Thêm link vào dropdown menu cá nhân
      const dropdownMenu = document.querySelector("ul[aria-labelledby='navbarDropdownMenu']");
      if (dropdownMenu && !dropdownMenu.querySelector(".admin-dashboard-link")) {
        const adminLi = document.createElement("li");
        adminLi.innerHTML = `
          <a class="dropdown-item py-2 text-primary fw-bold admin-dashboard-link" href="../admin/index.html">
            <i class="bi bi-shield-lock-fill text-primary me-1"></i> Admin Dashboard
          </a>
        `;
        // Insert right after the first item (My Profile)
        if (dropdownMenu.children.length > 1) {
          dropdownMenu.insertBefore(adminLi, dropdownMenu.children[1]);
        } else {
          dropdownMenu.appendChild(adminLi);
        }
      }

      // 2. Thêm link trực tiếp lên Header Menu (Navbar) của cả Desktop và Mobile
      const navbars = document.querySelectorAll(".navbar-nav");
      navbars.forEach(navbar => {
        // Bỏ qua nếu là dropdown menu
        if (navbar.classList.contains("dropdown-menu")) return;

        // Tránh trùng lặp
        if (!navbar.querySelector(".admin-header-link")) {
          const adminLi = document.createElement("li");
          adminLi.className = "nav-item";
          adminLi.innerHTML = `
            <a class="nav-link admin-header-link fw-bold text-primary" href="../admin/index.html">
              Admin Dashboard
            </a>
          `;
          navbar.appendChild(adminLi);
        }
      });
    }
  }
});
