import React, { useState } from 'react'
import './offer.css'
import offer_image from '../../../assets/offer/offer.png'
import { Link } from 'react-router-dom'
const Offer = () => {
  return (
    <div className='offer-page'>
          <div className="offer-image">
               <img src="https://i.ibb.co.com/8LBd1LGT/Capture-Photoroom.png" alt="offer-image" />
          </div>
          <div className="offer-details">
               <p className='header'>Limited Time Offers</p>
               <h1 className='title'>25% Off All Fashion
                    <br /> Favorites- Limited Time!
               </h1>
               <p className='sub-title'>Don't miss out on our exclusive limited-time offer!
               <br /> Shop trendy styles at unbeatable prices before it's too late!</p>
               <Link><button className='shop-now-btn'>Shop Now <i className="fa-solid fa-arrow-right-long"></i></button></Link>
          </div>
    </div>
  )
}

export default Offer
