import React from "react";
import "./reviewBox.scss";
import { AiFillStar } from "react-icons/ai";

const ReviewBox = ({ pfp, name, rating, review, title }) => {
  if (rating > 5) {
    rating = 5;
  }
  return (
    <>
      <div className="reviewBox">
        <div className="top">
          <div className="left">
            <img src={pfp} alt="" className="pfp" />
          </div>
          <div className="right">
            <p className="userName">{name}</p>
            <div className="rating">
              <ul className="ratingUL">
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <li className="ratingList" key={i}>
                      <AiFillStar />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h2 className="mb-3">{title}</h2>
          <p className="reviewPara">{review}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewBox;
