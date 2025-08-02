import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Pagination from "react-js-pagination";
import MetaData from "../../more/MetaData";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import "./Product.css";

const categories = [
  "Sneakers",
    "Boots",
    "Formal Shoes",
    "Sandals",
    "Loafers",
    "Slippers"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (selectedCategory) => {
    console.log("Category clicked:", selectedCategory);

    if (activeCategory === selectedCategory) {
      setCategory("");
      setActiveCategory("");
    } else {
      setCategory(selectedCategory);
      setActiveCategory(selectedCategory);
    }
    
    // Reset to first page when changing category
    setCurrentPage(1);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    
    // Prevent scrolling when sidebar is open on mobile
    if (!sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('sidebar-overlay')) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    
    console.log("Fetching products with category:", category);
    dispatch(getProduct(keyword, currentPage, category));
    
  }, [dispatch, keyword, currentPage, category, error]);

  // Clean up body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products | music Collection" />
          <Header />
          
          <div className="products-container">
            <div className="products-header">
              <div className="header-main">
                <h1 className="products-title">
                  {keyword ? `Search Results for "${keyword}"` : "Our Products"}
                </h1>
                {keyword && (
                  <p className="search-results-count">
                    {productsCount} {productsCount === 1 ? "result" : "results"} found
                  </p>
                )}
              </div>
              <button className="filter-toggle-btn" onClick={toggleSidebar}>
                <span className="filter-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                  </svg>
                </span>
                Filters
              </button>
            </div>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && <div className="sidebar-overlay" onClick={handleOverlayClick}></div>}

            <div className="products-content">
              <aside className={`product-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                  <h3>Filters</h3>
                  <button className="close-sidebar" onClick={toggleSidebar}>Paused Screen ×</button>
                </div>
                
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Categories</h3>
                  <ul className="category-list">
                    <li 
                      className={`category-item ${activeCategory === "" ? "active" : ""}`}
                      onClick={() => handleCategoryClick("")}
                    >
                      All Products
                    </li>
                    {categories.map((cat) => (
                      <li
                        className={`category-item ${activeCategory === cat ? "active" : ""}`}
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Quick Links</h3>
                  <ul className="quick-links">
                    <li className="quick-link-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-link-icon">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      My Cart
                    </li>
                    <li className="quick-link-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-link-icon">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      Favorite Items
                    </li>
                    <li className="quick-link-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="quick-link-icon">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      Checkout
                    </li>
                  </ul>
                </div>
              </aside>

              <div className="products-wrapper">
                {!products || products.length === 0 ? (
                  <div className="no-products">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-results-icon">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="15" x2="16" y2="15"></line>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                    <h2>No Products Found</h2>
                    <p>Try adjusting your search or filter criteria</p>
                    {category && (
                      <button 
                        className="clear-filter-btn"
                        onClick={() => handleCategoryClick("")}
                      >
                        Clear Category Filter
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="active-filters">
                      {activeCategory && (
                        <div className="filter-tag">
                          Category: {activeCategory}
                          <span 
                            className="remove-filter" 
                            onClick={() => handleCategoryClick("")}
                          >
                            ×
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="products-grid">
                      {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                      ))}
                    </div>
                    
                    {productsCount > resultPerPage && (
                      <div className="pagination-container">
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={productsCount}
                          onChange={setCurrentPageNo}
                          nextPageText="Next"
                          prevPageText="Prev"
                          firstPageText="First"
                          lastPageText="Last"
                          itemClass="page-item"
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;