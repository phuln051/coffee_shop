const db = require('../config/db');

class Order {
    // Phương thức để tạo một đơn hàng mới
    static async createOrder(customerName, customerEmail, customerPhone, customerAddress, total) {
        const orderCode = `ORD-${Date.now()}`; // Tạo mã đơn hàng duy nhất
        const query = 'INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total, order_code, status) VALUES (?, ?, ?, ?, ?, ?, "Pending")'; // Mặc định trạng thái là 'Pending'
        const [result] = await db.promise().query(query, [customerName, customerEmail, customerPhone, customerAddress, total, orderCode]);
        return result.insertId; // Trả về ID của đơn hàng vừa tạo
    }

    // Phương thức để thêm chi tiết đơn hàng
    static async createOrderDetails(orderId, productId, quantity, price, productName) {
        const totalPrice = quantity * price; // Tính tổng tiền cho chi tiết đơn hàng
        const query = 'INSERT INTO order_details (order_id, product_id, quantity, price, product_name, total_price) VALUES (?, ?, ?, ?, ?, ?)';
        await db.promise().query(query, [orderId, productId, quantity, price, productName, totalPrice]);
    }

    // Phương thức để lấy danh sách đơn hàng
    static async findAll() {
        const query = 'SELECT * FROM orders';
        const [results] = await db.promise().query(query);
        return results;
    }

    // Phương thức để lấy chi tiết đơn hàng
    static async findOrderDetails(orderId) {
        const query = `
            SELECT od.*, o.customer_name, o.customer_email, o.customer_phone, o.customer_address
            FROM order_details od
            JOIN orders o ON od.order_id = o.order_id
            WHERE od.order_id = ?`;
        const [results] = await db.promise().query(query, [orderId]);
        return results;
    }

    // Xóa đơn hàng
    static async deleteOrder(orderId) {
        const query = 'DELETE FROM orders WHERE order_id = ?';
        await db.promise().query(query, [orderId]);
    }

    // Cập nhật trạng thái đơn hàng
    static async updateOrderStatus(orderId, status) {
        const query = 'UPDATE orders SET status = ? WHERE order_id = ?';
        await db.promise().query(query, [status, orderId]);
    }
}

module.exports = Order;
