import React, { useEffect, useState } from "react";
import "./Cart.css";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import Header from "../../Products/header/Header";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState("Your cart is empty!");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiCalling = async () => {
      try {
        const data = await apiRequiestWithCredentials("get", "/get-user-carts");
        setCarts(data?.carts || []);
        console.log(data.carts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    apiCalling();
  }, []);

  const handleDelete = async (productId) => {
    setLoading(true);
    const filteredCarts = carts.filter((item) => item._id !== productId);
    setCarts(filteredCarts);
    try {
      await apiRequiestWithCredentials(
        "delete",
        `/remove-cart-item/${productId}`
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const orderSummary=[
    {name : 'Items', value : 3},
    {name : 'Sub Total', value : 4052},
    {name : 'Shipping', value : 402},
    {name : 'Taxes', value : 20},
    {name : 'Coupon Discount', value : 20}
  ]
  return (
    <div className="cart-page">
      <Nav />
      <Header parm={"/cart"} name={"Cart"} header={"Shoping Cart"} />
      <div className="cart-main">
        {loading ? (
          <p>loading...</p>
        ) : !loading && (carts?.length <= 0 || !carts) ? (
          <p className="empty-message">{message}</p>
        ) : (
          <div className="cart-body">
            <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th className="cart-price-header">Price</th>
                  <th>Quantity</th>
                  <th className="cart-subtotal-header">Subtotal</th>
                </tr>
              </thead>
              <tbody className="cart-cards">
                {carts.map((item) => {
                  return (
                    <tr key={item._id} className="cart-card">
                      <td className="remove-data">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="remove-cart-item-btn"
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </td>
                      <td className="product">
                        <img src={item.images?.[0]} alt="" />
                        <div className="product-details">
                          <h2 className="title">
                            {item.title.length > 30
                              ? item.title.slice(0, 25) + "..."
                              : item.title}
                          </h2>
                          <div>
                            <p>Color : white</p>
                            <p>Size : xl </p>
                          </div>
                        </div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <div className="cart-table-quantity">
                          <button
                            // onClick={() => setQuantity(quantity - 1)}
                            // disabled={quantity === 1}
                            className="inc-dec-btn"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            // onChange={handleQuantity}
                            // value={quantity}
                            name="quantity"
                          />
                          <button
                            // onClick={() => setQuantity(quantity + 1)}
                            className="inc-dec-btn"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td>$500</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            <div className="order-summary-table">
                <table>
                  <thead>
                    <tr>
                    <th colSpan={2}><h2>Order Summary</h2></th>
                    </tr>
                  </thead>

                  <tbody > 
                   {orderSummary.map((item,index)=>{
                    return(
                      <tr key={index}>
                          <td className="order-summary-table-name">{item.name}</td>
                          <td className="order-summary-table-value">{item.value}</td>
                      </tr>
                    )
                   })} 
                   <tr className="order-submit-row">
                       <td className="order-summary-table-name">Total</td>
                       <td className="order-summary-table-value">54230</td>
                   </tr>
                   <tr >
                     <td colSpan={2}><button className="order-submit-btn">Proceed to Checkout</button></td>
                   </tr>
                  </tbody>
           
                </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
