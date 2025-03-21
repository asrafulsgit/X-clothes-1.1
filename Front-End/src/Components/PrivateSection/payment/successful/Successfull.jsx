import React, { useEffect, useState } from 'react'
import { apiRequiest } from '../../../../utils/ApiCall'
import { Link, NavLink, useParams } from 'react-router-dom'
import './successfull.css'
import axios from 'axios';

const Successfull = () => {
  const {tranId} = useParams();
  const [paymentInfo, setPaymentInfo]=useState({})
  const [customerInfo, setCustomerInfo]=useState({})
  const [orderInfo, setOrderInfo]=useState([])
  const [pageLoading,setPageLoading]=useState(true)
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
        const data = await apiRequiest('get',`/payment/details/${tranId}`)
        // console.log(data)
        const orderInfo = JSON.parse(data.orderDetails)
        console.log(orderInfo)
        setOrderInfo(orderInfo)
         setCustomerInfo(orderInfo.shippingAddress)
         setPaymentInfo(data.paymentDetails)
         setPageLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    apiCalling()
  },[])
  const hanldeDownload = async() => {
    try {
      const response = await axios.post("http://localhost:8000/generate/voucher", {
        customerInfo,
        orderInfo,
        paymentInfo,
      }, {
        headers: { "Content-Type": "application/json" },
        responseType: 'blob', 
      });
  
      // Create a URL for the PDF blob and open it in a new window
      const url = window.URL.createObjectURL(response.data);
      window.open(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  }



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
        <div className="voucher-container" id='voucher'>
          <h2 className="voucher-title">Disbursement Voucher</h2>
          <p className="voucher-subtitle">X CLOTHE</p>
          
          <div className="voucher-section">
            <div className="voucher-column">
              <h3>Bill To:</h3>
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Address:</strong> {customerInfo.zila}, {customerInfo.upazila}</p>
              <p><strong>Email:</strong> {customerInfo.email ? customerInfo.email : ""}</p>
              <p><strong>Phone:</strong> {customerInfo.phone}</p>
            </div>
            <div className="voucher-column">
              <h3>Payment Method:</h3>
              <p><strong>Payment Type:</strong> {paymentInfo.payment_type}</p>
              <p><strong>Tran. ID:</strong> {paymentInfo.tran_id}</p>
              <p><strong>Order ID:</strong> {paymentInfo.order_id}</p>
              <p><strong>Status:</strong> {paymentInfo.status}</p>
            </div>
          </div>
          
          <h3 className="voucher-items-title">Details</h3>
          <table className="voucher-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo.items.map((item,index)=>{
                const {product,quantity}=item;
                return(
                  <tr key={index}>
                    <td>{index < 10 ? `0${index + 1}` : index + 1}</td>
                    <td>{product.title}</td>
                    <td>{quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.price * quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          <div className="voucher-summary">
            <table className="voucher-table">
              <thead><tr><th style={{textAlign : 'center'}} colSpan={6}>Summary</th></tr></thead>
              <tbody>

                    <tr >
                      <td><strong>Subtotal</strong></td>
                      <td>{orderInfo.subTotal}</td>
                    </tr>
                    <tr >
                      <td><strong>Tax </strong></td>
                      <td>{orderInfo.taxes}</td>
                    </tr>
                    <tr >
                      <td><strong>Coupon Discount</strong></td>
                      <td>{orderInfo.couponDiscount}</td>
                    </tr>
                    <tr >
                      <td><strong>Discount</strong></td>
                      <td>{orderInfo.discount}</td>
                    </tr>
                    <tr >
                      <td><strong>Shipping Cost</strong></td>
                      <td>{orderInfo.shippingCost}</td>
                    </tr>
                    <tr >
                      <td><strong>Total</strong></td>
                      <td>{orderInfo.total}</td>
                    </tr>
              </tbody>
            </table>
          </div>
          <button onClick={hanldeDownload}>Download</button>
           <div className="payment-date">
              <p>{paymentInfo.createdAt.split('T')[0]}</p>
           </div>
        </div>
      }
      </div>
    </>
    
  )
}

export default Successfull
