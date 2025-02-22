import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


import Nav from '../Nav/Nav'
import Display from '../Display/Display'
import Banner from '../Banner/Banner'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'

import BestSellers from '../Outlate/BestSellers/BestSellers'
import Brands from '../Brands/Brands'
import Layout from '../LayOut/Layout'
import Offer from '../Offers/Offer'



const Home = () => {

  return (
    <div>
        <Nav />
        <div className='app-main'>
          {/* <Display /> */}
          <Brands />
          {/* <Layout /> */}
          <BestSellers />
        </div>
          <Offer />
        <Footer />
    </div>
  )
}

export default Home
