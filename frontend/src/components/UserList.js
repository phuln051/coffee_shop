import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h2>Danh sách người dùng</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
