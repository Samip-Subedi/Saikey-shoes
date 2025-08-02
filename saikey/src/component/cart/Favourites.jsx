import React from "react";
import "./Favourites.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import FavouriteItemsCard from "./FavouriteItemsCard.jsx";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import Footer from "../../more/Footer";

const Favourite = ({ history }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);
  
  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };
  
  return (
    <>
      <MetaData title="Favourites Items" />
      <Header />
      
      {loading ? (
        <Loading />
      ) : (
        <div className="page-container">
          <div className="favourites-wrapper">
            <div className="favourites-header">
              <Typography variant="h4" className="page-title">
                My Favourites
              </Typography>
              <Typography variant="body2" className="item-count">
                {favouriteItems.length} {favouriteItems.length === 1 ? 'item' : 'items'}
              </Typography>
            </div>

            {favouriteItems.length === 0 ? (
              <div className="empty-favourites">
                <FavoriteBorderIcon className="empty-icon" />
                Your favourites list is empty <br />
           
                  Add items you love to your favourites list
              
                <Link to="/products" className="shop-button">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="favourites-content">
                <div className="favourites-table">
                  <div className="table-header">
                    <div className="header-product">Product</div>
                    <div className="header-price">Price</div>
                    <div className="header-stock">Stock Status</div>
                    <div className="header-action">Action</div>
                  </div>
                  
                  <div className="table-body">
                    {favouriteItems.map((item) => (
                      <div className="favourites-item" key={item.product}>
                        <FavouriteItemsCard
                          item={item}
                          deleteFavouriteItems={deleteFavouriteItems}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {favouriteItems.length > 0 && (
                  <div className="favourites-actions">
                    <Link to="/products" className="continue-shopping">
                      Continue Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <Footer />
      <BottomTab />
    </>
  );
};

export default Favourite;