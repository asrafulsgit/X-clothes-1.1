import React, { useEffect, useState } from 'react'
import './orders.css'
import { apiRequiestWithCredentials } from '../../../../utils/ApiCall';
import CancelOrderModal from './CancelOrderModal';
import NoPaidOrders from './NoPaidOrders';
import Spinner from '../../../../utils/loading/Spinner';
const Orders = () => {
  const [pageLoading,setPageLoading]=useState(true)
  const [message,setMessage]=useState('')
  const [orders,setOrders]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId,setOrderId]=useState('')
  useEffect(()=>{
    const apiCalling = async()=>{
      try {
        const data = await apiRequiestWithCredentials('get','/user/orders')
        setOrders(data.orders)
        setPageLoading(false)
      } catch (error) {
        console.log(error)
        setMessage(error.response?.data.message)
        setPageLoading(false)
      }
    }
    apiCalling()
  },[]) 
  
  const handleCancellOrder =(id)=>{
    setIsModalOpen(true)
    setOrderId(id)
  }
  const deletedOrder =(orderId)=>{
    const changesOrders = orders.map((order)=>{
      if(order._id === orderId){
        order.orderStatus = 'Cancelled'
      }
      return order
    })
    setOrders(changesOrders)
    setIsModalOpen(false)
  }
  
  if(pageLoading){
    return <>
     <div className="personal-info-section-loading">
        <Spinner /> 
      </div>
    </>
  }
  return (
    <>
      {orders.length === 0 && <NoPaidOrders /> }
      {orders.length > 0 && <div className="user-order-list-container">
        <div className="order-list-header">
          <h2>Orders ({orders.length})</h2>
          <div className="sort-by">
            <span>Sort by:</span>
            <select>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        { orders.map((order) => (
          <div className="order-item" key={order._id}>
            <div className="order-details">
              <div className="order-id">
                <span>Order ID</span>
                <p>{order._id}</p>
              </div>
              <div className="total-payment">
                <span>Total Payment</span>
                <p>{order.total}</p>
              </div>
              {order.deliveryDate && (
                <div className="delivery-date">
                  <span>Estimated Delivery Date</span>
                  <p>{order.deliveryDate.split('T')[0]}</p>
                </div>
              )}
              {order.deliveryDate && (
                <div className="delivered-date">
                  <span>Delivered Date</span>
                  <p>{order.deliveryDate.split('T')[0]}</p>
                </div>
              )}
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div className="order-item-detail" key={index}>
                  <img src={item.product?.images[0]} alt={item.product?.title} className="item-image" />
                  <div className="item-info">
                    <p className="item-name">{item.product.title}</p>
                    <p className="item-details">
                      Color: {item.color} | Size: {item.size} | Qty. {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-status">
                <span className={order.orderStatus.toLowerCase()}>{order.orderStatus}</span>
                <p>Your Order has been {order.orderStatus}</p>
              </div>

              <div className="order-actions">
                {order.orderStatus.toLowerCase() === 'processing' && (
                  <>
                    <button className="track-order">Track Order</button>
                    <button className="invoice">Invoice</button>
                    <button className="cancel-order"  onClick={()=>handleCancellOrder(order._id)}>Cancel Order</button>
                  </>
                )}
                {order.orderStatus.toLowerCase() === 'delivered' && (
                  <>
                    <button className="add-review">Add Review</button>
                    <button className="invoice">Invoice</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>}
      <CancelOrderModal isOpen={isModalOpen} deletedOrder={deletedOrder} orderId={orderId}  onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Orders
