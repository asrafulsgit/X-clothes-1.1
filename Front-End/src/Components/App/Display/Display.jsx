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
    image: "https://aicdn.picsart.com/3102c4ae-ff9e-48bc-9659-dbcde877d0bc.png",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Women’s Collection",
    description: "Elegant and expressive styles for every woman.",
    buttonText: "Shop Women's",
    path : '/women/201230',
    image: "https://aicdn.picsart.com/cb3a7e03-be32-475f-8ae3-c895604a273c.png",
    imagePosition: "right",
  },
  {
    id: 3,
    title: "Kid’s Collection",
    description: "Fun, bright, and comfy outfits for the little ones.",
    buttonText: "Shop Kid's",
    path : '/kids/301401',
    image: "https://aicdn.picsart.com/e049b09c-8199-40d1-9e38-fccdf6f5c2ff.png",
    imagePosition: "left",
  },
  {
    id: 4,
    title: "Winter Collection",
    description: "Embrace the chill with cozy and stylish winter wear.",
    buttonText: "Shop Winter",
    path : '/winter/12233342',
    image: "https://aicdn.picsart.com/cfd0a8b9-2103-46c4-854c-a1248d7db476.png",
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
          }, 5000);
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
