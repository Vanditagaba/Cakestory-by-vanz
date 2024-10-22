import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="top">
          <h2 className="text">FRESHLY BAKED DAILY</h2>
          <h2 className="text">CUSTOM DESIGNS AVAILABLE</h2>
          <h2 className="text">DELIVERY ACROSS DELHI</h2>
          <h2 className="text">ORDER SUPPORT ANYTIME</h2>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="top">
              <h2 className="heading">HELP</h2>
              <ul className="footerList">
                <li className="footerItem">FAQ</li>
                <li className="footerItem">Terms</li>
                <li className="footerItem">Contact</li>
                <li className="footerItem">Shipping</li>
              </ul>
            </div>
            <div className="top">
              <h2 className="heading">FOLLOW US</h2>
              <ul className="footerList">
                <li className="footerItem">facebook</li>
                <li className="footerItem">twitter</li>
                <li className="footerItem">instagram</li>
                <li className="footerItem">pinterest</li>
                <li className="footerItem">tumblr</li>
              </ul>
            </div>
          </div>
          <div className="middle">
            <div className="top">
              <h2 className="heading">SHIPPING</h2>

              <p className="text">FREE STANDARD SHIPPING</p>

              <p className="text">
                Delivery times are approximately 4 to 7 hours
              </p>

              <p className="text">
                For additional information, please consult the Shipping Policy
              </p>
            </div>

            <div className="top">
              <h2 className="heading">NEWSLETTER</h2>

              <form method="post">
                <input
                  type="email"
                  name="newsletter"
                  className="newsletter"
                  placeholder="Enter your Email Address"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="logo">
          <p className="title">CAKESTORY BY VANZ</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
