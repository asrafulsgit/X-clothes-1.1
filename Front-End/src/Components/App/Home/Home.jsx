import React from 'react'


import Nav from '../Nav/Nav'
import Display from '../Display/Display'
import Footer from '../Footer/Footer'

import BestSellers from '../Outlate/BestSellers/BestSellers'
import Brands from '../Brands/Brands'
import Layout from '../LayOut/Layout'
import Offer from '../Offers/Offer'
import Deals from '../deal_today/Deals'
import Discount from '../discount/Discount'
import Subscription from '../subscription/subscription'



const Home = () => {

  return (
    <div>
        <Nav />
          <Display />
        <div className='app-main'>
          <Brands />
          <Layout />
          <BestSellers />
          <Deals />
        </div>
          <Offer />
        <div className='app-main'>
         <Discount />
         <Subscription />
        </div>
        <Footer />
    </div>
  )
}

export default Home
