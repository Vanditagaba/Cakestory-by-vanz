import React from "react";
import { useParams } from "react-router-dom";
import "./productDetails.scss";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { selectProductById } from "../../app/slice/productsApiSlice";
import Chart from "../../components/Chart/Chart";
import { Link } from "react-router-dom";

const ProductDetails = () => {
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
  const { id } = useParams();
  const product = useSelector((state) => selectProductById(state, id));

  if (!product) {
    return <p>Product not found!</p>;
  }
  const sizeArray = product.BIsize.split(",");
  const colorArray = product.BIcolor.split(",");
  return (
    <>
      <div className="productDetailContainer">
        <Sidebar />

        <AnimatedPage>
          <div className="productDetail">
            <div className="topProductBar">
              <div className="productContainer">
                <div className="product">
                  <div className="titleContainer">
                    <p className="title">Product Details</p>
                    <Link to={`/edit-product/${id}`}>
                      <button className="cta">Edit</button>
                    </Link>
                  </div>
                  <div className="details">
                    <div className="left">
                      <img src={product.img} alt="" className="pfpImg" />
                    </div>
                    <div className="right">
                      <div className="infoContainer">
                        <p className="title">Name:</p>
                        <p className="info">{product.BIproductname}</p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Price:</p>
                        <p className="info">₹{product.BIprice.toFixed(2)}</p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Size/Category:</p>
                        <p className="info">
                          {product.BIsize}/{product.BIcategory}
                        </p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Size:</p>
                        <p className="info">
                          {sizeArray.map((size) => (
                            <span className="me-3" key={size}>
                              {size}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Color:</p>
                        <p className="info">
                          {colorArray.map((color) => (
                            <span className="me-3" key={color}>
                              {color}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="infoContainer">
                        <p className="title">Quantity:</p>
                        <p className="info">
                          <span
                            className={
                              product.BIqty >= 100
                                ? "positive"
                                : product.BIqty < 100 && product.BIqty > 50
                                ? "warning"
                                : "negative"
                            }
                          >
                            {product.BIqty}{" "}
                            {product.BIqty >= 100 ? (
                              <span className="ms-3">inStock</span>
                            ) : product.BIqty < 100 && product.BIqty > 50 ? (
                              <span className="ms-3">Low on Stock</span>
                            ) : (
                              <span className="ms-3">Order Stock!</span>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="activityContainer">
                <div className="activity">
                  <Chart data={data} title="Product Sales (Last 6 Months)" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default ProductDetails;
