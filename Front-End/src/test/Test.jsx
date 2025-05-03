import React, { useEffect, useState } from "react";
import './test.css'


const items = [1, 2, 3, 4, 5, 6, 7, 8];
  
const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const handleNext = () => {
    if (currentIndex + visibleCount < items.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="slider-container">
      <button className="arrow left" onClick={handlePrev} disabled={currentIndex === 0}>
        &#8249;
      </button>

      <div className="slider-viewport">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * (160)}px)` }}
        >
          {items.map((item, idx) => (
            <div className="slide-item" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className="arrow right"
        onClick={handleNext}
        disabled={currentIndex + visibleCount >= items.length}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Test;
