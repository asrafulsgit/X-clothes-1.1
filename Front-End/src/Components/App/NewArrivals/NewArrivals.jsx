import React from 'react'

import './NewArrivals.css'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
  return (
    <div className='new-arrivals-section'>
          <div className="new-arrivals">
               <h1 className='new'>NEW <br /><span>ARRIVAL</span></h1>
               <p>"Inspired by classic silhouettes and refined detailing, each piece exudes sophistication and grace."</p>
               <Link to=''><button className='new-arrival-btn'>Buy Now</button></Link>
          </div>
    </div>
  )
}

export default NewArrivals
