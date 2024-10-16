import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Checkout from './pages/Checkout'; // Import Checkout page
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]); // Trạng thái giỏ hàng
    const [username, setUsername] = useState(localStorage.getItem('username') || null); // Lưu trạng thái username

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProductIndex = prevItems.findIndex(item => item.product_name === product.product_name);
            if (existingProductIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingProductIndex].quantity += 1;
                return updatedItems;
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

  
    const onRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter(item => item.product_name !== id)); // Sử dụng product_name hoặc ID của sản phẩm
    };
    

    return (
        <Router>
            {/* Chỉ hiển thị Header nếu không phải trang Admin */}
            {window.location.pathname !== '/admin' && (
                <Header
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    username={username}
                    setUsername={setUsername}
                    onRemoveItem={onRemoveItem} // Truyền hàm vào đây
                />
            )}
            <Routes>
                <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                <Route path="/checkout" element={<Checkout cartItems={cartItems} />} /> {/* Route cho Checkout */}
                <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin">
                        <Admin />
                    </ProtectedRoute>
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUsername={setUsername} />} />
            </Routes>
            {/* Chỉ hiển thị Footer nếu không phải trang Admin */}
            {window.location.pathname !== '/admin' && <Footer />}
        </Router>
    );
}

export default App;
