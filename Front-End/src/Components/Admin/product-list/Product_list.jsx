import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AllProduct.css'
import { NavLink } from 'react-router-dom'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import UpdateProduct from '../Update-product/UpdateProduct'


const Product_list = () => {
  const [allProduct,setAllProduct] = useState([])
  const [isUpdating,setIsUpdating]=useState(false)
  const [updateProductId,setUpdateProductId]=useState('')
  const [pageLoading,setPageLoading]=useState(true)
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
        const data = await apiRequiestWithCredentials('get','/admin/all-product')
        setAllProduct(data.products)
        setPageLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    apiCalling()
  },[])
  
  const handleDelete =async(productId)=>{
    try {
      await apiRequiestWithCredentials('delete',`/admin/delete-product/${productId}`)
      setAllProduct(allProduct.filter(product=> product._id !== productId))
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit =(productId)=>{
    setUpdateProductId(productId)
    setIsUpdating(true)
  }
  const productUdated =()=>{
    setIsUpdating(false)
  }

  return (
    <>
    <div className={`product-list-page ${isUpdating && 'product-list-none'}`}>
      <div className="product-list">
        <div className="page-title"><h1>Product List</h1></div>
        <div className="header">
          <input type="text" placeholder="Search Here" className="search-box" />
          <button className="add-product">+ Add Product</button>
        </div>
        {pageLoading ? 'loading...' : <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product,index) =>{ 
              const {images,title,price,stock}=product;
              return(
                <tr key={index}>
                <td>{index < 9 ? `0${index+1}` : index+1}</td>
                <td><img src={images[0] || ''} alt={title} className="product-image" /></td>
                <td>{title.length > 15 ? `${title.slice(0, 14)}...` : title}</td>
                <td>BDT {price}</td>
                <td>{stock}</td>
                <td>clothes</td>
                <td>
                  <span className={`status ${stock > 0 ? "in-stock" : "out-of-stock"}`}>
                  {stock > 0 ? "In Stock" : "out-of-stock"}
                  </span>
                </td>
                <td className="actions">
                  <button className="edit" onClick={()=>handleEdit(product._id)} ><i className="fa-solid fa-pen-to-square"></i></button>
                  <button className="delete" onClick={()=>handleDelete(product._id)}><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>}
      </div>
    </div>
    <div className={`product-edit-page ${isUpdating && 'product-edit-block'}`}>
      <UpdateProduct productUdated={productUdated} updateProductId={updateProductId}/>
    </div>
    </>
  );
}

export default Product_list
