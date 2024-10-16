const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route để lấy danh sách đơn hàng
router.get('/', orderController.getAllOrders);

// Route để lấy chi tiết đơn hàng theo ID
router.get('/:orderId/details', orderController.getOrderDetails);

// Route để tạo đơn hàng
router.post('/', orderController.placeOrder);

// Route để xóa đơn hàng
router.delete('/:orderId', orderController.deleteOrder);

// Route để thay đổi trạng thái đơn hàng
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
