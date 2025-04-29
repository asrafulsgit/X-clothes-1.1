import React, { useEffect, useState } from 'react'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import './order_list.css'
import Order_details from './Order_details'
import Loading from '../../../utils/loading/Loading'
import Pagination from '../pagination/Pagination'
const Order_list = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageLoading,setPageLoading]= useState(true)
  const [searchLoading,setSearchLoading]= useState(false)
  const [orders,setOrders] = useState([])
  const [orderId, setOrderId] = useState('');
  const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(5)
    const [totalPage,setTotalPage]=useState(0)
    const [filter,setFilter]= useState('')
    const [search,setSearch]=useState('')
  const getAllOrders =async(page=1,limit)=>{
    setSearchLoading(true)
    try {
      const data = await apiRequiestWithCredentials('get',`/admin/orders?page=${page}&limit=${limit}`)
      setOrders(data.orders)
      setTotalPage(data.totalPage)
    } catch (error) {
         console.log(error)
         setOrders([])
    }finally{
      setSearchLoading(false)
    }
  }
  useEffect(()=>{
    getAllOrders(page,limit)
    setPageLoading(false)
  },[])
  const status = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
 const handleStatus =async(e,orderId)=>{
  const status = e.target.value;
  try {
    await apiRequiestWithCredentials('put',`/admin/order/${orderId}?status=${status}`)
    const updateOrders = orders.map((order)=>{
      if(order._id === orderId){
        return {...order,orderStatus : status}
      }
      return order;
    })
    setOrders(updateOrders)
  } catch (error) {
    console.log(error)
  }

 }
 const handleOrderDetails =(orderId)=>{
   setOrderId(orderId)
   setIsModalOpen(true)
 }

 let interval;
   const searchFunctionality=async(searchValue,cPage=1,limit)=>{ 
     clearTimeout(interval)
     if (!searchValue) {
      console.log('reset')
       getAllOrders(page,limit)
      return;
    } 
     setSearchLoading(true)

       interval = setTimeout(async() => {
        
       try {
         const data = await apiRequiestWithCredentials('get',`/admin/orders/search?search=${searchValue}&page=${cPage}&limit=${limit}`)
           setOrders(data.orders)
           setTotalPage(data.totalPage)
         } catch (error) {
           console.log(error)
           setOrders([])
         }finally{
           setSearchLoading(false)
           setSearch(searchValue)
         }
      }, 800); 
   }

   const handleSearchOrder =(e)=>{
     const searchValue = e.target.value.trim();
     searchFunctionality(searchValue,page,limit)
   }
 const orderStatus = [
  'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'
 ]
 const [orderStatushandle, setOrderStatushandle] = useState('');

 const filteringFunctionality = async(status,cPage=1,limit)=>{
     setSearchLoading(true)
     try {
       const data = await apiRequiestWithCredentials('get',`/admin/orders/filter?orderStatus=${status}&page=${cPage}&limit=${limit}`)
       setOrders(data.orders)
        setTotalPage(data.totalPage)
      } catch (error) {
        console.log(error)
        setOrders([])
      }finally{
        setFilter(status)
       setSearchLoading(false)
      }
    }

 const handleFilterByOrderStatus =async(e)=>{
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
    getAllOrders(cPage,limit)
  }
 }
const limits=[5,10,15,20]
const handleLimitChange =(e)=>{
  if(filter) {
    filteringFunctionality(filter,page,Number(e.target.value))
  }else{
    getAllOrders(page,Number(e.target.value))
  }
  
}


 if(pageLoading){
  return(
       <>
       <Loading />
       </>
  )
 }
  return (
    <>
      <div className='order-list-page'>
        <div className="order-list">
          <div className="page-title"><h1>Order List</h1></div>
          <div className="header">
            <input type="text"  name='search' 
            onChange={handleSearchOrder}  placeholder="Search Here" className="search-box" />
            <div>
            <select name="limit" className="order-filter" style={{marginRight: '1rem'}} id="filter" 
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
            <select className="orders-filter" name="filter" id="filter" 
            value={orderStatushandle}
            onChange={(e)=>{
              setOrderStatushandle(e.target.value)
              handleFilterByOrderStatus(e)}}>
              <option  value=''  disabled>Status</option>
              {orderStatus.map((status,index)=>{
                return(
                  <option key={index} value={status}>{status}</option>
                )
              }) }
            </select>
            </div>
          </div>
          {searchLoading ? <div className='search-loader-spinner'>Searching...</div> : 
          orders.length <= 0 ? <div className='search-loader-spinner'>No Order found</div> : 
          <>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>C. Name</th>
                <th>C. Phone</th>
                <th>Items</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order,index) =>{ 
                const {_id,shippingAddress,createdAt,orderStatus,items}=order;
                return(
                  <tr key={index}>
                  <td>{_id}</td>
                  <td>{shippingAddress.name}</td>
                  <td>{shippingAddress.phone}</td>
                  <td>{items.length < 10 ? `0${items.length}` : items.length}</td>
                  <td>{createdAt.split('T')[0]}</td>
                  <td>{orderStatus}</td>
                  <td>
                    <select name="status" id="status" onChange={(e)=>handleStatus(e,_id)}>
                      {status.map((item,index)=>{
                        return(
                          <option key={index} value={item}>{item}</option>
                        )
                      })}
                    </select>
                    <button className='order-details-btn' onClick={()=>handleOrderDetails(_id)}><i className="fa-solid fa-circle-info"></i></button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination currentPage={page} totalPages={totalPage} onPageChange={handlePageChange}/>
          </>}
        </div>
      </div>
      <Order_details isOpen={isModalOpen} orderId={orderId}  onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Order_list
