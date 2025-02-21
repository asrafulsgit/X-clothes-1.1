import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


import Nav from '../Nav/Nav'
import Display from '../Display/Display'
import Banner from '../Banner/Banner'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'

import NewArrivals from '../NewArrivals/NewArrivals'
import Show from '../Show/Show'
import BestSellers from '../Outlate/BestSellers/BestSellers'
import Brands from '../Brands/Brands'
import WomensLayout from '../LayOut/Womens-Layout/WomensLayout'
import MenstLayout from '../LayOut/Mens-Layout/MensLayout'
import KidsLayout from '../LayOut/Kids-Layout/KidsLayout'



const Home = () => {

  return (
    <div>
        {/* <Nav /> */}
        <div>
          {/* <Display /> */}
          {/* <Brands /> */}
          {/* <Show /> */}
          <BestSellers />
        </div>
        <div className='main'>     
            {/* <OutLate /> */}
            {/* <Banner />   */}
            <NewArrivals />
            <WomensLayout />
            <MenstLayout />
            <KidsLayout />
            <Contact /> 
        </div>
        <Footer />
    </div>
  )
}

export default Home
