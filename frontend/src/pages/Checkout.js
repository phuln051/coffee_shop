import React, { useState, useEffect } from 'react';

const Checkout = ({ cartItems }) => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('customerName');
        const storedEmail = localStorage.getItem('customerEmail');
        const storedPhone = localStorage.getItem('customerPhone');
        const storedAddress = localStorage.getItem('customerAddress');

        if (storedName) setCustomerName(storedName);
        if (storedEmail) setCustomerEmail(storedEmail);
        if (storedPhone) setCustomerPhone(storedPhone);
        if (storedAddress) setCustomerAddress(storedAddress);
    }, []);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
             body: JSON.stringify({
                customerName,
                customerEmail,
                customerPhone,
                customerAddress,
                cartItems: cartItems.map(item => ({
                    product_id: item.product_id, // Lấy ID sản phẩm
                    product_name: item.product_name, // Lấy tên sản phẩm
                    quantity: item.quantity, // Lấy số lượng
                    price: item.price // Lấy giá
                })),
                totalPrice,
            }),
        });
            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Đã xảy ra lỗi khi đặt hàng.');
                return;
            }

            const data = await response.json();
            setSuccess('Đặt hàng thành công!');

            // Reset thông tin khách hàng sau khi đặt hàng thành công
            setCustomerName('');
            setCustomerEmail('');
            setCustomerPhone('');
            setCustomerAddress('');
        } catch (error) {
            console.error('Error:', error);
            setError('Đã xảy ra lỗi khi đặt hàng.');
        }
    };

    return (
        <div>
            <h1>Thanh toán</h1>
            {totalItems > 0 ? (
                <div>
                    <h2>Giỏ hàng của bạn</h2>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                {item.product_name} - {item.quantity} x {item.price} VND
                            </li>
                        ))}
                    </ul>
                    <h3>Tổng tiền: {totalPrice} VND</h3>

                    <h3>Nhập thông tin để đặt hàng</h3>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <form onSubmit={handleOrderSubmit}>
                        <label>
                            Tên:
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Điện thoại:
                            <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Địa chỉ:
                            <input
                                type="text"
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Đặt hàng</button>
                    </form>

                    <button onClick={() => alert('Chức năng thanh toán chưa được triển khai.')}>Thanh toán</button>
                </div>
            ) : (
                <p>Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
            )}
        </div>
    );
};

export default Checkout;
