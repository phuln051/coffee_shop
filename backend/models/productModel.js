const db = require('../config/db');

// Lấy tất cả các products
const getAllProducts = (callback) => {
    const sql = 'SELECT * FROM products'; // Thay 'products' bằng tên bảng sản phẩm của bạn
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = {
    getAllProducts
};
