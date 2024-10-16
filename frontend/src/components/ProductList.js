import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './ProductList.css';  // Assuming you'll add custom styling in a separate CSS file

const ProductList = ({ onEdit, onDelete }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Danh Sách Sản Phẩm</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Hành động</th> {/* Cột hành động */}
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id} className="product-row">
                            <td>
                                <img
                                    src={`http://localhost:5000/${product.image}`}
                                    alt={product.product_name}
                                    className="product-image"
                                />
                            </td>
                            <td>{product.product_name}</td>
                            <td>{product.price} VNĐ</td>
                            <td>{product.description}</td>
                            <td>
                                <button onClick={() => onEdit(product)} className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} /> {/* Icon "Sửa" */}
                                </button>
                                <button onClick={() => onDelete(product.product_id)} className="delete-button">
                                    <FontAwesomeIcon icon={faTrash} /> {/* Icon "Xóa" */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
