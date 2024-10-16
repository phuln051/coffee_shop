// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const isLoggedIn = localStorage.getItem('username') !== null; // Kiểm tra xem người dùng đã đăng nhập chưa
    const userRole = localStorage.getItem('role'); // Lấy vai trò từ localStorage

    if (!isLoggedIn) {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        return <Navigate to="/login" />;
    }

    if (userRole !== requiredRole) {
        // Nếu người dùng không có vai trò yêu cầu, chuyển hướng về trang khác (ví dụ: trang chủ)
        return <Navigate to="/" />;
    }

    return children; // Nếu đủ điều kiện, hiển thị nội dung
};

export default ProtectedRoute;
