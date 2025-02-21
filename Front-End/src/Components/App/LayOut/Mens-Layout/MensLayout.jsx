import React, { useState } from 'react'
import './MensLayout.css'

import {Link} from 'react-router-dom'

import blazer from '../../../../assets/layout/mens/blazer.jpg'
import shirt from '../../../../assets/layout/mens/shirt.jpg'
import tShirt from '../../../../assets/layout/mens/t-shirt.jpg'
import panzabi from '../../../../assets/layout/mens/panzabi.jpg'

const MenstLayout = () => {
     const [layout,setLayout]=useState(0)
     const [animationClass, setAnimationClass] = useState('active');
     
     const layouts = [
          {
               image : blazer,
               title : 'Faux Fur Trim Parka  Water-Resistant & Warm',
               subtitle : 'Stay cozy during chilly winter adventures | Windproof design with deep pockets',
               path : '/men'
          },
          {
               image : shirt,
               title : 'Handwoven Silk Saree – Traditional Banarasi Design',
               subtitle : 'A timeless choice for weddings and festive occasions | Pure silk with intricate zari work',
               path : '/men'
          },
          {
               image : panzabi,
               title : 'Silk Shalwar Kameez – Handcrafted with Intricate Detailing',
               subtitle : 'Perfect for weddings and formal events | Luxurious and elegant design',
               path : '/men'  
          },
          {
               image : tShirt,
               title : 'Silk Shalwar Kameez – Handcrafted with Intricate Detailing',
               subtitle : 'Perfect for weddings and formal events | Luxurious and elegant design',
               path : '/men'  
          }
     ]
     const handleLayoutChange = (direction) => {
          setAnimationClass('exiting');
          setTimeout(() => {
            setLayout((prevLayout) => prevLayout + direction);
            setAnimationClass('entering');
            setTimeout(() => setAnimationClass('active'), 300); 
          }, 300); 
        };
  return (
    <div className='mens-layout-page'>
           <div className={`right-layout ${animationClass}`}>
               <div className='image-btns'>
                    <button className='upper-btn image-btn' 
                         disabled={layout+1 >= layouts.length} 
                         onClick={() => handleLayoutChange(1)}>
                         <i className="fa-solid fa-arrow-up"></i>
                    </button>
                    <button className='lower-btn image-btn'
                         disabled={layout===0}
                         onClick={() => handleLayoutChange(-1)}>
                         <i className="fa-solid fa-arrow-down"></i>
                    </button>
               </div>
               <img src={layouts[layout].image} loading='lazy' alt="layout-image" />
               
           </div>
           <div className={`left-layout ${animationClass}`}>
               <div className="layout-details">
                    <h1>{layouts[layout].title}</h1>
                    <p>{layouts[layout].subtitle}</p>
               </div>
               <div className="left-btns">
                    <Link to={layouts[layout].path}>
                         <button className='shop-now'>Shop Now</button>
                    </Link>
               </div>
           </div>
    </div>
  )
}

export default MenstLayout
