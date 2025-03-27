import React from "react";
import "./NoOrders.css"; 

const NoPaidOrders = ({ onShopClick }) => {
  return (
    <div className="no-orders-container">
      <img src='https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6665.jpg?w=740' alt="No Orders" className="no-orders-image" />
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
