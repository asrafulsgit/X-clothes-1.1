import React, { useState } from 'react';
import './WomensLayout.css';
import { Link } from 'react-router-dom';

import saree from '../../../../assets/layout/womens/saree.jpg';
import salwar from '../../../../assets/layout/womens/salwar.jpg';
import sweater from '../../../../assets/layout/womens/sweater.jpg';

const WomensLayout = () => {
  const [layout, setLayout] = useState(0);
  const [animationClass, setAnimationClass] = useState('active');

  const layouts = [
    {
      image: sweater,
      title: 'Faux Fur Trim Parka  Water-Resistant & Warm',
      subtitle: 'Stay cozy during chilly winter adventures | Windproof design with deep pockets',
      path: '/women',
    },
    {
      image: saree,
      title: 'Handwoven Silk Saree – Traditional Banarasi Design',
      subtitle: 'A timeless choice for weddings and festive occasions | Pure silk with intricate zari work',
      path: '/women',
    },
    {
      image: salwar,
      title: 'Silk Shalwar Kameez – Handcrafted with Intricate Detailing',
      subtitle: 'Perfect for weddings and formal events | Luxurious and elegant design',
      path: '/women',
    },
  ];

  const handleLayoutChange = (direction) => {
    setAnimationClass('exiting');
    setTimeout(() => {
      setLayout((prevLayout) => prevLayout + direction);
      setAnimationClass('entering');
      setTimeout(() => setAnimationClass('active'), 300); 
    }, 300); 
  };

  return (
    <div className="womens-layout-page">
      <div className={`left-layout ${animationClass}`}>
        <div className="layout-details">
          <h1>{layouts[layout].title}</h1>
          <p>{layouts[layout].subtitle}</p>
        </div>
        <div className="left-btns">
          <Link to={layouts[layout].path}>
            <button className="shop-now">Shop Now</button>
          </Link>
        </div>
      </div>
      <div className={`right-layout ${animationClass}`}>
        <img src={layouts[layout].image} loading="lazy" alt="layout-image" />
        <div className="image-btns">
          <button
            className="upper-btn image-btn"
            disabled={layout + 1 >= layouts.length}
            onClick={() => handleLayoutChange(1)}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button
            className="lower-btn image-btn"
            disabled={layout === 0}
            onClick={() => handleLayoutChange(-1)}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WomensLayout;
