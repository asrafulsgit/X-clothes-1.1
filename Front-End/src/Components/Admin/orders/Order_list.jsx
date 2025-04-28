import React, { useEffect, useState } from 'react'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import './order_list.css'
import Order_details from './Order_details'
import Loading from '../../../utils/loading/Loading'
const Order_list = () => {
  const [pageLoading,setPageLoading]= useState(true)
  const [searchLoading,setSearchLoading]= useState(false)
  const [orders,setOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const status = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
  const getAllOrders =async()=>{
    try {
      const data = await apiRequiestWithCredentials('get',`/admin/orders`)
      setOrders(data.orders)
      setPageLoading(false)
    } catch (error) {
         console.log(error)
         setOrders([])
         setPageLoading(false)
    }
  }
  useEffect(()=>{
    getAllOrders()
  },[])

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
   const handleSearchOrder =(e)=>{
     const searchValue = e.target.value.trim();
      clearTimeout(interval)
      if (!searchValue) {
        console.log(searchValue)
        getAllOrders()
       return;
     } 
     setSearchLoading(true)
       interval = setTimeout(async() => {
        
       try {
         const data = await apiRequiestWithCredentials('get',`/admin/orders/search?search=${searchValue}`)
           setOrders(data.orders)
         } catch (error) {
           console.log(error)
           setOrders([])
         }finally{
           setSearchLoading(false)
         }
      }, 800); 
   }
 const orderStatus = [
  'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'
 ]
 const [orderStatushandle, setOrderStatushandle] = useState('');
 const handleFilterByOrderStatus =async(e)=>{
  setPageLoading(true)
   try {
    const data = await apiRequiestWithCredentials('get',`/admin/orders/filter?orderStatus=${e.target.value}`)
     setOrders(data.orders)
     setPageLoading(false)
   } catch (error) {
     console.log(error)
     setOrders([])
     setPageLoading(false)
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
          {searchLoading ? <div className='search-loader-spinner'>Searching...</div> : orders.length <= 0 ? <p>no Orders found</p> : <table>
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
          </table>}
        </div>
      </div>
      <Order_details isOpen={isModalOpen} orderId={orderId}  onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Order_list
