import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { FiMenu } from "react-icons/fi";
import { Offcanvas } from "react-bootstrap";
import { useSendLogOutMutation } from "../../app/slice/authApiSlice";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [animationState, setAnimationState] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const [sendLogOut, { isLoading, isSuccess, isError, error }] =
    useSendLogOutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  if (location.pathname === "/") {
    return null;
  } else {
    return (
      <>
        <motion.div
          exit={animationState && { opacity: 0 }}
          initial={animationState && { opacity: 0 }}
          animate={animationState && { opacity: 1 }}
          className="sidebarContainer"
        >
          <div className="top">
            <span className="title">CAKESTORY</span>
            <span className="subTitle">Admin</span>
          </div>
          <div className="middle">
            <ul className="sidebarList">
              <li className="listDivider">MAIN</li>

              <Link to="/dashboard" className="text-reset">
                <li
                  className={
                    location.pathname === "/dashboard"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                >
                  Dashboard
                </li>
              </Link>

              <li className="listDivider">LISTS</li>

              <Link to="/users" className="text-reset">
                <li
                  className={
                    location.pathname === "/users"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                >
                  Users
                </li>
              </Link>
              <Link to="/products" className="text-reset">
                <li
                  className={
                    location.pathname === "/products"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                >
                  Products
                </li>
              </Link>
              <li
                className={
                  location.pathname === "/orders"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Orders
              </li>
              <li
                className={
                  location.pathname === "/deliveries"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Delivery
              </li>
              <li
                className={
                  location.pathname === "/storage"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Storage
              </li>

              <li className="listDivider">USEFUL</li>
              <li
                className={
                  location.pathname === "/notifications"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Notifications
              </li>

              <li className="listDivider">user</li>
              <li
                className={
                  location.pathname === "/profile"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Profile
              </li>

              <li
                className="sidebarItem"
                onClick={() => {
                  sendLogOut();
                  setAnimationState(true);
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          exit={animationState && { opacity: 0 }}
          initial={animationState && { opacity: 0 }}
          animate={animationState && { opacity: 1 }}
          className="navbarContainer"
        >
          <div className="left">
            <span className="title">TECKWEAR</span>
            <span className="subTitle">Admin</span>
          </div>
          <div className="right">
            <FiMenu className="icon" onClick={handleShow} />
          </div>
        </motion.div>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="offcanvasBG"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>
              <div className="offcanvasTitle">
                <span className="title">TECKWEAR</span>
                <span className="subTitle">Admin</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="sidebarList">
              <li className="listDivider">MAIN</li>

              <Link to="/dashboard" className="text-reset">
                <li
                  className={
                    location.pathname === "/dashboard"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                  onClick={handleClose}
                >
                  Dashboard
                </li>
              </Link>

              <li className="listDivider">LISTS</li>

              <Link to="/users" className="text-reset">
                <li
                  className={
                    location.pathname === "/users"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                  onClick={handleClose}
                >
                  Users
                </li>
              </Link>
              <Link to="/products" className="text-reset">
                <li
                  className={
                    location.pathname === "/products"
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                  onClick={handleClose}
                >
                  Products
                </li>
              </Link>
              <li
                className={
                  location.pathname === "/orders"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Orders
              </li>
              <li
                className={
                  location.pathname === "/deliveries"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Delivery
              </li>

              <li
                className={
                  location.pathname === "/storage"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Storage
              </li>

              <li className="listDivider">USEFUL</li>
              <li
                className={
                  location.pathname === "/notification"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Notifications
              </li>

              <li className="listDivider">user</li>
              <li
                className={
                  location.pathname === "/profile"
                    ? "sidebarItem active"
                    : "sidebarItem"
                }
              >
                Profile
              </li>
              <Link to="/" className="text-reset" onClick={handleClose}>
                <li className="sidebarItem">Logout</li>
              </Link>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
};

export default Sidebar;
