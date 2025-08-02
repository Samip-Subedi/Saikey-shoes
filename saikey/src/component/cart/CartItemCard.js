import React from "react";
import { Link } from "react-router-dom";
import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <div className="CartItemCard__image-container">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="CartItemCard__content">
        <Link to={`/product/${item.product}`} className="CartItemCard__name">
          {item.name}
        </Link>
        <span className="CartItemCard__price">Rs. {item.price.toFixed(2)}</span>
        <button
          className="CartItemCard__remove-btn"
          onClick={() => deleteCartItems(item.product)}
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
