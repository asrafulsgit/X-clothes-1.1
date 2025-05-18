import React, { useEffect, useState } from 'react'
import { apiRequiest, apiRequiestWithCredentials } from '../../../../utils/ApiCall'
import { json, Link, NavLink, useParams } from 'react-router-dom'
import './successfull.css'
import axios from 'axios';
import Loading from '../../../../utils/loading/Loading';

const Successfull = () => {
  const {tranId} = useParams();
  const [paymentInfo, setPaymentInfo]=useState({})
  const [customerInfo, setCustomerInfo]=useState({})
  const [orderInfo, setOrderInfo]=useState([])
  const [pageLoading,setPageLoading]=useState(true)
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
        const data = await apiRequiestWithCredentials('get',`/payment/details/${tranId}`)
        const orderInfo = JSON.parse(data.orderDetails)
        console.log(orderInfo)
         setOrderInfo(orderInfo)
         setCustomerInfo(orderInfo.shippingAddress)
         setPaymentInfo(data.paymentDetails)
         setPageLoading(false)
      } catch (error) {
        console.log(error)
        setPageLoading(false)
      }
    }
    apiCalling()
  },[])
  const hanldeDownload = async() => {
     try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8000/generate/voucher',
        data : {paymentInfo,orderInfo} ,
        withCredentials : true,
        responseType: 'blob' 
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'order_voucher.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating voucher:', error);
      alert('Failed to generate voucher');
    }
  }

  if(pageLoading){
    return(
      < > <Loading /> </ >
    )
  }
  return (
    <>
      <div className="payment-success">
        <div className="voucher-container" id='voucher'>
          <button className='download-btn'  onClick={hanldeDownload}>Download</button>
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
          
           <div className="payment-date">
              <p>{paymentInfo.createdAt.split('T')[0]}</p>
           </div>
        </div>
      </div>
    </>
    
  )
}

export default Successfull
