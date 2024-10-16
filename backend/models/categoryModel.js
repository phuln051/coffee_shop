// models/categoryModel.js
const db = require('../config/db');

// Lấy tất cả danh mục
exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories';
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Thêm mới một danh mục
exports.create = (category_name) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO categories (category_name) VALUES (?)';
        db.query(query, [category_name], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Xóa một danh mục
exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM categories WHERE category_id = ?';
        db.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Cập nhật một danh mục
exports.update = (id, category_name) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE categories SET category_name = ? WHERE category_id = ?';
        db.query(query, [category_name, id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
