import React from 'react'
import Display from '../Display/Display'
import Brands from '../Brands/Brands'
import Layout from '../LayOut/Layout'
import Deals from '../deal_today/Deals'
import Offer from '../Offers/Offer'
import Subscription from '../subscription/subscription'
import OutlateProduct from '../Outlate/OutlateProduct'
import Flat_Discount from '../discount/Flat_Discount'

const Landing_page = () => {
  
  return (
    <>
    <Display />
        <div className='app-main'>
          <Brands />
          <Layout />
          <OutlateProduct />
          <Deals />
        </div>
          <Offer />
        <div className='app-main'>
         <Flat_Discount />
         <Subscription />
        </div>
    </>    
)
}

export default Landing_page
