import React, { useEffect, useState } from 'react'
import './AllProduct.css'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import Loading from '../../../utils/loading/Loading'
import { Link } from 'react-router-dom'
import Pagination from '../pagination/Pagination'


const Product_list = () => {
  const [allProduct,setAllProduct] = useState([])
  const [pageLoading,setPageLoading]=useState(true)
  const [searchLoading,setSearchLoading]=useState(false)
  const [page,setPage]=useState(1)
  const [limit,setLimit]=useState(5)
  const [totalPage,setTotalPage]=useState(0)
  const [filter,setFilter]= useState('')
  const [search,setSearch]=useState('')
  const getAllProducts =async(page=1,limit)=>{
    setSearchLoading(true)

    try {
      const data = await apiRequiestWithCredentials('get',`/admin/products?page=${page}&limit=${limit}`)
      setAllProduct(data.products)
      setTotalPage(data.totalPage)
    } catch (error) {
      console.log(error)
    }finally{
      setSearchLoading(false)
    }
  }
  useEffect(()=>{
    getAllProducts(page,limit)
    setPageLoading(false)
  },[])
  
  const handleDelete =async(productId)=>{
    try {
      await apiRequiestWithCredentials('delete',`/admin/delete-product/${productId}`)
      setAllProduct(allProduct.filter(product=> product._id !== productId))
    } catch (error) {
      console.log(error)
    }
  }
  let interval;
  const searchFunctionality=async(searchValue,cPage=1,limit)=>{
     
    clearTimeout(interval)
     if (!searchValue) {
      getAllProducts(page,limit)
      return;
    } 
   
    setSearchLoading(true)
      interval = setTimeout(async() => {
       console.log(limit)
      try {
        const data = await apiRequiestWithCredentials('get',`/admin/products/search?search=${searchValue}&page=${cPage}&limit=${limit}`)
          setAllProduct(data.products)
          setTotalPage(data.totalPages)
        } catch (error) {
          console.log(error)
          setAllProduct([])
        }finally{
          setSearchLoading(false)
          setSearch(searchValue)
        }
     }, 800); 
  }
  const handleSearchProduct =(e)=>{
    const searchValue = e.target.value.trim();
    searchFunctionality(searchValue,page,limit)
  }
  const [filterStatus, setFilterStatus] = useState('');
  const stockStatus = [{name : 'In stock', value : true},{name : 'Out of stock', value : false}]
   const filteringFunctionality = async(status,cPage=1,limit)=>{
    setSearchLoading(true)
    try {
      const data = await apiRequiestWithCredentials('get',`/admin/products/filter?stockStatus=${status}&page=${cPage}&limit=${limit}`)
       setAllProduct(data.products)
       setTotalPage(data.totalPages)
     } catch (error) {
       console.log(error)
       setAllProduct([])
     }finally{
       setFilter(status)
      setSearchLoading(false)
     }
   }
  const handleFilterByOrderStatus =(e)=>{
     const status = e.target.value
     filteringFunctionality(status,page,limit)
   }
   const handlePageChange =(cPage)=>{
    setPage(cPage)
    if(filter){
      filteringFunctionality(filter,cPage,limit)
    } else if(search) {
      searchFunctionality(search,cPage,limit)
    }else{
      getAllProducts(cPage,limit)
    }
   }
  const limits=[5,10,15,20]
  const handleLimitChange =(e)=>{
    if(filter) {
      filteringFunctionality(filter,page,limit)
    }else{
      getAllProducts(page,Number(e.target.value))
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
          <input name='search' onChange={handleSearchProduct} type="text" placeholder="Search Here" className="search-box" />
          <div>
            <select name="filter" className="product-filter" id="filter" 
           value={filterStatus} 
           onChange={(e) => {
             setFilterStatus(e.target.value); 
             handleFilterByOrderStatus(e);     
           }}>
              <option value='' disabled>Status</option>
              {stockStatus.map((status,index)=>{
                return(
                  <option key={index} value={status.value}>{status.name}</option>
                )
              }) }
            </select>
            <select name="limit" className="product-filter" style={{marginRight: '1rem'}} id="filter" 
           value={limit} 
           onChange={(e) => {
             setLimit(Number(e.target.value));
             handleLimitChange(e)     
           }}>
              {limits.map((limit,index)=>{
                return(
                  <option key={index} value={limit}>{limit}</option>
                )
              }) }
            </select>
            <Link to='/admin/add-product' >
            <button className="add-product-btn">+ Add Product</button>
            </Link>
           
          </div>
          
        </div>
        {searchLoading ? <div className='search-loader-spinner'>Searching...</div> : 
        allProduct.length <=0 ? <div className='search-loader-spinner'>No product found</div> : 
       <> 
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
       <Pagination currentPage={page} totalPages={totalPage} onPageChange={handlePageChange}/>
        </>
        
        }
      </div>
    </div>
  );
}

export default Product_list
