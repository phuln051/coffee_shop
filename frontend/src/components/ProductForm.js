import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ productToEdit, onSubmit }) => {
    const [product, setProduct] = useState({ product_name: '', price: '', description: '', category_id: '' });
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null); // Thêm state để lưu trữ ảnh

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        }
        fetchCategories();
    }, [productToEdit]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách danh mục:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Lưu trữ file ảnh được chọn
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Sử dụng FormData để gửi file

        formData.append('product_name', product.product_name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('category_id', product.category_id);
        if (image) {
            formData.append('image', image); // Thêm file ảnh vào FormData
        }

        try {
            await onSubmit(formData); // Gọi hàm onSubmit với FormData
            setProduct({ product_name: '', price: '', description: '', category_id: '' });
            setImage(null); // Reset image
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{productToEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Giá sản phẩm"
                required
            />
            <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm"
            />
            <select
                name="category_id"
                value={product.category_id}
                onChange={handleChange}
                required
            >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                    </option>
                ))}
            </select>
            <input
                type="file"
                accept="image/*" // Chỉ cho phép ảnh
                onChange={handleImageChange}
                required
            />
            <button type="submit">{productToEdit ? 'Cập nhật' : 'Thêm'}</button>
        </form>
    );
};

export default ProductForm;
