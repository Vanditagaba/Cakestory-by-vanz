import React, { useState } from "react";
import "./productCarousel.scss";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const ProductCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <>
      <div className="carousel">
        <img src={slides[currentIndex]} alt="" className="carouselImage" />

        <div className="controls">
          <div className="arrow" onClick={goToPrev}>
            <FiArrowLeft />
          </div>

          <div className="currentSlide">
            {currentIndex + 1}/ {slides.length}
          </div>
          <div className="arrow" onClick={goToNext}>
            <FiArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
