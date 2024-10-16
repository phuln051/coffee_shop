import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [openOrderId, setOpenOrderId] = useState(null); // State để theo dõi đơn hàng nào đang được mở
    const [newStatus, setNewStatus] = useState(''); // State để lưu trạng thái mới

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        if (openOrderId === orderId) {
            setOpenOrderId(null);
            setOrderDetails([]); // Reset chi tiết đơn hàng
            setNewStatus(''); // Reset trạng thái mới
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/orders/${orderId}/details`);
                setOrderDetails(response.data);
                setOpenOrderId(orderId);
                setNewStatus(response.data[0].status); // Thiết lập trạng thái hiện tại
            } catch (error) {
                console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
            }
        }
    };

    const handleDeleteOrder = async (orderId) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?');
        if (!confirmDelete) {
            return; // Nếu người dùng không xác nhận, thoát khỏi hàm
        }

        try {
            await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
            fetchOrders(); // Reload lại danh sách đơn hàng sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
        }
    };

    const handleChangeStatus = async (orderId) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
            fetchOrders(); // Reload lại danh sách đơn hàng sau khi thay đổi trạng thái
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái đơn hàng:', error);
        }
    };

    const calculateTotalPrice = () => {
        return orderDetails.reduce((total, detail) => total + (detail.price * detail.quantity), 0).toFixed(2);
    };

    return (
        <div className="order-list-container">
            <h2>Danh sách đơn hàng</h2>
            <ul className="order-list">
                {orders.map((order) => (
                    <li key={order.order_id} className="order-item">
                        <span>Đơn hàng #{order.order_code} - {order.customer_name}</span>
                        <button className="details-button" onClick={() => fetchOrderDetails(order.order_id)}>
                            {openOrderId === order.order_id ? 'Xem chi tiết' : 'Xem chi tiết'}
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteOrder(order.order_id)}>Xóa</button>
                        <div className="status-container">
                            <select 
                                value={openOrderId === order.order_id ? newStatus : order.status} 
                                onChange={(e) => setNewStatus(e.target.value)} 
                                disabled={openOrderId !== order.order_id} // Chỉ cho phép thay đổi trạng thái khi đơn hàng đang mở
                            >
                                <option value="Pending">Pending</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                            <button className="status-button" onClick={() => handleChangeStatus(order.order_id)}>
                                Cập nhật
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {openOrderId && orderDetails.length > 0 && (
                <div className="order-details">
                    <h3>Chi tiết đơn hàng</h3>
                    <p>Email: {orderDetails[0].customer_email}</p>
                    <p>Tên khách hàng: {orderDetails[0].customer_name}</p>
                    <p>Địa chỉ: {orderDetails[0].customer_address}</p>
                    <p>Số điện thoại: {orderDetails[0].customer_phone}</p>
                    <h4>Sản phẩm:</h4>
                    <ul>
                        {orderDetails.map((detail) => (
                            <li key={detail.order_detail_id}>
                               {detail.product_name} - Số lượng: {detail.quantity} - Giá: {detail.price} VND
                            </li>
                        ))}
                    </ul>
                    <h4>Tổng tiền: {calculateTotalPrice()} VND</h4>
                </div>
            )}
        </div>
    );
};

export default OrderList;
