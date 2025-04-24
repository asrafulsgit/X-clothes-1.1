import React from 'react'
import Display from '../Display/Display'
import Brands from '../Brands/Brands'
import Layout from '../LayOut/Layout'
import BestSellers from '../Outlate/BestSellers/BestSellers'
import Deals from '../deal_today/Deals'
import Offer from '../Offers/Offer'
import Discount from '../discount/Discount'
import Subscription from '../subscription/subscription'

const Landing_page = () => {
  return (
    <>
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
    </>    
)
}

export default Landing_page
