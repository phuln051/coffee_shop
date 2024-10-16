import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Đảm bảo file CSS tồn tại và được sử dụng

const Header = ({ cartItems = [], setCartItems, username, setUsername, onRemoveItem }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUsername(null);
        setCartItems([]);
    };

    const handleCheckout = () => navigate('/checkout');

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <header className="header">
            <div className="logo"><h1>Your Logo</h1></div>
            <nav className="nav">
                <ul>
                    {['Home', 'Shop', 'Page', 'About'].map((item) => (
                        <li key={item}><a href={`/${item.toLowerCase()}`}>{item}</a></li>
                    ))}
                </ul>
            </nav>
            <div className="cart-container">
                <button className="cart-button" onClick={toggleCart}>
                    Giỏ hàng ({totalItems})
                </button>

                {isCartOpen && (
                    <div className="cart-dropdown">
                        <h3>Giỏ hàng của bạn</h3>
                        {totalItems > 0 ? (
                            <>
                                <ul>
                                    {cartItems.map(({ id, product_name, quantity, price }) => (
                                        <li key={id} className="cart-item">
                                            <span>{product_name}</span>
                                            <span>{quantity} x {price} VND</span>
                                            <button className="remove-button" onClick={() => onRemoveItem(product_name)}>
                                                Xóa
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="cart-summary">
                                    <p>Tổng số lượng: {totalItems}</p>
                                    <p>Tổng tiền: {totalPrice} VND</p>
                                </div>
                                <button className="checkout-button" onClick={handleCheckout}>Thanh toán</button>
                            </>
                        ) : (
                            <p>Giỏ hàng trống.</p>
                        )}
                    </div>
                )}
            </div>
            {username && (
                <div className="user-info">
                    <span>Xin chào, {username}!</span>
                    <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
                </div>
            )}
        </header>
    );
};

export default Header;
