import React from 'react'

import './discount.css'
import { Link } from 'react-router-dom'
const Flat_Discount = () => {
  return (
     <div className="discount-page">
     <div className="discount-card-mens discount-card">
          <div className="discount-details">
               <p className="discount">Flat 20% Discount</p>
               <h1 className="title">Men's Latest <br /> Collection</h1>
               <p className="description">Discover stylish new arrivals for men. <br /> High-quality fabrics and modern designs.</p>
               <Link to={`/product/discount/20`}><button>Shop Now <i className="fa-solid fa-arrow-right-long"></i></button></Link>
          </div>
     </div>
 
     <div className="discount-card-womens discount-card">
           <div className="discount-details">
          <p className="discount">Flat 25% Discount</p>
          <h1 className="title">Women's <br /> Latest Fashion</h1>
          <p className="description">Explore trendy women's fashion.  Find your <br /> perfect look with our diverse selection.</p>
          <Link to={`/product/discount/25`}><button>Shop Now <i className="fa-solid fa-arrow-right-long"></i></button></Link>
          </div>
     </div>
   </div>
  )
}

export default Flat_Discount
