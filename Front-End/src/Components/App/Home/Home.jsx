import React from 'react'


import Nav from '../Nav/Nav'
import Display from '../Display/Display'
import Footer from '../Footer/Footer'

import BestSellers from '../Outlate/BestSellers/BestSellers'
import Brands from '../Brands/Brands'
import Layout from '../LayOut/Layout'
import Offer from '../Offers/Offer'
import Deals from '../deal_today/Deals'



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
        <Footer />
    </div>
  )
}

export default Home
