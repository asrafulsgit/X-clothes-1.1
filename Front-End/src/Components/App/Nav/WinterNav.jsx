import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import image from '../../../assets/nav-image/winter.jpg'
import { winterNavData } from '../../../allProductDetails/ProductCategories';

const WinterNav = () => {
  const dispatch = useDispatch()
  const hanldeClick =()=>{
     dispatch(setSecondaryNav(false))
  }
     
  return (
    <>
      <div className='secondary-nav-item winter-secondary-nav'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div  className='winter-secondary-nav-links'>
                    {/* winter mens nav */}
                    <div className='secondary-nav-links '>
                      <h2>Mens</h2>
                      {winterNavData.winterMens.
                      map((item,index)=>{
                        const {name,subcategory}= item;
                        return <NavLink key={index} to={`/winter/${subcategory}`} onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                      })}  
                    </div>
                    {/* winter womens nav */}
                    <div className='secondary-nav-links'>
                      <h2>Womens</h2>
                      {winterNavData.winterWomens.
                      map((item,index)=>{
                        const {name,subcategory}= item;
                        return <NavLink key={index} to={`/winter/${subcategory}`} onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                      })}  
                    </div>
                    {/* winter kids nav */}
                    <div className='kids-winter-secondary-nav'>
                      {/* winter kids-boys nav */}
                      <div className='secondary-nav-links'>
                        <h2>Boys</h2>
                        {winterNavData.winterBoys.
                        map((item,index)=>{
                          const {name,subcategory}= item;
                          return <NavLink key={index} to={`/winter/${subcategory}`} onClick={()=> hanldeClick(subcategory)}>{name}</NavLink>
                        })}  
                      </div>
                      {/* winter kids-girls nav */}
                      <div className='secondary-nav-links'>
                        <h2>Girls</h2>
                        {winterNavData.winterGirls.
                        map((item,index)=>{
                          const {name,subcategory}= item;
                          return <NavLink key={index} to={`/winter/${subcategory}`} onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                        })}  
                      </div>
                    </div>
                </div>
                
       </div>
    </>
  )
}

export default WinterNav
