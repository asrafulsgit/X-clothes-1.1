import React, { useEffect, useState } from 'react'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import './order_list.css'
import Order_details from './Order_details'
import Loading from '../../../utils/loading/Loading'
const Order_list = () => {
  const [pageLoading,setPageLoading]= useState(true)
  const [orders,setOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const status = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']
  useEffect(()=>{
           const apiCalling =async()=>{
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
              apiCalling()
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
 const orderStatus = [
  'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'
 ]
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
            <input type="text" placeholder="Search Here" className="search-box" />
            <select name="filter" id="filter" onChange={(e)=>handleFilterByOrderStatus(e)}>
              <option selected disabled>Status</option>
              {orderStatus.map((status,index)=>{
                return(
                  <option key={index} value={status}>{status}</option>
                )
              }) }
            </select>
          </div>
          {orders.length <= 0 ? <p>no Orders found</p> : <table>
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
                    <button onClick={()=>handleOrderDetails(_id)}>click</button>
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
