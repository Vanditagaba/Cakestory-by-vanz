import React, { useEffect, useState } from "react";
import "./products.scss";
import AnimatedRoute from "./../../components/AnimatedPage/AnimatedPage";
import { FiFilter } from "react-icons/fi";
import Item from "./../../components/Item/Item";
import { useGetProductsQuery } from "../../app/slice/productsApiSlice";
import { useParams, useLocation } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Skeleton, Stack } from "@mui/material";

const Products = () => {
  const { product } = useParams();
  const location = useLocation(); // To get query params from the URL
  const [show, setShow] = useState(false); // Control Offcanvas visibility
  const [selectedCats, setSelectedCats] = useState([]);
  const catList = ["cakes", "cookies", "cupcakes", "brownies"];
  let content;
  let filteredIds = null;

  // Handle opening the filter Offcanvas
  const handleShow = () => setShow(true);

  // Handle closing the filter Offcanvas
  const handleClose = () => setShow(false);

  const {
    data: productsQuery,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery(product); // Fetch products based on the product param

  // Handle loading state
  if (isLoading) {
    content = (
      <Stack>
        <Skeleton variant="rectangular" width={"15rem"} height={"30rem"} />
      </Stack>
    );
  }

  // Handle error state
  if (isError) {
    content = <p>Error: {error?.data?.message}</p>;
  }

  // Handle success state
  if (isSuccess) {
    const { ids, entities } = productsQuery;
    filteredIds = [...ids];

    // Filter products based on selected categories
    if (selectedCats.length !== 0) {
      filteredIds = ids.filter(
        (productId) =>
          selectedCats.includes(entities[productId].BIcategory.toLowerCase()) // Ensure categories are in lowercase
      );
    }

    // Map filtered products to components
    content =
      filteredIds.length > 0 ? (
        filteredIds.map((productId) => (
          <div className="productContainer" key={productId}>
            <Item id={productId} />
          </div>
        ))
      ) : (
        <p>No products found</p>
      );
  }

  // Handle category filter checkbox changes
  const handleCatChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCats(
      isChecked
        ? [...selectedCats, value]
        : selectedCats.filter((cat) => cat !== value)
    );
  };

  // Reset filters
  const resetFilter = () => {
    setSelectedCats([]);
  };

  console.log(filteredIds);

  // UseEffect to update selected categories based on query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cakes = queryParams.get("cakes");
    const cookies = queryParams.get("cookies");
    const cupcakes = queryParams.get("cupcakes");
    const brownies = queryParams.get("brownies");

    const updatedCategories = [];
    if (cakes) updatedCategories.push("cakes");
    if (cookies) updatedCategories.push("cookies");
    if (cupcakes) updatedCategories.push("cupcakes");
    if (brownies) updatedCategories.push("brownies");

    setSelectedCats(updatedCategories);
  }, [location.search]); // Update when URL params change

  return (
    <>
      <AnimatedRoute>
        <div className="productsContainer">
          <div className="headerContainer">
            <div className="top">
              <h1 className="header">{product}</h1>
            </div>
            <div className="bottom">
              <span className="filter" onClick={handleShow}>
                Filters <FiFilter className="icon" />
              </span>
              <span
                className={selectedCats.length !== 0 ? "filter" : "d-none"}
                onClick={resetFilter}
              >
                Reset Filters
              </span>
            </div>
          </div>

          <div className="productsList">{content}</div>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h2>FILTERS</h2>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="section">
              <p className="sectionTitle">Category</p>
              <ul className="sectionList">
                {catList.map((category) => (
                  <li className="sectionListItem" key={category}>
                    <input
                      type="checkbox"
                      name={category}
                      id={category}
                      value={category}
                      className="filterCheckbox"
                      onChange={handleCatChange}
                      checked={selectedCats.includes(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </li>
                ))}
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </AnimatedRoute>
    </>
  );
};

export default Products;
