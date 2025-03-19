import React, { useEffect, useState } from 'react'
import { apiRequiest } from '../../../../utils/ApiCall'
import { Link, NavLink, useParams } from 'react-router-dom'
import './successfull.css'
const Successfull = () => {
  const {tranId} = useParams();
  const [paymentInfo, setPaymentInfo]=useState({})
  const [customerInfo, setCustomerInfo]=useState({})
  const [pageLoading,setPageLoading]=useState(true)
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
        const data = await apiRequiest('get',`/payment/details/${tranId}`)
        // console.log(data)
         setPaymentInfo(data.paymentDetails)
         setCustomerInfo(data.customerInfo)
         setPageLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    apiCalling()
  },[])
  if(pageLoading){
    return(
      <h1>Loading...</h1>
    )
  }
  return (
    <>
      <div className="payment-success">
      <nav className='nav'>
        <NavLink to='/' className='nav-logo'><h1 className='logo'><span>X</span> Clothes</h1></NavLink>   
        <div className="back-to-home"> <Link to='/'><button >Home</button></Link> </div>
      </nav>
      {!pageLoading && 
      <div className="voucher-container">
        <h2 className="voucher-title">Disbursement Voucher</h2>
        <p className="voucher-subtitle">X CLOTHE</p>
        
        <div className="voucher-section">
          <div className="voucher-column">
            <h3>Bill To:</h3>
            <p><strong>Name:</strong> {customerInfo.shippingAddress.name}</p>
            <p><strong>Address:</strong> {customerInfo.shippingAddress.zila}, {customerInfo.shippingAddress.upazila}</p>
            <p><strong>Email:</strong> {customerInfo.shippingAddress.email ? customerInfo.shippingAddress.email : ""}</p>
            <p><strong>Phone:</strong> {customerInfo.shippingAddress.phone}</p>
          </div>
          <div className="voucher-column">
            <h3>Payment Method:</h3>
            <p><strong>Payment Type:</strong> {paymentInfo.payment_type}</p>
            <p><strong>Tran. ID:</strong> {paymentInfo.tran_id}</p>
            <p><strong>Status:</strong> {paymentInfo.status}</p>
            <p><strong>Order ID:</strong> {customerInfo._id}</p>
            <p><strong>Date:</strong> {paymentInfo.createdAt.split('T')[0]}</p>
          </div>
        </div>
        
        <h3 className="voucher-items-title">Items</h3>
        <table className="voucher-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item 1</td>
              <td>Widget A - Basic Model</td>
              <td>2</td>
              <td>$50.00</td>
              <td>$100.00</td>
            </tr>
            <tr>
              <td>Item 2</td>
              <td>Widget B - Premium Model</td>
              <td>1</td>
              <td>$75.00</td>
              <td>$75.00</td>
            </tr>
            <tr>
              <td>Item 3</td>
              <td>Widget C - Compact Version</td>
              <td>3</td>
              <td>$20.00</td>
              <td>$60.00</td>
            </tr>
          </tbody>
        </table>
        
        <div className="voucher-summary">
          <h3>Summary</h3>
          <p><strong>Subtotal:</strong> $235.00</p>
          <p><strong>Tax (10%):</strong> $23.50</p>
          <p><strong>Total:</strong> $258.50</p>
        </div>
      </div>
      }
      </div>
    </>
    
  )
}

export default Successfull
