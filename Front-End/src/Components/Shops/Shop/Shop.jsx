import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './Shop.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import OutlateProduct from '../../App/Outlate/OutlateProduct'
import axios from 'axios';


const Shop = () => {
   const [products,setProducts]=useState([])
   const [isLoading,setIsLoading]=useState(true)
   useEffect(()=>{
    axios.get('http://localhost:8000/admin/all-product')
    .then((res)=>{
      setProducts(res.data.products)
      setIsLoading(false)
    }).catch((err)=>{
      setIsLoading(false)
      alert(err.response.data.message)
    })
  },[])
  if(isLoading){
    return(
      <p>Loading...</p>
    )
  }
  return (
    <>
      <Nav />
      <div className='shop'>
          {products.map((item)=>{
            return <OutlateProduct key={uuidv4()} item={item}/>
          })}
      </div>
      <Footer />
    </>
    
  )
}

export default Shop
