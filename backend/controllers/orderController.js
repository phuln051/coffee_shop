const Order = require('../models/orderModel');
const db = require('../config/db');

// Lấy danh sách đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: error.message });
    }
};

// Tạo đơn hàng
exports.placeOrder = async (req, res) => {
    const { customerName, customerEmail, customerPhone, customerAddress, cartItems, totalPrice } = req.body;

    try {
        await db.promise().beginTransaction();
        const orderId = await Order.createOrder(customerName, customerEmail, customerPhone, customerAddress, totalPrice);

        for (const item of cartItems) {
            await Order.createOrderDetails(orderId, item.product_id, item.quantity, item.price, item.product_name);
        }

        await db.promise().commit();
        res.status(201).json({ message: 'Đặt hàng thành công!' });
    } catch (error) {
        await db.promise().rollback();
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi đặt hàng.', error: error.message });
    }
};

// Lấy chi tiết đơn hàng theo ID
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
        const orderDetails = await Order.findOrderDetails(orderId);
        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn hàng.' });
        }
        res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn hàng', error: error.message });
    }
};

// Xóa đơn hàng theo orderId
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        await Order.deleteOrder(orderId);
        res.status(200).json({ message: 'Đơn hàng đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đơn hàng.', error: error.message });
    }
};

// Thay đổi trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const validStatuses = ['Pending', 'Delivered', 'Canceled']; // Danh sách trạng thái hợp lệ
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
        }

        await Order.updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Trạng thái đơn hàng đã được cập nhật.' });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng.', error: error.message });
    }
};
