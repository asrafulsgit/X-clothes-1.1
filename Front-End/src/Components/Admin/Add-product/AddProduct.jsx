import React, { useRef, useState } from 'react'

import './AddProduct.css'
import { categories, subCategories } from '../../../allProductDetails/ProductCategories'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'

const AddProduct = () => {
     const [productAdding, setProductAdding] = useState(false)
     const [imageSizeErr, setImageSizeErr] = useState('')
     const [message, setMessage] = useState('')
     const product = {
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
          taxes : import.meta.env.VITE_PRODUCT_TEX || '0',
          discount : import.meta.env.VITE_PRODUCT_DISCOUNT || '0'
     }
     let [newProduct,setNewProduct]= useState(product)
     const handleChange =(e)=>{
          const {name,value} = e.target;
               setNewProduct((prevState) => ({
                    ...prevState,
                    [name] : value, 
               }))
     }
     // colors setup 
     const addColor =()=>{
          if(newProduct.color.length > 0){
               setNewProduct((prevState) => ({
                    ...prevState,
                    colors : [...prevState.colors, prevState.color],
                    color : ''
               }))
          }    
     }
     const handleColors =(itemIndex)=>{
          const filterColors = newProduct.colors.filter((item,index)=> index !== itemIndex)
          setNewProduct((prevState) => ({
               ...prevState,
               colors : filterColors, 
          }))
     }
     // sizes setup
     const productSizes=['M','L','XL','XXL']
     const hanleproductSize=(e)=>{ 
          const size = e.target.value;
          if(!newProduct.sizes.includes(size)){
               setNewProduct((prevState) => ({
                    ...prevState,
                    sizes : [...prevState.sizes, size],
                    size : size
               })) 
          }      
     }
     const handleSizes =(itemIndex)=>{
          const filterSizes = newProduct.sizes.filter((item,index)=> index !== itemIndex)
          setNewProduct((prevState)=>({
               ...prevState,
               sizes : filterSizes
          }))
     }

     // select images field and reset
     const imageInput = useRef()
     // images setup
     const [images, setImages] = useState([])
     console.log(images)
     const handleImageChange =(e)=>{
          setImages(e.target.files)
     }
     const handleSubmit =async(e)=>{
          e.preventDefault();
          setProductAdding(true)
          setMessage('Product is adding....')
          const formData = new FormData()
         
          let imageSize = 0
          for (let index = 0; index < images.length; index++) {
                formData.append('images',images[index])
                imageSize += images[index].size
          }
          
          if(imageSize > 2097152){
               setImageSizeErr('Image Size must be 2mb')
               setTimeout(() => {
                    setImageSizeErr('')
               }, 2000);
               setProductAdding(false)
               return;
          }
          
          formData.append('productData',JSON.stringify(newProduct))


         try {
           const data = await apiRequiestWithCredentials('post','/admin/add-product',formData)
           setMessage(data.message)
           setNewProduct(product)
           imageInput.current.value = '';
           setImages([])
           setProductAdding(false)
         } catch (error) {
          console.log(error)
               setMessage(error.response?.data?.message)
               setProductAdding(false)
         }
     }
     const [isTaxChange,setIsTaxChange]=useState(false)
     const [isDiscountChange,setIsDiscountChange]=useState(false)
  return (
    <div className='add-product-page'>
          <div className="add-product-section">
               <h1 className='product-added-message'>{message}</h1>
               <form onSubmit={handleSubmit} method='post' action="/admin/add-product" encType="multipart/form-data" >
                    <div className='form-all-items'>
                         <div className='form-left-items'>
                              <div className='form-item'>
                                   <label htmlFor="brand">Brand Name</label>
                                   <input type="text" name='brand' 
                                   onChange={handleChange} 
                                   value={newProduct.brand}  
                                   id='brand' required/>
                              </div>
                              <div className='form-item'>
                                   <label htmlFor="title">Product Title</label>
                                   <input type="text" name='title' 
                                   onChange={handleChange}  
                                   value={newProduct.title} 
                                   id='title' required/>
                              </div>
                              <div className='form-item'>
                                   <label htmlFor="price">Product Price</label>
                                   <input type="number" name='price' 
                                   onChange={handleChange} 
                                   value={newProduct.price} 
                                   id='title' required/>
                              </div>
                              <div className='form-item'>
                                        <label htmlFor="images">Product Images</label>
                                        <input type='file' 
                                        name='images'  
                                        multiple 
                                        onChange={handleImageChange}
                                        ref={imageInput}                                      
                                        id='images' required/>
                                        <p className='image-err-message'>{imageSizeErr}</p>
                              </div>
                              <div className='form-item'>
                                        <label htmlFor="description">Product Description</label>
                                        <input type="text" 
                                        name='description' 
                                        onChange={handleChange} 
                                        value={newProduct.description}
                                        id='description' required/>
                              </div>
                              <div className='form-item'>
                                   <label htmlFor="taxes">Tax <small>%</small></label>
                                   <div className="tax_discount" >
                                        <input type="number" name='taxes' 
                                        onChange={handleChange} 
                                        value={newProduct.taxes} 
                                        disabled={!isTaxChange}
                                        id='taxes' required/>
                                        <input type="checkbox" onClick={()=>setIsTaxChange(!isTaxChange)} name="taxes" id="checkbox" />
                                   </div>
                              </div>
                              <div className='form-item'>
                                   <label htmlFor="discount">Discount  <small>%</small></label>
                                   <div className="tax_discount">

                                   <input type="number" name='discount' 
                                   onChange={handleChange} 
                                   disabled={!isDiscountChange}
                                   value={newProduct.discount} 
                                   id='discount' required/>
                                   <input type="checkbox" onClick={()=>setIsDiscountChange(!isDiscountChange)} name="discount" id="checkbox" /></div>
                              </div>
                         </div>
                         <div className='form-riht-items'>
                              <div className='form-item'>
                                        <label htmlFor="stock">Product Stock</label>
                                        <input type="text" 
                                        name='stock' 
                                        onChange={handleChange} 
                                        value={newProduct.stock}
                                        id='stock' required/>
                              </div>
                              <div className='form-item'>
                                   <label htmlFor="color">Product Color</label>
                                   <input type="text" name='color' value={newProduct.color} onChange={handleChange}  id='color'/>
                                   <div className='showColors'>{
                                        newProduct.colors.map((item,index)=>{
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
                                   <select name="productsize"
                                    value={newProduct.size}  
                                    className='size-input' 
                                    onChange={hanleproductSize} id="productsize">
                                        <option value=''  disabled>Select Option</option>
                                        {productSizes.map((size,index)=>{
                                           return  (
                                             <option key={index} value={size}>{size}</option>
                                           )
                                        })}
                                   </select>
                                   <div className='showSizes showColors'>
                                        {newProduct.sizes.map((item,index)=>{
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
                                        value={newProduct.category} 
                                        className='categories-input'
                                         name="category" id="category" required >
                                             <option value="" disabled>Select Option</option>
                                             {categories  && 
                                             categories.map((item,index)=>{
                                                  const {name,category} = item;
                                                  return  <option key={index} value={category}>{name}</option>
                                             })}
                                        </select>
                              </div>
                              {/* subcategory */}
                              <div className='form-item'>
                                        <label htmlFor="subcategory">Product Sub Category</label>
                                        <select onChange={handleChange}
                                         name="subcategory" id="subcategory"
                                          value={newProduct.subcategory} 
                                          className='sub-categories-input' required >
                                             <option value="" disabled>Select Option</option>                                            
                                             {subCategories  && 
                                             subCategories.map((item,index)=>{
                                                  const {name,category} = item;
                                                  return  <option key={index} value={category}>{name}</option>
                                             })}
                                        </select>
                              </div>
                         </div>
                    </div>
                    <button type='submit' className='product-add-btn' disabled={productAdding} >Add Product</button>
               </form>
          </div>
    </div>
  )
}

export default AddProduct
