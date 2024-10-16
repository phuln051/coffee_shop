import React, { useEffect, useState } from 'react';
import './Shop.css'; // Import CSS

const Home = ({ addToCart }) => {  // Nhận hàm addToCart từ props
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const productsPerPage = 12;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const fetchProducts = async (category_id = null, page = 1) => {
        setLoading(true);
        try {
            let url = `http://localhost:5000/api/products?limit=${productsPerPage}&page=${page}`;
            if (category_id) {
                url += `&category_id=${category_id}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.slice((page - 1) * productsPerPage, page * productsPerPage));
            setTotalPages(Math.ceil(data.length / productsPerPage));
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
            setLoading(false);
        }
    };

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products?featured=1');
            const data = await response.json();
            setFeaturedProducts(data.slice(0, 4));
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm nổi bật:', error);
        }
    };

    const handleCategoryClick = (category_id) => {
        setSelectedCategory(category_id);
        setCurrentPage(1);
        fetchProducts(category_id, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchProducts(selectedCategory, page);
    };

    useEffect(() => {
        fetchProducts(null, currentPage);
        fetchFeaturedProducts();
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <nav>
                    <ul className="menu">
                        <li>
                            <button onClick={() => handleCategoryClick(null)}>Tất cả sản phẩm</button>
                        </li>
                        {categories.map((category) => (
                            <li key={category.category_id}>
                                <button onClick={() => handleCategoryClick(category.category_id)}>
                                    {category.category_name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <section className="products">
                {loading ? (
                    <p>Đang tải sản phẩm...</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.product_id} className="product-item">
                            <img src={`http://localhost:5000/${product.image}`} alt={product.product_name} />
                            <h2>{product.product_name}</h2>
                            <p>{product.description}</p>
                            <p><strong>Giá:</strong> {product.price} VND</p>
                            <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button> {/* Nút thêm sản phẩm vào giỏ hàng */}
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </section>

            <div className="pagination">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Trang trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Trang sau
                </button>
            </div>

            <section className="featured-products">
                <h2>Sản phẩm nổi bật</h2>
                {featuredProducts.length > 0 ? (
                    featuredProducts.map((product) => (
                        <div key={product.product_id} className="product-item">
                            <img src={`http://localhost:5000/${product.image}`} alt={product.product_name} />
                            <h2>{product.product_name}</h2>
                            <p>{product.description}</p>
                            <p><strong>Giá:</strong> {product.price} VND</p>
                            <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button> {/* Nút thêm sản phẩm nổi bật vào giỏ hàng */}
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nổi bật.</p>
                )}
            </section>
        </div>
    );
};

export default Home;
