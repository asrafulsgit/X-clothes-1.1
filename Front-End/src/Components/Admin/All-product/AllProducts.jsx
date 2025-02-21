import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AllProduct.css'
import { NavLink } from 'react-router-dom'

const AllProducts = () => {
  const [allProduct,setAllProduct] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/admin/all-product')
    .then((res)=>{
      setAllProduct(res.data.products)
    }).catch((err)=>{
      alert(err.response.data.message)
    })
  },[])
  
  const handleDelete =(id)=>{
    axios.delete('http://localhost:8000/admin/delete-product', {data :{id : id}})
    .then((res)=>{
      console.log(res)
      window.location.reload();
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className='all-product-page'>
       <div className='all-product-section'>
          <div className="product-cards">

            {allProduct.map((item)=>{
              const {brand,title,price,images,_id}= item;
              return(
                <div className="product-card" key={_id}>
                  <img src={images[0]} alt="" />
                  <div className="product-details">
                    <p>{brand}</p>
                    <h3>{title}</h3>
                    <p>{price}</p>
                    <p>{_id}</p>
                    <div className="edit-btns">
                      <button onClick={()=>handleDelete(_id)}>Delete</button>
                      <button><NavLink to={`/admin/update-product/${_id}`} >Update</NavLink></button>
                    </div>
                  </div>
                </div>
              )
            })}
              
          </div>
       </div>
    </div>
  )
}

export default AllProducts
