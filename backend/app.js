const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // Routes người dùng
const orderRoutes = require('./routes/orderRoutes'); // Routes cho đơn hàng
dotenv.config(); // Load biến môi trường từ file .env

const app = express();

// Middleware
app.use(cors()); // Cấu hình CORS để cho phép yêu cầu từ mọi nguồn gốc
app.use(express.json()); // Middleware để phân tích dữ liệu JSON từ yêu cầu

// Sử dụng các routes
app.use('/api/categories', categoryRoutes); // Routes cho danh mục
app.use('/api/products', productRoutes);    // Routes cho sản phẩm
app.use('/api/users', userRoutes);          // Routes cho người dùng
app.use('/api/orders', orderRoutes);        // Routes cho đơn hàng
app.use('/uploads', express.static('uploads'));

// Xử lý lỗi 404 khi không tìm thấy route
app.use((req, res, next) => {
    res.status(404).json({ message: 'Không tìm thấy tài nguyên' });
});

// Xử lý lỗi tổng quát
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
