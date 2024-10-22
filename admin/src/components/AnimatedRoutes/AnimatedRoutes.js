import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignIn from "./../../pages/SignIn/SignIn";
import Dashboard from "./../../pages/Dashboard/Dashboard";
import UserProfile from "../../pages/UserProfile/UserProfile";
import DataList from "../../pages/DataList/DataList";
import ProductForm from "../../pages/ProductForm/ProductForm";
import { FormProvider } from "./../../context/FormContext";
import { selectAllProducts } from "../../app/slice/productsApiSlice";
import { selectAllUsers } from "../../app/slice/usersApiSlice";
import Delete from "../Button/Delete";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";
import EditForm from "../../pages/EditForm/EditForm";
import Prefetch from "../../app/Prefetch";
import PersistLogin from "../../pages/SignIn/PersistLogin";
import RequireAuth from "./RequireAuth";

const productColumns = [
  {
    field: "_id",
    headerName: "ID",
    minWidth: 100,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "info",
    headerName: "Product",
    minWidth: 185,
    flex: 2,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <div className="listInfoContainer">
            <img src={params.row.img} alt="" className="productImg me-2" />
            <span className="productName">{params.row.BIproductname}</span>
          </div>
        </>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    minWidth: 100,
    flex: 1,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <div className="listInfoContainer">{` ${params.row.BIcategory}`}</div>
        </>
      );
    },
  },
  {
    field: "BIqty",
    headerName: "Stock",
    minWidth: 100,
    flex: 1,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <span
            className={
              params.row.BIqty >= 100
                ? "positive"
                : params.row.BIqty < 100 && params.row.BIqty > 50
                ? "warning"
                : "negative"
            }
          >
            {params.row.BIqty}
          </span>
        </>
      );
    },
  },
  {
    field: "BIprice",
    headerName: "Price",
    minWidth: 100,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    flex: 1,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return <span className={params.row.status}>{params.row.status}</span>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    minWidth: 180,
    flex: 2,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <div className="permsContainer">
            <Link to={`/product/${params.row._id}`} className="cta view">
              <p className="text-reset mb-0">View</p>
            </Link>
            <Delete id={params.row.id} product={true} />
          </div>
        </>
      );
    },
  },
];

const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    cellClassName: "tableCell",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "fname",
    headerName: "First name",
    cellClassName: "tableCell",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "lname",
    headerName: "Last name",
    cellClassName: "tableCell",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "username",
    headerName: "User Name",
    headerAlign: "left",
    align: "left",
    cellClassName: "tableCell",
    flex: 1,
    minWidth: 170,
  },
  {
    field: "edit",
    headerName: "Edit",
    cellClassName: "tableCell",
    flex: 1,
    minWidth: 170,
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <div className="permsContainer">
            <button className="cta view">
              <Link to={`/user/${params.row._id}`} className="text-reset">
                View
              </Link>
            </button>
            <Delete id={params.row.id} product={false} />
          </div>
        </>
      );
    },
  },
];

const AnimatedRoutes = () => {
  const productRows = useSelector(selectAllProducts);
  const userRows = useSelector(selectAllUsers);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<SignIn />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<Prefetch />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/users"
                element={
                  <DataList
                    rows={userRows}
                    columns={userColumns}
                    toolbar={true}
                    title="All Users"
                    cta={false}
                    RowId={(row) => row.id}
                  />
                }
              />
              <Route path="/user/:id" element={<UserProfile />} />
              <Route
                path="/product/:id"
                element={
                  <FormProvider>
                    <ProductDetails />
                  </FormProvider>
                }
              />
              <Route
                path="/products"
                element={
                  <DataList
                    rows={productRows}
                    columns={productColumns}
                    toolbar={true}
                    title="All Products"
                    cta={true}
                    ctaTitle={"Add Product"}
                    ctaLink={"/add-product"}
                    RowId={(row) => row._id}
                  />
                }
              />
              <Route
                path="/add-product"
                element={
                  <FormProvider>
                    <ProductForm />
                  </FormProvider>
                }
              />
              <Route
                path="/edit-product/:id"
                element={
                  <FormProvider>
                    <EditForm />
                  </FormProvider>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
