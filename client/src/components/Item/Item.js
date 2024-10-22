import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProductById } from "../../app/slice/productsApiSlice";
import "./item.scss";

const Item = ({ id }) => {
  const product = useSelector((state) => selectProductById(state, id));
  if (!id) {
    return <p>PRODUCT ID REQUIRED</p>;
  }
  return (
    <>
      <Link to={`/product/${id}`} className="text-reset">
        <div className={`itemContainer ${product.BIqty === 0 && "disabled"}`}>
          <img src={product.img[0]} alt="" className="itemImg" />

          <p className="productName">{product.BIproductname}</p>
          <div className="priceContainer">
            <p className="price">₹{product.BIprice}</p>
          </div>
          <button className="cta">VIEW PRODUCT</button>
        </div>
      </Link>
    </>
  );
};

export default Item;
