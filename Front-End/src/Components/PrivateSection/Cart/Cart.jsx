import React, { useEffect, useState } from "react";
import "./Cart.css";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState(
    localStorage.getItem("message") || "Your cart is empty!"
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiCalling = async () => {
      try {
        const data = await apiRequiestWithCredentials("get", "/get-user-carts");
        setCarts(data?.carts || []);
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

  return (
    <div className="cart-page">
      <Nav />
      <div className="cart-page-header">
        <h1>Cart</h1>
        <p>"Ready to Rock Your New Look?"</p>
      </div>
      <div className="cart-main">
        {loading && <p>loading...</p>}
        {!loading && (carts?.length <= 0 || !carts) ? (
          <p className="empty-message">{message}</p>
        ) : (
          <div className="cart-cards">
            {carts.map((item) => {
              return (
                <div key={item._id} className="cart-card">
                  <img src={item.images?.[0]} alt="" />
                  <h1 className="title">
                    {item.title.length > 30
                      ? item.title.slice(0, 25) + "..."
                      : item.title}
                  </h1>
                  <div className="quantity-div">
                    <p>Quantity : </p>
                    <p className="quantity">{item.quantity}</p>
                  </div>
                  <p className="price">BDT : {item.price}</p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="remove-cart-item-btn"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
