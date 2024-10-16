import React, { useState } from 'react';
import Shop from './Shop';  // Import Shop
import Checkout from './Checkout';  // Import Checkout

const Home = ({ cartItems, setCartItems }) => {
    const [currentView, setCurrentView] = useState('home'); // Trạng thái để lưu trữ view hiện tại

    // Hàm để thay đổi view
    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    // Hàm để render nội dung dựa trên trạng thái currentView
    const renderContent = () => {
        switch (currentView) {
            case 'shop':
                return <Shop addToCart={(product) => setCartItems([...cartItems, product])} />;
            case 'checkout':
                return <Checkout cartItems={cartItems} />;
            default:
                return <div>Trang chủ: Welcome to the Home Page!</div>;
        }
    };

    return (
        <div>
            {/* Hiển thị nội dung ở giữa */}
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default Home;
