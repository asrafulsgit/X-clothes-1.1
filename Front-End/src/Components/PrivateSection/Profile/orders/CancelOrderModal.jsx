import { useState } from "react";
import "./Modal.css"; 
import { apiRequiestWithCredentials } from "../../../../utils/ApiCall";

const CancelOrderModal = ({orderId, isOpen, onClose,deletedOrder }) => {
  if (!isOpen) return null;
     const handleCancelOrder = async(orderId)=>{
          try {
           const data =  await apiRequiestWithCredentials('delete',`/order/cancel/${orderId}`)
           deletedOrder(orderId)
           onclose
           console.log(data)
          } catch (error) {
               console.log(error)
          }
     }
  return (
    <div className="order-cancell-modal" onClick={onClose}>
      <div className="modal-content modal-animate" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Cancel Order</h2>
        <p className="modal-text">Are you sure you want to cancel this order?</p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>No, Keep It</button>
          <button className="btn-confirm" onClick={()=>handleCancelOrder(orderId)}>Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;