
// import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
// import { useDispatch } from "react-redux";
// import { addItemsToCart } from "../../actions/CartAction";

// const ProductCard = ({ product, history }) => {
//   const dispatch = useDispatch();

//   const handleBuyNow = (e) => {
//     e.preventDefault();
//     if (product.stock > 0) {
//       dispatch(addItemsToCart(product._id, 1));
//       history.push("/cart");
//     }
//   };

//   const discountPercentage =
//     product.offerPrice > 0
//       ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
//       : 0;

//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="product-card"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         textDecoration: "none",
//         color: "#333",
//         borderRadius: "12px",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
//         background: "#fff",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         position: "relative",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px)";
//         e.currentTarget.style.boxShadow = "0 6px 25px rgba(0, 0, 0, 0.07)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
//       }}
//     >
//       <div style={{ position: "relative" }}>
//         <img
//           src={product.images[0].url}
//           alt={product.name}
//           style={{ width: "100%", height: "220px", objectFit: "cover" }}
//         />
//         {discountPercentage > 0 && (
//           <div
//             style={{
//               position: "absolute",
//               top: "12px",
//               left: "12px",
//               background: "linear-gradient(135deg, #197ef3, #5e30c9)",
//               color: "white",
//               padding: "6px 12px",
//               borderRadius: "30px",
//               fontSize: "0.8rem",
//               fontWeight: "bold",
//               boxShadow: "0 2px 5px rgba(25, 126, 243, 0.2)",
//             }}
//           >
//             {discountPercentage}% OFF
//           </div>
//         )}
//       </div>

//       <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
//         {product.category && (
//           <span style={{ fontSize: "0.75rem", color: "#757575", textTransform: "uppercase" }}>
//             {product.category}
//           </span>
//         )}

//         <h2
//           style={{
//             fontSize: "1rem",
//             fontWeight: "600",
//             margin: "0",
//             lineHeight: "1.3",
//             height: "2.6em",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             display: "-webkit-box",
//             WebkitLineClamp: "2",
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {product.name}
//         </h2>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <Rating value={product.ratings} readOnly precision={0.5} size="small" style={{ color: "#197ef3" }} />
//           <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>
//             {product.ratings.toFixed(1)} ({product.numOfReviews})
//           </span>
//         </div>

//         {/* Price */}
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
//           {product.offerPrice > 0 ? (
//             <>
//               <span
//                 style={{
//                   background: "linear-gradient(to right, #197ef3, #5e30c9)",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   fontWeight: "700",
//                   fontSize: "1.25rem",
//                 }}
//               >
//                 Rs. {product.offerPrice}
//               </span>
//               <span style={{ fontSize: "0.95rem", fontWeight: "500", textDecoration: "line-through", color: "#9e9e9e" }}>
//                 Rs. {product.price}
//               </span>
//             </>
//           ) : (
//             <span
//               style={{
//                 background: "linear-gradient(to right, #197ef3, #5e30c9)",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 fontWeight: "700",
//                 fontSize: "1.25rem",
//               }}
//             >
//               Rs. {product.price}
//             </span>
//           )}
//         </div>

//         {/* Stock */}
//         <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//           <span
//             style={{
//               width: "8px",
//               height: "8px",
//               borderRadius: "50%",
//               background: product.stock > 0 ? "#4caf50" : "#f44336",
//               display: "inline-block",
//             }}
//           />
//           <span style={{ fontSize: "0.8rem", color: product.stock > 0 ? "#4caf50" : "#f44336", fontWeight: "500" }}>
//             {product.stock > 0 ? "In Stock" : "Out of Stock"}
//           </span>
//         </div>

//         {/* Buy Now Button */}
//         <button
//           onClick={handleBuyNow}
//           disabled={product.stock < 1}
//           style={{
//             marginTop: "10px",
//             padding: "10px",
//             backgroundColor: product.stock < 1 ? "#ccc" : "#5e30c9",
//             color: "#fff",
//             fontWeight: "600",
//             border: "none",
//             borderRadius: "8px",
//             cursor: product.stock < 1 ? "not-allowed" : "pointer",
//             fontSize: "0.95rem",
//             width: "100%",
//           }}
//         >
//           {product.stock < 1 ? "Out of Stock" : "Buy Now"}
//         </button>
//       </div>
//     </Link>
//   );
// };

// export default withRouter(ProductCard);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/CartAction";

const ProductCard = ({ product, history }) => {
  const dispatch = useDispatch();

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (product.stock > 0) {
      dispatch(addItemsToCart(product._id, 1));
      history.push("/login?redirect=shipping");
    }
  };

  const discountPercentage =
    product.offerPrice > 0
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <Link
      to={`/product/${product._id}`}
      className="product-card"
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "#333",
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        background: "#fff",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 6px 25px rgba(0, 0, 0, 0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)";
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={product.images[0].url}
          alt={product.name}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
        {discountPercentage > 0 && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "linear-gradient(135deg, #836660, #836660)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "30px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(25, 126, 243, 0.2)",
            }}
          >
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {product.category && (
          <span style={{ fontSize: "0.75rem", color: "#836660", textTransform: "uppercase" }}>
            {product.category}
          </span>
        )}

        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            margin: "0",
            lineHeight: "1.3",
            height: "2.6em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Rating value={product.ratings} readOnly precision={0.5} size="small" style={{ color: "#197ef3" }} />
          <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>
            {product.ratings.toFixed(1)} ({product.numOfReviews})
          </span>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
          {product.offerPrice > 0 ? (
            <>
              <span
                style={{
                  background: "linear-gradient(to right, #197ef3, #5e30c9)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: "700",
                  fontSize: "1.25rem",
                }}
              >
                Rs. {product.offerPrice}
              </span>
              <span style={{ fontSize: "0.95rem", fontWeight: "500", textDecoration: "line-through", color: "#836660" }}>
                Rs. {product.price}
              </span>
            </>
          ) : (
            <span
              style={{
                background: "linear-gradient(to right, #836660, #836660)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "700",
                fontSize: "1.25rem",
              }}
            >
              Rs. {product.price}
            </span>
          )}
        </div>

        {/* Stock */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: product.stock > 0 ? "#836660" : "#836660",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "0.8rem", color: product.stock > 0 ? "#836660" : "#836660", fontWeight: "500" }}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={product.stock < 1}
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: product.stock < 1 ? "#ccc" : "#836660",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: product.stock < 1 ? "not-allowed" : "pointer",
            fontSize: "0.95rem",
            width: "100%",
          }}  
        >
          {product.stock < 1 ? "Out of Stock" : "Buy Now"}
        </button>
      </div>
    </Link>
  );
};

export default withRouter(ProductCard);

