import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Outlate.css'
import Popular from './popular/Popular';
import NewArrivals from './newArrivals/NewArrivals';
import BestSellers from './BestSellers/BestSellers';
const OutlateProduct = memo(() => {
  
  const [pageLoading,setPageLoading]= useState(false)
  const [activeProduct,setActiveProduct]=useState('best-sallers')
  const outLateProductsNav =[
    {    
         id : '0',
         name : 'Best Sellers',
         value : 'best-sallers'
    },
    {    
         id : '1',
         name : 'Popular',
         value : 'popular'
    },
    {    
         id : '2',
         name : 'New Arrivals',
         value : 'new-arrivals'
    }
     ]


  return (
    <>
    <div className="outlate-page">
        <div className="out-late-item-header">
              {
               outLateProductsNav.map((item,index)=>{
                    return(
                         <p key={index} className={`nav_item ${activeProduct === item.value && 'activeNav'}`} onClick={()=>setActiveProduct(item.value)}>{item.name}</p>
                    )
               })
              }
        </div>
        <div >
        {
          activeProduct === 'popular' ? <Popular /> :
          activeProduct === 'new-arrivals' ? <NewArrivals /> : 
          <BestSellers /> 
        }</div>
    </div>
    </>
  );
});

export default OutlateProduct;
