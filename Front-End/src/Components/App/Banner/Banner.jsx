import React from 'react'

import './Banner.css'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <div className='banner'>
        <div className='banner-left'>
        </div>
        <div className='banner-right'>
          <h1 className='banner-header'>"Wear Your Confidence"</h1>
          <h3 className='banner-details'>Find your fashion favorites! Browse our latest arrivals and enjoy the perfect blend of quality, comfort, and style for every season. Transform your look with our exclusive pieces! Shop now to discover the latest trends and timeless classics that will never go out of style.</h3>
          <button className='banner-btn'><Link to='/products/shop' >Shop More</Link></button>
        </div>
    </div>
  )
}

export default Banner
