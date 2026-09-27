(function () {
    // Lấy token đã lưu từ LocalStorage khi login thành công
    const token = localStorage.getItem('accessToken');

    // Nếu không có token, chuyển hướng ngay lập tức về trang login
    if (!token) {
        // Điều chỉnh đường dẫn tương đối cho đúng với cấu trúc thư mục của bạn
        // Ví dụ này giả định trang hiện tại nằm ở một thư mục con, cần quay ra để vào sign-in.html
        alert("Bạn cần đăng nhập để truy cập trang này!");
        window.location.href = "pages/authentication/sign-in.html"; // Sửa lại đường dẫn này cho đúng thực tế
    }
})();