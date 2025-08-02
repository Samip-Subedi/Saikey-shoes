// import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
// import "./MyOrders.css";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myOrders } from "../../actions/OrderAction";
// import { Link } from "react-router-dom";
// import MetaData from "../../more/MetaData";
// import LaunchIcon from "@material-ui/icons/Launch";
// import Loading from "../../more/Loader";
// import BottomTab from "../../more/BottomTab";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MyOrder = () => {
//   const dispatch = useDispatch();

//   const { loading, error, orders } = useSelector((state) => state.myOrder);

//   const { user } = useSelector((state) => state.user);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 150,
//       flex: 0.5,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },

//     {
//       field: "amount",
//       headerName: "Amount",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },

//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Link to={`/order/${params.getValue(params.id, "id")}`}>
//             <LaunchIcon />
//           </Link>
//         );
//       },
//     },
//   ];
//   const rows = [];

//   orders &&
//     orders.forEach((item, index) => {
//       rows.push({
//         itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
//         id: item._id,
//         status: item.orderStatus,
//         amount: item.totalPrice,
//       });
//     });

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(myOrders());
//   }, [dispatch, alert, error]);

//   return (
//     <Fragment>
//       <MetaData title={`${user.name} - Orders`} />

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="myOrdersPage">
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             disableSelectionOnClick
//             className="myOrdersTable"
//             autoHeight
//           />
//         </div>
//       )}
//       <BottomTab />
//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Fragment>
//   );
// };

// export default MyOrder;
import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/OrderAction";
import { Link } from "react-router-dom";
import MetaData from "../../more/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Home/Header.jsx";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "Delivered" ? "#4caf50" : "#f44336",
            fontWeight: 600,
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount (Rs.)",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Details",
      flex: 0.3,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <Link
          to={`/order/${params.row.id}`}
          style={{
            color: "#5e30c9",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <LaunchIcon fontSize="small" />
        </Link>
      ),
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length || 1,
        amount: item.totalPrice,
      }))
    : [];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      <Header/>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            maxWidth: "1100px",
            margin: "40px auto",
            padding: "30px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "30px",
            }}
          >
            {user.name}'s Orders
          </h2>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontFamily: "Poppins, sans-serif",
              }}
            />
          </div>
        </div>
      )}
      <BottomTab />
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
    </>
  );
};

export default MyOrder;
