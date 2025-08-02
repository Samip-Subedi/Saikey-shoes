import React from "react";
import { Link } from "react-router-dom";
import "./FavouriteItemsCard.css";
import { useSelector } from "react-redux";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
  const { product } = useSelector((state) => state.productDetails);
  
  const isInStock = product.Stock >= 1;
  
  return (
    <div className="favourite-item">
      <div className="product-info">
        <div className="product-image">
          <img src={item.image} alt={item.name} />
        </div>
        
        <div className="product-details">
          <Link to={`/product/${item.product}`} className="product-name">
            {item.name}
          </Link>
          
          <button 
            className="remove-button"
            onClick={() => deleteFavouriteItems(item.product)}
          >
            Remove from favourites
          </button>
        </div>
      </div>
      
      <div className="product-price">
        <span className="price-tag">Rs. {item.price}</span>
      </div>
      
      <div className="product-stock">
        <span className={`stock-status ${isInStock ? "in-stock" : "in-stock"}`}>
          {isInStock ? "In Stock" : "In Stock"}
        </span>
      </div>
      
      <div className="product-action">
        <Link to={`/product/${item.product}`}>
          <button
            className={`add-to-cart-button ${!isInStock ? "enabled" : ""}`}
            enabled={!isInStock}
          >
            Add To Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FavouriteItemsCard;
