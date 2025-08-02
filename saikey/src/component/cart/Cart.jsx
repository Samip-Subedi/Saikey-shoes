import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useHistory } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../more/Footer";
import Header from "../Home/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 10 : 0;
  const totalPrice = subtotal + tax + shipping;

  const handleQuantityChange = (id, quantity, stock, increase = true) => {
    const newQty = increase ? quantity + 1 : quantity - 1;
    if (newQty < 1 || (increase && stock <= quantity)) {
      return toast.error("Product stock limited", { position: "bottom-center", className: "toast-message" });
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.success("Item removed from cart", { position: "bottom-center", className: "toast-message" });
  };

  const checkoutHandler = () => history.push("/login?redirect=shipping");

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="empty-cart">
          <div className="empty-cart__icon">
            <RemoveShoppingCartIcon fontSize="large" />
          </div>
          <Typography variant="h5" className="empty-cart__message">
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" className="empty-cart__submessage">
            Add items to your cart to continue shopping
          </Typography>
          <Link to="/products" className="empty-cart__button">Browse Products</Link>
        </div>
        <Footer />
        <BottomTab />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cart__container">
          <div className="cart__header">
            <h1 className="cart__title">Shopping Cart</h1>
   
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
      
          </div>

          <div className="cart__content">
            <div className="cart__items">
              <div className="cart__items-header">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              {cartItems.map((item) => (
                <div className="cart__item" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cart__item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product, item.quantity, item.stock, false)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} className="quantity-input" aria-label="Product quantity" />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.product, item.quantity, item.stock, true)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart__item-subtotal">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__summary">
              <h2 className="cart__summary-title">Order Summary</h2>
              <div className="cart__summary-row"><span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span></div>
              <div className="cart__summary-row"><span>Tax (5%)</span><span>Rs. {tax.toFixed(2)}</span></div>
              <div className="cart__summary-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `Rs. ${shipping.toFixed(2)}`}</span></div>
              <div className="cart__summary-row cart__summary-row--total"><span>Total</span><span>Rs. {totalPrice.toFixed(2)}</span></div>
              <button className="cart__checkout-button" onClick={checkoutHandler}>Proceed to Checkout</button>
              <Link to="/products" className="cart__continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default Cart;
