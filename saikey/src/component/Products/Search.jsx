import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import BottomTab from "../../more/BottomTab";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search" />
      <Header />
      <div className="search-container">
        <form className="search-box" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search for items..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className="search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </form>
      </div>
      <Footer />
      <BottomTab />
    </Fragment>
  );
};

export default Search;
