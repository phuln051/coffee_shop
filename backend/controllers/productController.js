const db = require('../config/db');

// Lấy tất cả sản phẩm
exports.getAllProducts = (req, res) => {
    const { category_id } = req.query; // Lấy category_id từ query params
    let query = `
        SELECT products.*, categories.category_name 
        FROM products 
        JOIN categories ON products.category_id = categories.category_id
    `;
    
    // Nếu có category_id, lọc sản phẩm theo danh mục
    if (category_id) {
        query += ` WHERE products.category_id = ?`;
    }

    db.query(query, [category_id], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error });
        } else {
            res.status(200).json(results);
        }
    });
};

// Lấy sản phẩm nổi bật
exports.getFeaturedProducts = (req, res) => {
    const limit = parseInt(req.query.limit) || 5; // Số lượng sản phẩm mỗi trang
    const page = parseInt(req.query.page) || 1; // Trang hiện tại
    const offset = (page - 1) * limit; // Tính toán offset

    const query = `
        SELECT COUNT(*) AS total 
        FROM products 
        WHERE featured = 1;
    `;

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Lỗi khi lấy tổng sản phẩm nổi bật', error });
        }

        const total = results[0].total; // Lấy tổng số sản phẩm
        const totalPages = Math.ceil(total / limit); // Tính số trang

        const productsQuery = `
            SELECT products.*, categories.category_name 
            FROM products 
            JOIN categories ON products.category_id = categories.category_id 
            WHERE products.featured = 1 
            LIMIT ? OFFSET ?;
        `;

        db.query(productsQuery, [limit, offset], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Lỗi khi lấy sản phẩm nổi bật', error });
            } else {
                res.status(200).json({
                    products: results,
                    totalPages: totalPages // Tổng số trang
                });
            }
        });
    });
};

// Thêm mới một sản phẩm
exports.createProduct = (req, res) => {
    const { product_name, price, description, category_id } = req.body;
    const image = req.file ? req.file.path : null; // Lấy đường dẫn file ảnh

    // Kiểm tra xem tất cả các trường có được cung cấp hay không
    if (!product_name || !price || !category_id || !image) {
        return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' });
    }

    const query = 'INSERT INTO products (product_name, price, description, category_id, image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [product_name, price, description, category_id, image], (error, results) => {
        if (error) {
            console.error('Lỗi khi lưu sản phẩm:', error); // Log chi tiết lỗi
            return res.status(500).json({ message: 'Lỗi khi lưu sản phẩm', error });
        } else {
            res.status(201).json({ message: 'Thêm sản phẩm thành công', product_id: results.insertId });
        }
    });
};

// Xóa một sản phẩm
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE product_id = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        } else {
            res.status(200).json({ message: 'Xóa sản phẩm thành công' });
        }
    });
};

// Sửa một sản phẩm
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { product_name, price, description, category_id } = req.body;
    const query = 'UPDATE products SET product_name = ?, price = ?, description = ?, category_id = ? WHERE product_id = ?';
    db.query(query, [product_name, price, description, category_id, id], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        } else {
            res.status(200).json({ message: 'Cập nhật sản phẩm thành công' });
        }
    });
};
