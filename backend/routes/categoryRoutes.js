// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route để lấy danh sách danh mục
router.get('/', categoryController.getAllCategories);

// Route để thêm danh mục mới
router.post('/', categoryController.createCategory);

// Route để xóa một danh mục
router.delete('/:id', categoryController.deleteCategory);

// Route để sửa một danh mục
router.put('/:id', categoryController.updateCategory);

module.exports = router;