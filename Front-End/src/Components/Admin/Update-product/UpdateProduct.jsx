import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { categories, subCategories } from '../../../allProductDetails/ProductCategories'
import {useNavigate, useParams } from 'react-router-dom'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'


const UpdateProduct = ({updateProductId}) => {
     const [pageLoading,setPageLoading]= useState(true)
     const initialProduct = {
          id : updateProductId,
          brand : '',
          title : '',
          price : '',
          color : '',
          colors : [],
          size : '',
          sizes  : [],
          stock : '',
          category : '',
          subcategory : '',
          description : '',
     }
     const [product,setProduct] = useState(initialProduct)

     // get prduct info 
     useEffect(()=>{
          if(updateProductId){
               const apiCalling =async()=>{
                    try {
                      const data = await apiRequiestWithCredentials('get',`/get-one-product/${updateProductId}`)
                      setProduct(data.product)
                      console.log(data)
                      setPageLoading(false)
                    } catch (error) {
                         console.log(error)
                         setPageLoading(false)
                    }
                  }
                  apiCalling()
          }
     //      axios.post('http://localhost:8000/get-one-product',{updateProductId})
     //      .then((res)=>{
     //                 const {brand,title,price,sizes,colors,description,stock,category,subcategory}= res.data.product;
     //                 setProduct((prevState)=>({
     //                          ...prevState,
     //                          brand,
     //                          title,
     //                          price,
     //                          sizes,
     //                          colors,
     //                          stock,
     //                          description,
     //                          category,
     //                          subcategory
     //                 }))
     //                 setIsProduct(true)
     //            }).catch((err)=>{
     //                 dispatch(setMessage(err.response.data.message))
     //                 setIsProduct(true)
     //  })
     },[updateProductId])
     
     const handleChange =(e)=>{
          const {name,value} = e.target;
               setProduct((prevState) => ({
                    ...prevState,
                    [name] : value 
               }))
     }
     // colors setup 
     const addColor =()=>{
          if(product.color.length > 0){
               setProduct((prevState) => ({
                    ...prevState,
                    colors : [...prevState.colors, prevState.color],
                    color : ''
               }))
          }
          
     }
     const handleColors =(itemIndex)=>{
          const filterColors = product.colors.filter((item,index)=> index !== itemIndex)
          setProduct((prevState) => ({
               ...prevState,
               colors : filterColors, 
          }))
     }
     // sizes setup
     const handleSizes =(itemIndex)=>{
          const filterSizes = product.sizes.filter((item,index)=> index !== itemIndex)
          setProduct((prevState)=>({
               ...prevState,
               sizes : filterSizes
          }))
     }
     const productSizes=['M','L','XL','XXL']
     const hanleproductSize=(e)=>{ 
          const size = e.target.value;
          if(!product.sizes.includes(size)){
               setProduct((prevState) => ({
                    ...prevState,
                    sizes : [...prevState.sizes, size],
                    size : size
               })) 
          }      
     }
     // submit updated Data
     const handleSubmit =async(e)=>{
          e.preventDefault();
          try {
               await apiRequiestWithCredentials('put','/admin/update-product',product)
               setMessage(res.data.message)
               setProduct(initialProduct)
          } catch (error) {
               setMessage(err.response.data.message)
          }
          axios.put('http://localhost:8000/admin/update-product',product)
          .then((res)=>{
               dispatch(setMessage(res.data.message))
               setProduct(initialProduct)
          }).catch((err)=>{
               dispatch(setMessage(err.response.data.message))
          }) 
     } 

     if(pageLoading){
          return(
               <h1>Data is Loading....</h1>
          )
     }
  return (
    <div className='add-product-page'>
              <div className="add-product-section">
                   {/* <h1 className='product-added-message'>{message}</h1> */}
                   <form onSubmit={handleSubmit}>
                        <div className='form-all-items'>
                             <div className='form-left-items'>
                                  <div className='form-item'>
                                       <label htmlFor="brand">Brand Name</label>
                                       <input type="text" name='brand' 
                                       onChange={handleChange} 
                                       value={product.brand}  
                                       id='brand' required/>
                                  </div>
                                  <div className='form-item'>
                                       <label htmlFor="title">Product Title</label>
                                       <input type="text" name='title' 
                                       onChange={handleChange}  
                                       value={product.title} 
                                       id='title' required/>
                                  </div>
                                  <div className='form-item'>
                                       <label htmlFor="price">Product Price</label>
                                       <input type="number" name='price' 
                                       onChange={handleChange} 
                                       value={product.price} 
                                       id='title' required/>
                                  </div>
                                  <div className='form-item'>
                                            <label htmlFor="description">Product Description</label>
                                            <input type="text" 
                                            name='description' 
                                            onChange={handleChange} 
                                            value={product.description}
                                            id='description' required/>
                                  </div>
                             </div>
                             <div className='form-riht-items'>
                                   <div className='form-item'>
                                            <label htmlFor="stock">Product Stock</label>
                                            <input type="text" 
                                            name='stock' 
                                            onChange={handleChange} 
                                            value={product.stock}
                                            id='stock' required/>
                                   </div>
                                   <div className='form-item'>
                                       <label htmlFor="color">Product Color</label>
                                       <input type="text" name='color' value={product.color} onChange={handleChange}  id='color'/>
                                       <div className='showColors'>{
                                            product.colors.map((item,index)=>{
                                                 return(
                                                      <span key={index} onClick={()=>handleColors(index)} >
                                                           <p>{item}</p>
                                                           <i className="fa-solid fa-xmark"></i>
                                                      </span>
                                                 )
                                            })}
                                       </div>
                                  <button type='button' className='add-btn' onClick={addColor}>Add Color</button>
                                  </div>
                                  {/* size */}
                                  <div className='form-item'>    
                                       <label htmlFor="size">Product Size</label>
                                       <select name="size"
                                        value={product.size}
                                        className='size-input' onChange={hanleproductSize}
                                        id="productsize">
                                            <option value="" disabled>Select Option</option>
                                            {productSizes.map((size,index)=>{
                                               return  (
                                                 <option key={index} value={size}>{size}</option>
                                               )
                                            })}
                                       </select>

                                       <div className='showSizes showColors'>
                                            {product.sizes.map((item,index)=>{
                                                 return(
                                                      <span onClick={()=>handleSizes(index)} key={index}>
                                                           <p>{item}</p>
                                                           <i className="fa-solid fa-xmark"></i>                                            
                                                      </span>
                                                 )
                                            })} 
                                       </div>
                                  </div>
                                  {/* category */}
                                  <div className='form-item'>   
                                            <label htmlFor="category">Product Category</label>
                                            <select onChange={handleChange} 
                                            value={product.category} 
                                             name="category" id="category" className='categories-input'
                                             required >
                                                  <option value="" disabled>Select option</option>
                                                  {categories  && 
                                                  categories.map((item,index)=>{
                                                       const {name,category} = item;
                                                       return  <option key={index} value={category}>{name}</option>
                                                  })}
                                            </select>
                                  </div>
                                  {/* subcategory */}
                                  <div className='form-item'>
                                            <label htmlFor="category">Product Sub Category</label>
                                            <select onChange={handleChange} 
                                             value={product.subcategory}
                                             name="subcategory" id="subcategory" className='sub-categories-input'
                                             required >
                                                 <option value="" disabled>Select option</option>
                                                 {subCategories  && 
                                                 subCategories.map((item,index)=>{
                                                      const {name,category} = item;
                                                      return  <option key={index} value={category}>{name}</option>
                                                 })}
                                            </select>
                                  </div>
                             </div>
                        </div>
                        <button type='submit' className='product-add-btn'>Add Product</button>
                   </form>
              </div>
        </div>
  )
}

export default UpdateProduct
