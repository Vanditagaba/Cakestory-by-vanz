import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { Skeleton, Stack } from "@mui/material";
import "./home.scss";
import hero from "./../../static/hero-img.png";
import Item from "./../../components/Item/Item";
import AnimatedRoute from "../../components/AnimatedPage/AnimatedPage";
import { useGetProductsQuery } from "../../app/slice/productsApiSlice";
import { resetCart } from "../../app/slice/cartSlice";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const Home = () => {
  const [menHover, setMenHover] = useState(false);
  const [womenHover, setWomenHover] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/", { replace: true });
    window.location.reload();
  };
  const handleShow = () => setShow(true);
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get("session");
  const success = queryParams.get("success");
  const cancelled = queryParams.get("cancelled");
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      dispatch(resetCart());
      handleShow();
      const editOrder = async () => {
        //eslint-disable-next-line
        const response = await fetch(
          `http://localhost:5000/order/single/${sessionId}`,
          {
            method: "PATCH",
          }
        );
      };
      editOrder();
      setTimeout(() => handleClose(), 5000);
    }
    if (cancelled) {
      handleShow();
      setTimeout(() => handleClose(), 5000);
    }
    //eslint-disable-next-line
  }, [success, dispatch, cancelled, sessionId]);
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();
  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"92vh"}
          animation="wave"
        />
      </Stack>
    );
  }
  let content;
  let bestSelling;
  if (isError) {
    content = <p>Error has occured: {error?.data?.message}</p>;
    bestSelling = <p>Error has occured: {error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids, entities } = products;
    const filteredIds = ids.slice(0, 6);
    content =
      ids?.length &&
      filteredIds.map((productId) => (
        <div className="primaryContainer" key={productId}>
          <Item id={productId} />
        </div>
      ));

    const bestSellingIds = ids
      .slice()
      .sort((a, b) => entities[b].sales - entities[a].sales);
    bestSelling =
      ids?.length &&
      bestSellingIds.map((productId) => (
        <div className="primaryContainer" key={productId}>
          <Item id={productId} />
        </div>
      ));
  }
  document.title = "CakeStory by Vanz | HOME";

  const changeState = (state, change) => {
    state(change);
  };

  return (
    <>
      <AnimatedRoute>
        <section className="heroSection">
          <div className="left">
            <p className="featured">FEATURED</p>
            <p className="collectionName">CHOCOLATE TRUFFLE</p>
            <p className="text">
              Experience rich layers of chocolate sponge and smooth ganache with
              our irresistible Chocolate Truffle Cake, perfect for all chocolate
              lovers. Available in multiple sizes with customization options.
            </p>
          </div>
          <div className="middle">
            <img src={hero} alt="" className="heroImg" />
          </div>

          <div className="mobile">
            <div className="top">
              <p className="featured">FEATURED</p>
            </div>

            <div className="middle">
              <p className="collectionName">CHOCOLATE TRUFFLE</p>
              <p className="text">
                Experience rich layers of chocolate sponge and smooth ganache
                with our irresistible Chocolate Truffle Cake, perfect for all
                chocolate lovers. Available in multiple sizes with customization
                options.
              </p>

              <button className="cta ctaRedirect mb-5">SHOP NOW</button>
            </div>
          </div>
        </section>

        <section className="featuredClothes">
          <Marquee speed={150} gradient={false} className="top">
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
            <p className="featured">BEST SELLING</p>
          </Marquee>

          <div className="bottom">{bestSelling}</div>
        </section>

        <section className="featuredClothes">
          <Marquee speed={150} gradient={false} className="top">
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
            <p className="featured">NEW ARRIVALS</p>
          </Marquee>

          <div className="bottom">{content}</div>
        </section>

        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="modalBody">
              {success && (
                <div className="modalInner">
                  <BsFillCheckCircleFill className="icon" />

                  <h2 className="confirmation">Order Successful</h2>
                </div>
              )}
              {cancelled && (
                <div className="modalInner">
                  <BsXCircleFill className="icon" />

                  <h2 className="confirmation">Order Cancelled</h2>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </AnimatedRoute>
    </>
  );
};

export default Home;
