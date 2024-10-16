import React, { useState } from 'react';
import styles from './Register.module.css'; // Sử dụng CSS Modules

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (password !== confirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, name, address, phone }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Đã xảy ra lỗi khi đăng ký.');
                return;
            }

            setSuccessMessage('Đăng ký thành công!');
            setError('');
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            setError('Tên đăng nhập hoặc email đã tồn tại.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Đăng ký người dùng</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Tên đăng nhập:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Mật khẩu:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Xác nhận mật khẩu:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Tên:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Địa chỉ:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Số điện thoại:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
