import React from 'react'
import { NavLink} from 'react-router-dom';
import image from '../../../assets/nav-image/mens.jpg'
import { mensNavData } from '../../../allProductDetails/ProductCategories';
const MensNav = (subNavClose) => {
     const hanldeClick =()=>{
        subNavClose(false)
     }
    
  return (
    <>
      <div className='mens-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                  <div className='secondary-nav-links'>
                    {mensNavData &&
                    mensNavData.map((item,index)=>{
                      const {name,category}= item;
                      return <NavLink key={index} to={`/men/${category}`} onClick={()=>hanldeClick(category)}>{name}</NavLink>
                    })}
                  </div> 
       </div>
    </>
  )
}

export default MensNav
