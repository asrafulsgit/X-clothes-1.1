import React, { useEffect, useState } from "react";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import Header from "../../Products/header/Header";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";
import ExtraFooter from "../../App/Footer/ExtraFooter";
import { useLocation } from "react-router-dom";
import { bangladeshUpazila, bangladeshZilas, divisions } from "../../../allProductDetails/ProductCategories";
import adress_image from '../../../assets/shpping_address.jpg'
import "./checkout.css";

const Checkout = () => {
  const location = useLocation();
  const [carts, setCarts] = useState(location.state.carts) || [];
  const [message, setMessage] = useState("");
  const [errorMessageField,setErrorMessageField]=useState('')
  const [paymentInfo,setPaymentInfo]=useState({})
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('')
  const [upazilas, setUpazilas] = useState([]);
  const [address, setAddress] = useState({});
  const [orderInfo,setOrderInfo]=useState({
    shippingAddress : {},
    carts,
    couponCode : ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(`shippingAddress.${name}` === errorMessageField){
      setMessage('')
      setErrorMessageField('')
    }
    setAddress({ ...address, [name]: value });
    setOrderInfo((prev=>({
      ...prev,
      shippingAddress : { ...address, [name]: value }
    })))
    if(name === 'zila'){
      const selectedZila = bangladeshUpazila.find(item => item.zila.toLowerCase() === value);
       setUpazilas(selectedZila.upazilas)
    }
  }; 
  useEffect(() => {
    const apiCalling =async()=>{
      try {
      const data = await apiRequiestWithCredentials('post','/payment/calculator',{carts})
        setPaymentInfo(data)
       setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    apiCalling()
  }, [carts]);
const orderSummary = [
    { name: "Items", value: location.state.totalItems },
    { name: "Sub Total", value: paymentInfo.subTotal },
    { name: "Product Discount", value: paymentInfo?.discount || 0 },
    { name: "Coupon Discount", value: paymentInfo?.couponDiscount || 0 },
    { name: "Shpping", value: paymentInfo.shippingCost},
    { name: "Taxes", value: paymentInfo.taxes }
  ];
  
  const handleCoupon =async()=>{
    if(couponCode.length <= 3){
      return;
    }
    try {
      const data = await apiRequiestWithCredentials('post','/payment/calculator/coupon',{carts,couponCode})
        setPaymentInfo(data)
        setOrderInfo((prev) => ({
          ...prev,
          couponCode: couponCode, 
      }));
        setCouponCode('')
      } catch (error) {
        console.log(error)
      }
  }
  
  const handleCheckout =async()=>{
    try {
      const data = await apiRequiestWithCredentials('post','/payment/create-order',orderInfo)
      console.log(data)
      window.location.href = data.url.GatewayPageURL
      setAddress({})
    } catch (error) { 
      console.log(error)
      setMessage(error.response?.data?.errors[0].message)
      setErrorMessageField(error.response?.data?.errors[0].field)
    }
  }
  return (
    <div className="checkout-page">
      <Nav />
      <Header param={"/checkout"} name={"checkout"} header={"Checkout"} />
      <div className="checkout-main">
        {loading ? (
          <p>loading...</p>
        ) : (
           <> 
          <div className="shipping-header">
            <img src={adress_image} alt="address" />
            <h1>Shipping Address</h1>
          </div>
          <div className="checkout-body">
            <form action="">
              <div className="input-field">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.name || ""}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Asraful Islam"
                />
                {errorMessageField === "shippingAddress.name" && (
                  <p className="message">{message}</p>
                )}
              </div>
              {/* mobile field */}
              <div className="mobile-field">
                <div className="input-field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    value={address.phone || ''}
                    required
                    name="phone"
                        onChange={handleInputChange}
                    placeholder="+8801825643258"
                  />
                  {errorMessageField === "shippingAddress.phone" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="alt_phone">Alternative Phone</label>
                  <input
                    type="number"
                    value={address.alt_phone || ''}
                    required
                    name="alt_phone"
                    onChange={handleInputChange}
                    placeholder="+880182564523"
                  />
                  {errorMessageField === "shippingAddress.alt_phone" && (
                    <p className="message">{message}</p>
                  )}
                </div>
              </div>
              {/* address field */}
              <div className="address-field">
                <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={address.email || ""}
                        onChange={handleInputChange}
                    placeholder="example@gmail.com"
                  />
                  {errorMessageField === "shippingAddress.email" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="zila">Zila</label>
                  <select
                    name="zila"
                    value={address.zila ||""}
                    required
                        onChange={handleInputChange}
                    id="zila"
                  >
                    <option value="">Select Option</option>
                    {bangladeshUpazila.map((item, index) => {
                      const {zila}=item;
                      return (
                        <option value={zila.toLowerCase()} key={index}>
                          {zila}
                        </option>
                      );
                    })}
                  </select>
                  {errorMessageField === "shippingAddress.zila" && (
                    <p className="message">{message}</p>
                  )}
                </div>
                <div className="input-field">
                  <label htmlFor="upazila">Upazila</label>
                  <select
                    name="upazila"
                    value={ address.upazila || ""}
                    required
                        onChange={handleInputChange}
                    id="upazila"
                  >
                    <option value="">Select Option</option>
                    
                    {address.zila &&
                      upazilas.map((item,index )=>{
                        return(
                          <option value={item} key={index}>{item}</option>
                        )}
                      )
                    }
                  </select>
                  {errorMessageField === "shippingAddress.upazila" && (
                    <p className="message">{message}</p>
                  )}
                </div>
              </div>
            </form>
            <div className="order-summary-table">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h3>Order Summary</h3>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orderSummary.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="order-summary-table-name">
                          {item.name}
                        </td>
                        <td className="order-summary-table-value">
                          {item.value}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="order-submit-row">
                    <td className="order-summary-table-name">Total</td>
                    <td className="order-summary-table-value">{paymentInfo.total}</td>
                  </tr>
                  <tr className="coupon-code-field">
                    <td colSpan={2}>
                      <input type="text" value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} placeholder="Coupone Code" />
                      <button onClick={handleCoupon}>Apply</button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button onClick={handleCheckout} className="order-submit-btn">
                        Proceed to Checkout
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}
      </div>
      <ExtraFooter />
      <Footer />
    </div>
  );
};

export default Checkout;
