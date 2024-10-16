// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './CategoryList.css';  // Assuming you'll add custom styling in a separate CSS file

const CategoryList = ({ onEdit, onDelete }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách danh mục:', error);
        }
    };

    return (
        <div className="category-list-container">
            <h2 className="category-list-title">Danh sách danh mục</h2>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.category_id} className="category-item">
                        <span>{category.category_name}</span>
                        <div className="category-actions">
                            <button className="edit-button" onClick={() => onEdit(category)}>
                                <FontAwesomeIcon icon={faEdit} /> Sửa
                            </button>
                            <button className="delete-button" onClick={() => onDelete(category.category_id)}>
                                <FontAwesomeIcon icon={faTrash} /> Xóa
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
