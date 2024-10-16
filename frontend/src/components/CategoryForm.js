// src/components/CategoryForm.js
import React, { useState, useEffect } from 'react';

const CategoryForm = ({ categoryToEdit, onSubmit }) => {
    const [category, setCategory] = useState({ category_name: '' });

    useEffect(() => {
        if (categoryToEdit) {
            setCategory(categoryToEdit);
        }
    }, [categoryToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(category);
        setCategory({ category_name: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{categoryToEdit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</h2>
            <input
                type="text"
                name="category_name"
                value={category.category_name}
                onChange={handleChange}
                placeholder="Tên danh mục"
                required
            />
            <button type="submit">{categoryToEdit ? 'Cập nhật' : 'Thêm'}</button>
        </form>
    );
};

export default CategoryForm;