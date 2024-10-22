import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion, Modal } from "react-bootstrap";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import "./productpage.scss";
import ProductCarousel from "./../../components/ProductCarousel/ProductCarousel";
import Item from "./../../components/Item/Item";
import ReviewBox from "./../../components/ReviewBox/ReviewBox";
import pfp from "./../../static/pfp.webp";
import { AiFillStar } from "react-icons/ai";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import AnimatedRoute from "../../components/AnimatedPage/AnimatedPage";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductById,
  useGetProductsQuery,
} from "../../app/slice/productsApiSlice";
import { addToCart } from "../../app/slice/cartSlice";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import {
  selectAllReviews,
  useAddReviewMutation,
} from "../../app/slice/reviewApiSlice";
import UseAuth from "../../hooks/UseAuth";
import { CircularProgress } from "@mui/material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#060606",
  },
  "& .MuiRating-iconHover": {
    color: "#312f2f",
  },
});

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: "1.2rem",
  },
}));

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const { username, userId } = UseAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errMsg, setErrMsg] = useState("");
  const [qty, setQty] = useState(1);
  const [itemSize, setItemSize] = useState("");
  const [itemColor, setItemColor] = useState("");
  const handleSize = (e) => setItemSize(e.target.value);
  const handleColor = (e) => setItemColor(e.target.value);
  const [rating, setRating] = useState("");
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const handleTitle = (e) => setTitle(e.target.value);
  const handleReview = (e) => setReview(e.target.value);

  const product = useSelector((state) => selectProductById(state, id));
  const {
    data: otherProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();
  let content;
  if (isLoading) {
    content = <CircularProgress />;
  }
  if (isError) {
    content = <p>Error: {error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = otherProducts;
    const filteredIds = ids.filter((productId) => productId !== id);
    content = filteredIds.map((productId) => (
      <div className="primaryContainer" key={productId}>
        <Item id={productId} />
      </div>
    ));
  }
  const reviews = useSelector(selectAllReviews);

  const filterReviews = reviews?.filter(
    (review) => review.product === product.BIproductname
  );
  const checkDuplicate = reviews?.filter(
    (review) =>
      review.product === product.BIproductname && review.user === username
  );
  const [addNewReview] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewReview({
        rating,
        title,
        review,
        product: product.id,
        user: userId,
      }).unwrap();
      setTitle("");
      setRating("");
      setReview("");
      handleClose();
    } catch (error) {
      if (error?.status === 409) {
        setErrMsg(error?.data?.message);
      }
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  const color = product.BIcolor;

  const colorArray = color.split(",");

  const size = product.BIsize;

  const sizeArray = size.split(",");

  product.length !== 0 && (document.title = product.BIproductname);

  const canAddToCart = () => {
    if (itemSize && itemColor) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <AnimatedRoute>
        {product.length !== 0 && (
          <div className="productPageContainer">
            <div className="top">
              <p className="links">
                <span className="history">
                  <Link
                    to={`/products/${product.BIcategory}`}
                    className="text-reset"
                  >
                    {product.BIcategory}
                  </Link>
                  /All/
                </span>
                <span className="productName">{product.BIproductname}</span>
              </p>
            </div>

            <div className="middle">
              <div className="left">
                <ProductCarousel slides={product.img} />
              </div>

              <div className="right">
                <div className="top">
                  <p className="productName">{product.BIproductname}</p>
                  {product.BIqty >= 80 && <p className="instock">In Stock</p>}
                  {product.BIqty <= 80 && product.BIqty > 0 && (
                    <p className="lowstock">Low on Stock</p>
                  )}
                  {product.BIqty <= 10 && product.BIqty > 0 && (
                    <p className="lowstock">Only {product.BIqty} Left</p>
                  )}
                  {product.BIqty === 0 && (
                    <p className="nostock">Out of Stock</p>
                  )}
                  <ul className="ratingUL">
                    {Array(4)
                      .fill()
                      .map((_, i) => (
                        <li className="ratingList" key={i}>
                          <AiFillStar />
                        </li>
                      ))}
                  </ul>
                  <p className="productPrice">₹{product.BIprice.toFixed(2)}</p>

                  <div className="detailsContainer">
                    <p className="detailName">Size:</p>
                    <ul className="detailList">
                      {sizeArray.map((size) => {
                        return (
                          <li className="detailItem" key={size}>
                            <input
                              type="radio"
                              value={size}
                              name="size"
                              id={size}
                              onClick={handleSize}
                            />
                            <label htmlFor={size} className="radioLabel">
                              {size}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="detailsContainer">
                    <p className="detailName">Color/Flavor:</p>
                    <ul className="detailList">
                      {colorArray.map((color) => {
                        return (
                          <li className="detailItem" key={color}>
                            <input
                              type="radio"
                              value={color}
                              name="coloer"
                              id={color}
                              onClick={handleColor}
                            />
                            <label htmlFor={color} className="radioLabel">
                              {color}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="detailsContainer">
                    <p className="detailName">Quantity:</p>
                    <div className="quantityContainer">
                      <div
                        className={`arrow ${qty === 1 && "disabled"}`}
                        onClick={() =>
                          setQty((prev) => (prev === 1 ? 1 : prev - 1))
                        }
                        id="left-arrow"
                      >
                        <FiArrowLeft />
                      </div>
                      <p className="quantity">{qty}</p>
                      <div
                        className={`arrow ${
                          (qty === 5 || qty === product.BIqty) && "disabled"
                        }`}
                        onClick={() =>
                          setQty((prev) =>
                            prev === product.BIqty || prev === 5
                              ? prev
                              : prev + 1
                          )
                        }
                        id="right-arrow"
                      >
                        <FiArrowRight />
                      </div>
                    </div>
                  </div>
                  <button
                    className="cta w-50 productCTA"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          qty,
                          size: itemSize,
                          color: itemColor,
                          price: product.BIprice,
                        })
                      )
                    }
                    disabled={!canAddToCart()}
                  >
                    ADD TO CART
                  </button>
                </div>

                <div className="bottom">
                  <Accordion
                    defaultActiveKey={["0"]}
                    alwaysOpen
                    flush
                    className="accordionDetails"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>DETAILS</Accordion.Header>
                      <Accordion.Body>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        ></p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>

            <div className="bottom">
              <div className="top">
                <p className="heading">OTHER PRODUCTS</p>
                <Link
                  className="text-reset"
                  to={`/products/${product.BIgender}`}
                >
                  <button className="cta ctaRedirect">BROWSE</button>
                </Link>
              </div>

              <div className="otherProducts">{content}</div>
            </div>

            <div className="reviewsContainer">
              <div className="top">
                <p className="heading">REVIEWS</p>
                <LightTooltip
                  title={!username && "Sign In to review this product"}
                  followCursor
                >
                  <Link to={!username && "/signin"}>
                    <button
                      className="cta ctaRedirect"
                      onClick={username && handleShow}
                    >
                      {checkDuplicate.length === 1
                        ? "Edit Review"
                        : "Write a Review"}
                    </button>
                  </Link>
                </LightTooltip>
              </div>

              <div className="bottom" id="bottom">
                {filterReviews.length === 0 && (
                  <p>
                    No Reviews of this Product...yet. Write your review to let
                    the others know about your experience
                  </p>
                )}
                {filterReviews.map((review) => (
                  <ReviewBox
                    pfp={pfp}
                    name={review.user}
                    rating={review.rating}
                    review={review.review}
                    title={review.title}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Write a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalContainer">
              <form method="post" className="reviewForm">
                {errMsg && <p className="err">{errMsg}</p>}
                <p>RATING</p>
                <StyledRating
                  name="rating"
                  size="large"
                  defaultValue={0}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  className="mb-5"
                />
                <input
                  type="text"
                  className="formInput"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitle}
                />

                <textarea
                  name="review"
                  className="textArea"
                  cols="30"
                  rows="10"
                  placeholder="Review"
                  value={review}
                  onChange={handleReview}
                ></textarea>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="cta ctaRedirect" onClick={handleClose}>
              Close
            </button>
            <button className="cta ctaRedirect" onClick={handleSubmit}>
              Submit Review
            </button>
          </Modal.Footer>
        </Modal>
      </AnimatedRoute>
    </>
  );
};

export default ProductPage;
