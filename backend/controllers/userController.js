const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Controller để lấy danh sách người dùng từ MySQL thông qua model
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error });
    }
};

// Controller để đăng ký người dùng mới
exports.register = async (req, res) => {
    const { username, email, password, name, address, phone } = req.body;
    console.log('Received data:', { username, email, password, name, address, phone });

    // Kiểm tra thiếu dữ liệu yêu cầu
    if (!username || !email || !password || !name || !address || !phone) {
        return res.status(400).json({ message: 'Thiếu dữ liệu yêu cầu' });
    }

    try {
        // Kiểm tra xem username đã tồn tại chưa
        const userExists = await User.findByUsername(username);
        if (userExists) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        // Mã hóa mật khẩu trước khi lưu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới với username, email, hashedPassword, name, address, phone
        await User.create({
            username,
            email,
            password: hashedPassword,
            name,
            address,
            phone
        });

        res.status(201).json({ message: 'Đăng ký người dùng thành công' });
    } catch (error) {
        console.error('Lỗi khi tạo người dùng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tạo người dùng', error: error.message });
    }
};

// Controller để đăng nhập người dùng
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tìm người dùng theo username
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Tên đăng nhập không tồn tại' });
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        // Trả về thông tin người dùng khi đăng nhập thành công
        res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                name: user.name,
                address: user.address,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
};

// Controller để lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        // Tìm người dùng theo userId   
        const user = await User.findById(userId);
        console.log('User data:', user);
        
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Trả về thông tin người dùng
        res.status(200).json(user);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: error.message });
    }
};
