import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./slider.css";

const Slider = () => {
  const slides = [
    {
      img: "1.jpg",
      alt: "Food Images",
    },
    {
      img: "2.jpg",
      alt: "Food Images",
    },
    {
      img: "3.jpg",
      alt: "Food Images",
    },
    {
      img: "4.jpg",
      alt: "Food Images",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div
        className="slider"
        style={{
          backgroundImage: `url(${slides[currentIndex].img})`,
        }}
      >
        <div className="slider-contents">
          <h2>Order Your Favorite Items Here!</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id eum
            iste minus ducimus. Quibusdam, modi maiores perferendis a eius
            exercitationem rerum ratione minus necessitatibus tempora itaque,
            architecto vero repellat qui.
          </p>
          <div className="view-menu-btn">
            <Link to="/Menu">
              <button>View Menu</button>
            </Link>
          </div>
        </div>
      </div>
      <img src="upload.png" className="btn-pre" onClick={prevSlide}></img>
      <img src="upload1.png" className="btn-next" onClick={nextSlide}></img>
    </>
  );
};

export default Slider;
