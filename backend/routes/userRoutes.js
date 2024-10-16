    const express = require('express');
    const router = express.Router();
    const userController = require('../controllers/userController');

    // Route để lấy danh sách người dùng
    router.get('/', userController.getAllUsers);

    // Route để đăng ký người dùng mới
    router.post('/register', userController.register);

    // Route để đăng nhập
    router.post('/login', userController.login);

    // Route để lấy thông tin người dùng theo userId
    router.get('/:userId', userController.getUserById); // Cần đảm bảo userId được xác thực

    module.exports = router;
