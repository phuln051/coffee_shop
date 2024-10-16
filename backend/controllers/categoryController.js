// controllers/categoryController.js
const Category = require('../models/categoryModel');

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const results = await Category.getAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách danh mục', error });
    }
};

// Thêm mới một danh mục
exports.createCategory = async (req, res) => {
    const { category_name } = req.body;
    if (!category_name) {
        return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
    }
    try {
        const results = await Category.create(category_name);
        res.status(201).json({ message: 'Thêm danh mục thành công', category_id: results.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm danh mục', error });
    }
};

// Xóa một danh mục
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await Category.delete(id);
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy danh mục' });
        } else {
            res.status(200).json({ message: 'Xóa danh mục thành công' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error });
    }
};

// Sửa một danh mục
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;
    if (!category_name) {
        return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
    }
    try {
        const results = await Category.update(id, category_name);
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy danh mục' });
        } else {
            res.status(200).json({ message: 'Cập nhật danh mục thành công' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error });
    }
};
