import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './BestSellers.css'
import OutlateProduct from '../OutlateProduct'


const BestSellers = () => {
     const [message, setMessage]= useState('')
     const [outLateProuducts,setOutlateProducts]= useState([])
     const [category,setCategory]=useState('')
     useEffect(()=>{
          
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
                         <p key={index} onClick={()=>setCategory(item.name)}>{item.name}</p>
                    )
               })
              }
          </div>
          <div className='out-late-item'>
               <p></p>
          </div>   
     </div>
     </> 
  )
}

export default BestSellers
