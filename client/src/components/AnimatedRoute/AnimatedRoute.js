import React from "react";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./../../ScrollToTop";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./../../pages/Home/Home";
import ProductPage from "./../../pages/ProductPage/ProductPage";
import Footer from "./../Footer/Footer";
import Products from "./../../pages/Products/Products";
import SignIn from "./../../pages/SignIn/SignIn";
import SignUp from "../../pages/SignUp/SignUp";
import PersistLogin from "../../pages/SignIn/PersistLogin";
import Orders from "../../pages/Orders/Orders";
import RequireAuth from "./RequireAuth";

const AnimatedRoute = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes key={location.pathname} location={location}>
        <Route element={<PersistLogin />}>
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <ProductPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/products/:product"
            element={
              <>
                <Products />
                <Footer />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <SignIn />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
                <Footer />
              </>
            }
          />

          <Route element={<RequireAuth />}>
            <Route
              path="/orders"
              element={
                <>
                  <Orders />
                  <Footer />
                </>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
