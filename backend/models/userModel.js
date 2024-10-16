const db = require('../config/db');

class User {
    // Phương thức để tạo một người dùng mới
    static async create({ username, email, password, name, address, phone, role = 'user' }) {
        const query = 'INSERT INTO users (username, email, password, name, address, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.promise().query(query, [username, email, password, name, address, phone, role]);
        return result.insertId; // Trả về ID của người dùng vừa tạo
    }

    // Phương thức để tìm người dùng theo tên đăng nhập
    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [results] = await db.promise().query(query, [username]);
        return results[0]; // Trả về người dùng đầu tiên tìm thấy hoặc undefined
    }

    // Phương thức để tìm người dùng theo ID
    static async findById(userId) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [results] = await db.promise().query(query, [userId]);
        return results[0]; // Trả về người dùng đầu tiên tìm thấy hoặc undefined
    }

    // Phương thức để lấy danh sách tất cả người dùng
    static async findAll() {
        const query = 'SELECT * FROM users';
        const [results] = await db.promise().query(query);
        return results; // Trả về danh sách người dùng
    }

    // Phương thức để cập nhật thông tin người dùng
    static async update(userId, data) {
        const { username, email, name, address, phone, role } = data;
        const query = 'UPDATE users SET username = ?, email = ?, name = ?, address = ?, phone = ?, role = ? WHERE id = ?';
        await db.promise().query(query, [username, email, name, address, phone, role, userId]);
    }
}

module.exports = User;
