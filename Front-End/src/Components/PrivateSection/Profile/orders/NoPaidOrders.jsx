import React from "react";
import "./NoOrders.css"; 

const NoPaidOrders = ({ onShopClick }) => {
  return (
    <div className="no-orders-container">
      <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#007bff" strokeWidth="2" fill="none"/>
        <path d="M8 12h8m-4 4V8" stroke="#007bff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {/* <img src={noOrdersImage} alt="No Orders" className="no-orders-image" /> */}
      <h2 className="no-orders-title">No Paid Orders Found</h2>
      <p className="no-orders-text">
        Looks like you haven't placed any paid orders yet. Start shopping now!
      </p>
      <button className="no-orders-button" onClick={onShopClick}>
        Continue Shopping
      </button>
    </div>
  );
};

export default NoPaidOrders;
