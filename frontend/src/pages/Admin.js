import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import OrderList from '../components/OrderList'; 
import UserList from '../components/UserList';   
import axios from 'axios';
import './Admin.css';

const Admin = () => {
    const [currentSection, setCurrentSection] = useState('products');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
    };

    const handleSubmit = async (product) => {
        try {
            if (product.product_id) {
                await axios.put(`http://localhost:5000/api/products/${product.product_id}`, product);
            } else {
                await axios.post('http://localhost:5000/api/products', product);
            }
            setShowForm(false);
            await fetchProducts(); // Update the product list
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            await fetchProducts(); // Update the product list
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    const handleSubmitCategory = async (category) => {
        try {
            if (category.category_id) {
                await axios.put(`http://localhost:5000/api/categories/${category.category_id}`, category);
            } else {
                await axios.post('http://localhost:5000/api/categories', category);
            }
            setShowCategoryForm(false);
            await fetchCategories(); // Update the category list
        } catch (error) {
            console.error('Lỗi khi lưu danh mục:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            await fetchCategories(); // Update the category list
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
        }
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'products':
                return (
                    <div className="section-container">
                        <button className="add-button" onClick={() => {
                            setProductToEdit(null);
                            setShowForm(true);
                        }}>Thêm sản phẩm mới</button>
                        {showForm && (
                            <ProductForm productToEdit={productToEdit} onSubmit={handleSubmit} />
                        )}
                        <ProductList products={products} onEdit={setProductToEdit} onDelete={handleDelete} />
                    </div>
                );
            case 'categories':
                return (
                    <div className="section-container">
                        <button className="add-button" onClick={() => {
                            setCategoryToEdit(null);
                            setShowCategoryForm(true);
                        }}>Thêm danh mục mới</button>
                        {showCategoryForm && (
                            <CategoryForm categoryToEdit={categoryToEdit} onSubmit={handleSubmitCategory} />
                        )}
                        <CategoryList categories={categories} onEdit={setCategoryToEdit} onDelete={handleDeleteCategory} />
                    </div>
                );
            case 'orders':
                return (
                    <div className="section-container">
                        <OrderList /> {/* Sử dụng component OrderList */}
                    </div>
                );
            case 'users':
                return (
                    <div className="section-container">
                        <UserList /> {/* Sử dụng component UserList */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Trang quản trị</h1>
            <nav className="admin-nav">
                <button className="nav-button" onClick={() => setCurrentSection('products')}>Quản lý sản phẩm</button>
                <button className="nav-button" onClick={() => setCurrentSection('categories')}>Quản lý danh mục</button>
                <button className="nav-button" onClick={() => setCurrentSection('orders')}>Quản lý đơn hàng</button>
                <button className="nav-button" onClick={() => setCurrentSection('users')}>Quản lý người dùng</button>
            </nav>
            <div className="admin-content">{renderSection()}</div>
        </div>
    );
};

export default Admin;
