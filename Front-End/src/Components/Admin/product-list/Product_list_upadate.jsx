import React, { useState } from 'react'
import UpdateProduct from '../Update-product/UpdateProduct'
import Product_list from './Product_list'

const Product_list_upadate = () => {
     const [isUpdating,setIsUpdating]=useState(false)
     const [updateProductId,setUpdateProductId]=useState('')
     const productUdated =()=>{
          setIsUpdating(false)
        }
     const updatingProductId =(id,isUpdating)=>{
          setUpdateProductId(id)
          setIsUpdating(isUpdating)
        }
  return (isUpdating ? <UpdateProduct productUdated={productUdated} updateProductId={updateProductId}  /> : <Product_list updatingProductId={updatingProductId}/>)
}

export default Product_list_upadate
