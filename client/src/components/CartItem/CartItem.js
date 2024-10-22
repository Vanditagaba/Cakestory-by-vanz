import React from "react";
import "./cartItem.scss";
import { FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../../app/slice/productsApiSlice";
import { removeProduct } from "../../app/slice/cartSlice";

const CartItem = ({ id, quantity, color, size }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductById(state, id));
  return (
    <>
      <div className="cartItemContainer">
        <div className="left">
          <img src={product.img[0]} alt="" className="productImg" />
        </div>
        <div className="right">
          <div className="top">
            <p className="productName">{product.BIproductname}</p>
            <FiX className="icon" onClick={() => dispatch(removeProduct(id))} />
          </div>
          <p className="price">₹{product.BIprice.toFixed(2)}</p>
          <div className="bottom">
            <div className="detailsContainer">
              <p className="detailTitle">Color/Flavor: </p>
              <p className="detail">{color}</p>
            </div>

            <div className="detailsContainer">
              <p className="detailTitle">Size: </p>
              <p className="detail">{size}</p>
            </div>

            <div className="detailsContainer">
              <p className="detailTitle">Quantity: </p>
              <div className="quantityContainer">
                <p className="quantity">{quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
