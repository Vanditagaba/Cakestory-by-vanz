import React from "react";
import "./widgets.scss";
import { FiTrendingUp } from "react-icons/fi";
import {
  BsCartCheck,
  BsPerson,
  BsGraphUp,
  BsBarChartLine,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../app/slice/productsApiSlice";
import { selectAllUsers } from "../../app/slice/usersApiSlice";
import { selectAllOrders } from "../../app/slice/ordersApiSlice";

const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

const Widgets = ({ type }) => {
  const products = useSelector(selectAllProducts);
  const users = useSelector(selectAllUsers);
  const orders = useSelector(selectAllOrders);

  const totalSales = products.reduce((accumulator, object) => {
    return accumulator + object.sales * object.BIprice;
  }, 0);
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Total Users",
        isMoney: false,
        icon: <BsPerson className="icon" />,
        link: "/users",
        count: users.length,
      };
      break;
    case "order":
      data = {
        title: "Total Orders",
        isMoney: false,
        icon: <BsCartCheck className="icon" />,
        link: "/",
        count: orders.length,
      };
      break;

    case "sales":
      data = {
        title: "Total Sales",
        isMoney: true,
        icon: <BsGraphUp className="icon" />,
        link: "/",
        count: totalSales.toFixed(2),
      };
      break;

    case "products":
      data = {
        title: "Total Products",
        isMoney: false,
        icon: <BsBarChartLine className="icon" />,
        link: "/products",
        count: products.length,
      };
      break;

    default:
      break;
  }
  return (
    <>
      <Link to={data.link} className="text-reset">
        <div
          className="widgetContainer"
          onMouseMove={(e) => handleOnMouseMove(e)}
        >
          <div id="top">
            <div className="left">
              <div className="infoContainer">
                <span className="title">{data.title}</span>
                <div className="subTitle">
                  {data.isMoney && "₹"}
                  {data.count}
                </div>
              </div>
            </div>
            <div className="right">
              <div className="iconContainer">{data.icon}</div>
            </div>
          </div>
          {data.title !== "Total Products" && (
            <div className="bottom">
              <div className="infoBottom">
                <span className="positive">
                  <FiTrendingUp className="me-3 icon" />
                  <span className="number">7.5% Up </span>
                </span>
                <span className="text">from yesterday</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Widgets;
