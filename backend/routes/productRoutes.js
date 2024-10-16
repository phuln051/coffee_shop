const express = require('express');
const multer = require('multer'); // Import multer
const router = express.Router();
const productController = require('../controllers/productController');

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Đường dẫn nơi lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Đổi tên file
    }
});

const upload = multer({ storage }); // Tạo middleware multer

// Route để lấy danh sách sản phẩm
router.get('/', productController.getAllProducts);

// Route để thêm sản phẩm mới với ảnh
router.post('/', upload.single('image'), productController.createProduct); // Sử dụng middleware upload

// Route để lấy sản phẩm nổi bật
router.get('/featured', productController.getFeaturedProducts);

// Route để xóa một sản phẩm
router.delete('/:id', productController.deleteProduct);

// Route để sửa một sản phẩm
router.put('/:id', productController.updateProduct);

module.exports = router;
