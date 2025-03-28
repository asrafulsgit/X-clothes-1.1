import React, { useEffect, useState } from 'react'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall';
import './order_details.css'
const Order_details = ({orderId, isOpen, onClose}) => {
  if (!isOpen) return null;
  const [pageLoading,setPageLoading]=useState(true)
  const [order,setOrder]=useState(true)

  useEffect(()=>{
     const apiCalling =async()=>{
                    try {
                      const data = await apiRequiestWithCredentials('get',`/admin/order/${orderId}`)
                      console.log(data)
                      setOrder(data.order)
                      setPageLoading(false)
                    } catch (error) {
                         console.log(error)
                         setPageLoading(false)
                    }
                  }
                  apiCalling()
  },[orderId])

  if(pageLoading){
    return ( <h1>loading...</h1> )
  }
  return (
    <div className="order-details-modal" onClick={onClose}>
      <div className="modal-content modal-animate" onClick={(e) => e.stopPropagation()}>
      
       <div className="order-details-container" id='order-details'>
          <p className="order-details-subtitle">Order Details</p>
          
          <div className="order-details-section">
            <div className="order-details-column">
              <h3>Customer Details:</h3>
              <p><strong>Name:</strong> {order.shippingAddress.name}</p>
              <p><strong>Address:</strong> {order.shippingAddress.zila}, {order.shippingAddress.upazila}</p>
              <p><strong>Email:</strong> {order.shippingAddress?.email}</p>
              <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
            </div>
            <div className="order-details-column">
              <h3>Status:</h3>
              <p><strong>Payment Status:</strong> {order.paymentDetails.status} </p>
              <p><strong>Tran. ID:</strong> {order.paymentDetails?.tran_id} </p>
              <p><strong>Order ID:</strong> {order._id} </p>
              <p><strong>Order Status:</strong> {order.orderStatus} </p>
              <p><strong>Delivery Date:</strong> {order.deliveryDate.split('T')[0]} </p>
            </div>
          </div>
          
          <h3 className="order-details-items-title">Details</h3>
          <table className="order-details-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Product ID</th>
                <th>Color</th>
                <th>size</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item,index)=>{
                const {product,quantity,size,color}=item;
                return(
                  <tr key={index}>
                    <td>{index < 10 ? `0${index + 1}` : index + 1}</td>
                    <td>{product}</td>
                    <td>{color}</td>
                    <td>{size}</td>
                    <td>{quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          <div className="order-details-summary">
            <table className="order-details-table">
              <thead><tr><th style={{textAlign : 'center'}} colSpan={6}>Summary</th></tr></thead>
              <tbody>

                    <tr >
                      <td><strong>Subtotal</strong></td>
                      <td>{order.subTotal}</td>
                    </tr>
                    <tr >
                      <td><strong>Tax </strong></td>
                      <td>{order.taxes}</td>
                    </tr>
                    <tr >
                      <td><strong>Coupon Discount</strong></td>
                      <td>{order.couponDiscount}</td>
                    </tr>
                    <tr >
                      <td><strong>Discount</strong></td>
                      <td>{order.discount}</td>
                    </tr>
                    <tr >
                      <td><strong>Shipping Cost</strong></td>
                      <td>{order.shippingCost}</td>
                    </tr>
                    <tr >
                      <td><strong>Total</strong></td>
                      <td>{order.total}</td>
                    </tr>
              </tbody>
            </table>
          </div>
           <div className="order-date">
              <p>{order.createdAt.split('T')[0]}</p>
           </div>
        </div>



        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Order_details
