import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './BestSellers.css'
import OutlateProduct from '../OutlateProduct'


const BestSellers = () => {
     const [message, setMessage]= useState('')
     const [bestSellers,setBestSellers]= useState([])
     useEffect(()=>{
          axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['120130','230240','330340','420440']})
          .then((res)=>{
               const products = res.data.products.slice(0,6)
               setBestSellers(products)
          }).catch((err)=>{
               dispatch(setMessage(err.response.data.message))
          })
     },[])
     const outLateProductsNav =[
          {    
               id : '0',
               name : 'Best Sellers'
          },
          {    
               id : '1',
               name : 'Popular'
          },
          {    
               id : '2',
               name : 'New Arrivals'
          }
     ]
     return (
     <>
     <div className="best-seller-page">
          <div className="out-late-item-header">
              {
               outLateProductsNav.map((item,index)=>{
                    return(
                         <p key={index}>{item.name}</p>
                    )
               })
              }
          </div>
          <div className='out-late-item'>
               {bestSellers.length <=0 ? <p>{message}</p> :
               bestSellers.map((item)=>{
               return <OutlateProduct key={uuidv4()} item={item} />
               })}
          </div>   
     </div>
     </> 
  )
}

export default BestSellers
