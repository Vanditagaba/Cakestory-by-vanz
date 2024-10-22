import React from "react";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./userprofile.scss";
import Chart from "../../components/Chart/Chart";
import pfp from "./../../static/pfp.webp";
import dummy from "../../static/signup-bg.jpg";
import DataTable from "../../components/DataTable/DataTable";

const rows = [
  {
    _id: 1,
    orderid: 56789,
    img: dummy, // Replace 'dummy' with the actual image source
    name: "Chocolate Truffle Cake",
    amount: 800, // Price in ₹
    date: "5 March",
    qty: 1,
    method: "Online",
    status: "Delivered",
  },
  {
    _id: 2,
    orderid: 56790,
    img: dummy, // Replace 'dummy' with the actual image source
    name: "Vanilla Cupcakes (Box of 6)",
    amount: 400, // Price in ₹
    date: "15 April",
    qty: 1,
    method: "Cash On Delivery",
    status: "Delivered",
  },
  {
    _id: 3,
    orderid: 56791,
    img: dummy, // Replace 'dummy' with the actual image source
    name: "Choco Chip Cookies (Box of 12)",
    amount: 300, // Price in ₹
    date: "10 June",
    qty: 1,
    method: "Cash On Delivery",
    status: "Approved",
  },
  {
    _id: 4,
    orderid: 56792,
    img: dummy, // Replace 'dummy' with the actual image source
    name: "Fruit Cake",
    amount: 700, // Price in ₹
    date: "25 September",
    qty: 1,
    method: "Cash On Delivery",
    status: "Cancelled",
  },
];

const columns = [
  {
    field: "_id",
    headerName: "ID",
    minWidth: 120,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "orderid",
    headerName: "Order ID",
    minWidth: 120,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "product",
    headerName: "Product",
    minWidth: 180,
    flex: 2,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <div className="productInfoContainer">
            <img src={params.row.img} alt="" className="productImg me-2" />
            <span className="productName">{params.row.name}</span>
          </div>
        </>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    minWidth: 140,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "amount",
    headerName: "Amount",
    minWidth: 140,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "qty",
    headerName: "Quantity",
    minWidth: 140,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "method",
    headerName: "Payment Method",
    minWidth: 140,
    flex: 1,
    cellClassName: "tableCell",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 140,
    flex: 1,
    cellClassName: "tableCell",
    renderCell: (params) => {
      return (
        <>
          <span className="status">
            <span className={params.row.status}>{params.row.status}</span>
          </span>
        </>
      );
    },
  },
];

const UserProfile = () => {
  const data = [
    {
      name: "A",
      uv: 100,
    },
    {
      name: "B",
      uv: 200,
    },
    {
      name: "C",
      uv: 20,
    },
    {
      name: "D",
      uv: 270,
    },
    {
      name: "E",
      uv: 189,
    },
    {
      name: "F",
      uv: 239,
    },
  ];
  return (
    <>
      <div className="userProfileContainer">
        <Sidebar />

        <AnimatedPage>
          <div className="userProfile">
            <div className="topProfileBar">
              <div className="profileContainer">
                <div className="profile">
                  <p className="title">User Information</p>
                  <div className="details">
                    <div className="left">
                      <img src={pfp} alt="" className="pfpImg" />
                    </div>
                    <div className="right">
                      <div className="infoContainer">
                        <p className="title">Name:</p>
                        <p className="info">John Snow</p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Email:</p>
                        <p className="info">john.snow@gmail.com</p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Phone:</p>
                        <p className="info">+1 2345 67 89</p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Address:</p>
                        <p className="info">
                          Elton St. 234 Garden Yd. New York
                        </p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Country:</p>
                        <p className="info">USA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="activityContainer">
                <div className="activity">
                  <Chart data={data} title="User Activity (Last 6 Months)" />
                </div>
              </div>
            </div>
            <div className="bottomProfileBar">
              <div className="userDataTableContainer">
                <DataTable
                  rows={rows}
                  columns={columns}
                  toolbar={false}
                  title={"Latest Transactions"}
                />
              </div>
            </div>
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default UserProfile;
