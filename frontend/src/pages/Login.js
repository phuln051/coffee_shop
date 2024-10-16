import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsername }) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameInput, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Đã xảy ra lỗi khi đăng nhập.');
                return;
            }

            const data = await response.json();
            const { id, username, name, email, phone, address, role } = data.user;

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem('userId', id);
            localStorage.setItem('username', username);
            localStorage.setItem('customerName', name);
            localStorage.setItem('customerPhone', phone);
            localStorage.setItem('customerAddress', address);
            localStorage.setItem('customerEmail', email);
            localStorage.setItem('role', role); // Lưu vai trò vào localStorage

            // Kiểm tra thông tin đã lưu
            console.log('User info saved:', {
                id,
                username,
                name,
                email,
                phone,
                address,
                role,
            });

            setUsername(username);

            // Điều hướng dựa trên vai trò
            if (role === 'user') {
                navigate('/shop');
            } else if (role === 'admin') {
                navigate('/admin');
            }

        } catch (error) {
            console.error('Error:', error);
            setError('Đã xảy ra lỗi khi đăng nhập.');
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Tên đăng nhập:
                    <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Mật khẩu:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
