import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./Productdetails.css";
import { Rating } from "@material-ui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import ReviewCard from "./ReviewCard.jsx";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import Footer from "../../more/Footer";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    if (isAuthenticated !== true) {
      history.push(`/login?redirect=/`);
      return;
    }

    if (comment.length === 0) {
      toast.error("Please fill the comment box");
      return;
    }

    dispatch(newReview(myForm));
    toast.success("Review submitted successfully");
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error]);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "large",
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error("Product stock limited");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity));
      toast.success("Product added to cart");
    } else {
      toast.error("Product out of stock");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Product added to wishlist");
  };

  // Calculate discount percentage if there's an offer price
  const discountPercentage = product.offerPrice > 0
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  // Sort reviews based on selected option
  const sortReviews = (reviews) => {
    if (!reviews) return [];
    
    let sortedReviews = [...reviews];
    
    switch(sortOption) {
      case "highest":
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sortedReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "newest":
      default:
        // Assuming reviews have a 'createdAt' property, otherwise keep as is
        if (sortedReviews[0] && sortedReviews[0].createdAt) {
          sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        break;
    }
    
    return sortedReviews;
  };
  
  // Filter reviews to show limited in initial view
  const displayedReviews = () => {
    if (!product.reviews) return [];
    
    const sorted = sortReviews(product.reviews);
    return showAllReviews ? sorted : sorted.slice(0, 3);
  };
  
  // Calculate average rating by star level
  const calculateRatingStats = () => {
    if (!product.reviews || product.reviews.length === 0) return { average: 0, counts: [0, 0, 0, 0, 0] };
    
    const counts = [0, 0, 0, 0, 0]; // 5 star to 1 star counts
    let total = 0;
    
    product.reviews.forEach(review => {
      total += review.rating;
      counts[5 - Math.ceil(review.rating)] += 1;
    });
    
    const average = total / product.reviews.length;
    
    return { average, counts };
  };
  
  const { average, counts } = calculateRatingStats();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />
          <div className="product-details-container">
            <div className="product-details-wrapper">
              {/* Product Images Section */}
              <div className="product-images-section">
                <div className="main-image-container">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[activeImg]?.url}
                      alt={product.name}
                      className="main-product-image"
                    />
                  )}
                  
                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="discount-badge">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Gallery */}
                {product.images && product.images.length > 1 && (
                  <div className="thumbnail-gallery">
                    {product.images.map((image, index) => (
                      <div 
                        key={index}
                        className={`thumbnail-item ${activeImg === index ? 'active-thumbnail' : ''}`}
                        onClick={() => setActiveImg(index)}
                      >
                        <img src={image.url} alt={`${product.name} - ${index}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info Section */}
              <div className="product-info-section">
                <div className="product-header">
                  {product.category && (
                    <span className="product-category">{product.category}</span>
                  )}
                  <h1 className="product-title">{product.name}</h1>
                  
                  <div className="product-ratings">
                    <Rating {...options} />
                    <span className="review-count">
                      {product.numOfReviews} {product.numOfReviews === 1 ? 'Review' : 'Reviews'}
                    </span>
                  </div>
                </div>

                <div className="product-price-section">
                  {product.offerPrice > 0 ? (
                    <>
                      <span className="sale-price">${product.offerPrice}</span>
                      <span className="original-price">${product.price}</span>
                    </>
                  ) : (
                    <span className="regular-price">${product.price}</span>
                  )}
                </div>
                
                <div className="product-stock-status">
                  <div className={`stock-indicator ${product.Stock < 1 ? 'out-of-stock' : 'in-stock'}`}>
                    {product.Stock < 1 ? 'Out of Stock' : 'In Stock'}
                  </div>
                </div>

                {product.description && (
                  <div className="product-description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                  </div>
                )}

                <div className="product-actions">
                  <div className="quantity-selector">
                    <span className="quantity-label">Quantity</span>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn decrease" 
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        readOnly
                        className="quantity-input"
                      />
                      <button 
                        className="quantity-btn increase" 
                        onClick={increaseQuantity}
                        disabled={product.Stock <= quantity}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="cart-buttons">
                    <button 
                      className={`add-to-cart-btn ${product.Stock < 1 ? 'disabled' : ''}`} 
                      onClick={addToCartHandler}
                      disabled={product.Stock < 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                      Add to Cart
                    </button>
                    
                    <button 
                      className="add-to-wishlist-btn"
                      onClick={addToFavouriteHandler}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Reviews Section */}
            <div className="reviews-section">
              <div className="section-divider"></div>
              <h2 className="section-title">Reviews & Ratings</h2>
              
              {/* Rating Summary */}
              {product.reviews && product.reviews.length > 0 ? (
                <div className="rating-summary">
                  <div className="rating-summary-left">
                    <div className="average-rating">{average.toFixed(1)}</div>
                    <div className="rating-stars">
                      <Rating value={average} readOnly precision={0.5} size="medium" />
                    </div>
                    <div className="total-reviews">
                      Based on {product.numOfReviews} {product.numOfReviews === 1 ? 'review' : 'reviews'}
                    </div>
                  </div>
                  
                  <div className="rating-summary-right">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div className="rating-bar-row" key={star}>
                        <div className="rating-bar-label">{star} star</div>
                        <div className="rating-bar-container">
                          <div 
                            className="rating-bar-fill"
                            style={{
                              width: `${product.reviews.length ? (counts[5-star] / product.reviews.length) * 100 : 0}%`
                            }}
                          ></div>
                        </div>
                        <div className="rating-bar-count">{counts[5-star]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              
              {/* Reviews Filters */}
              {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews-filter">
                  <div className="filter-label">Sort by:</div>
                  <div className="filter-options">
                    <button 
                      className={`filter-option ${sortOption === 'newest' ? 'active' : ''}`}
                      onClick={() => setSortOption('newest')}
                    >
                      Most Recent
                    </button>
                    <button 
                      className={`filter-option ${sortOption === 'highest' ? 'active' : ''}`}
                      onClick={() => setSortOption('highest')}
                    >
                      Highest Rated
                    </button>
                    <button 
                      className={`filter-option ${sortOption === 'lowest' ? 'active' : ''}`}
                      onClick={() => setSortOption('lowest')}
                    >
                      Lowest Rated
                    </button>
                  </div>
                </div>
              ) : null}
              
              {/* Reviews List */}
              <div className="reviews-container">
                {product.reviews && product.reviews.length > 0 ? (
                  <>
                    <div className="reviews-list">
                      {displayedReviews().map((review, index) => (
                        <div className="review-card" key={index}>
                          <div className="review-header">
                            <div className="reviewer-avatar">
                              {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="reviewer-info">
                              <div className="reviewer-name">{review.name || 'User'}</div>
                              <div className="review-date">
                                {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                }) : 'Recently added'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="review-rating">
                            <Rating value={review.rating} readOnly precision={0.5} size="small" />
                          </div>
                          
                          <div className="review-content">
                            {review.comment}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {product.reviews.length > 3 && (
                      <div className="reviews-toggle">
                        <button 
                          className="toggle-reviews-btn"
                          onClick={() => setShowAllReviews(!showAllReviews)}
                        >
                          {showAllReviews ? 'Show Less Reviews' : `Show All Reviews (${product.reviews.length})`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-reviews">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                    </svg>
                    <p>No Reviews Yet</p>
                    <span>Be the first to review this product</span>
                  </div>
                )}
              </div>

              {/* Add Review Form */}
              <div className="add-review-form">
                <h3>Write a Review</h3>
                
                <div className="review-rating-field">
                  <label>Your Rating*</label>
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    size="large"
                  />
                  <div className="rating-helper-text">
                    {rating === 0 && "Click to rate"}
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Average"}
                    {rating === 4 && "Good"}
                    {rating === 5 && "Excellent"}
                  </div>
                </div>
                
                <div className="review-comment-field">
                  <label>Your Review*</label>
                  <textarea
                    placeholder="Share your experience with this product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="5"
                  ></textarea>
                  <div className="comment-length">
                    {comment.length}/500 characters
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="submit-review-btn"
                  onClick={reviewSubmitHandler}
                  disabled={!rating}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetails;