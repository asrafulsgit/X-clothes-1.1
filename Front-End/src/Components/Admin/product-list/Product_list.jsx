import React, { useEffect, useState } from 'react'
import './AllProduct.css'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import Loading from '../../../utils/loading/Loading'
import { Link } from 'react-router-dom'


const Product_list = () => {
  const [allProduct,setAllProduct] = useState([])
  
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
 
  if(pageLoading){
    return(<>
      <Loading />
    </>
    )
  }
  
  return (
    <div className='product-list-page'>
      <div className="product-list">
        <div className="page-title"><h1>Product List</h1></div>
        <div className="header">
          <input type="text" placeholder="Search Here" className="search-box" />
          <Link to='/admin/add-product' >
          <button className="add-product-btn">+ Add Product</button>
          </Link>
        </div>
         <table>
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
                  <Link to={`/admin/product/update/${product._id}`}><button className="edit" ><i className="fa-solid fa-pen-to-square"></i></button></Link>
                  <button className="delete" onClick={()=>handleDelete(product._id)}><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product_list
