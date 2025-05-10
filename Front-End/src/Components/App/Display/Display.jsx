import React, { useEffect,  useState } from 'react';
import './Display.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Men’s Collection",
    description: "Embrace the chill with cozy and stylish winter wear.",
    buttonText: "Shop Men's",
    path : '/men/101120',
    image: "https://i.ibb.co.com/7LBP89V/mbfls14159-8-Photoroom.png",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Women’s Collection",
    description: "Elegant and expressive styles for every woman.",
    buttonText: "Shop Women's",
    path : '/women/201230',
    image: "https://i.ibb.co.com/4Z1T5Bjd/f9f37a14-a70f-498d-8339-72ca0239e485aa-Photoroom.png",
    imagePosition: "right",
  },
  {
    id: 3,
    title: "Kid’s Collection",
    description: "Fun, bright, and comfy outfits for the little ones.",
    buttonText: "Shop Kid's",
    path : '/kids/301401',
    image: "https://i.ibb.co.com/Z1fbr0Dg/677b13f4-acdd-45c0-8704-f8e9605f329f-Photoroom.png",
    imagePosition: "left",
  },
  {
    id: 4,
    title: "Winter Collection",
    description: "Embrace the chill with cozy and stylish winter wear.",
    buttonText: "Shop Winter",
    path : '/winter/12233342',
    image: "https://i.ibb.co.com/xSqZ71VD/i6upylvvp84fvro5yjjt-Photoroomaaa.png",
    imagePosition: "right",
  }
];
const Display=()=> {
  const [currentSlide, setCurrentSlide] = useState(0);
        const [prevSlide, setPrevSlide] = useState(null);
      
        useEffect(() => {
          const interval = setInterval(() => {
            setPrevSlide(currentSlide);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
          }, 3000);
          return () => clearInterval(interval);
        }, [currentSlide]);
  return (
    <>  
          <div className="hero-slider-page">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const isPrev = index === prevSlide;
      
              return (
                <div
                  className={`slide ${isActive ? "active" : ""} ${isPrev ? "previous" : ""}`}
                  key={slide.id}
                >
                  <div className={`content ${slide.imagePosition === "left" ? "right" : "left"}`}>
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <Link to={slide.path} >
                      <button className='display-btn'>{slide.buttonText}</button>
                    </Link>
                    
                  </div>
                  <div className={`image ${slide.imagePosition}`}>
                    <img className="main_image" src={slide.image} alt={slide.title} />
                  </div>
                </div>
              );
            })}
          </div>
    </>
  );
}

export default Display;
