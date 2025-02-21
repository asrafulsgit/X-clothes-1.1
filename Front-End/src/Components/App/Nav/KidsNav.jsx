import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import image from '../../../assets/nav-image/kids.jpg'
import { kidsNavData } from '../../../allProductDetails/ProductCategories';
const KidsNav = () => {
    const dispatch = useDispatch()
     const hanldeClick =()=>{
        dispatch(setSecondaryNav(false))
     }
    
  return (
    <>
      <div className='kids-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div  className='winter-secondary-nav-links'>
                  <div className='secondary-nav-links'>
                    <h2>Boys</h2>
                    {kidsNavData.boysNavData.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to={`/kids/${subcategory}`} 
                      onClick={()=>hanldeClick(subcategory)}>{name}</NavLink>
                    })} 
                  </div> 
                  <div className='secondary-nav-links'>
                    <h2>Girls</h2>
                    {kidsNavData.girlsNavData.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to={`/kids/${subcategory}`} onClick={()=>hanldeClick(subcategory)} >{name}</NavLink>
                    })} 
                  </div> 
                </div>
     </div>
    </>
  )
}

export default KidsNav
