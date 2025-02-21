import React from 'react'
import { NavLink } from 'react-router-dom';

import image from '../../../assets/nav-image/womens.jpg'
import { womensNavData } from '../../../allProductDetails/ProductCategories';
const WomensNav = (subNavClose) => {
  const hanldeClick =()=>{
    subNavClose(false)
 }
  return (
    <>
      <div className='womens-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div className='secondary-nav-links'>
                    {womensNavData &&
                    womensNavData.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to={`/women/${subcategory}`} onClick={()=>hanldeClick(subcategory)} >{name}</NavLink>
                    })}  
                </div>
       </div>
    </>
  )
}

export default WomensNav
