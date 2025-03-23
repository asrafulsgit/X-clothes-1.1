import React from 'react'
import './cencel.css'
import { Link } from 'react-router-dom'
const Cencel = () => {
  return (
    <div>
      <div className="payment-cancel-container">
      <div className="payment-cancel-card">
        <h1 className="payment-cancel-header">Payment Canceled</h1>
        <p className="payment-cancel-message">
          We are sorry, but your payment was canceled. Please try again or contact our support team for assistance.
        </p>
        
        <div className="payment-details">
          <p className="transaction-id">Transaction ID: <span className="transaction-id-value">***</span></p>
          <p className="amount">Amount: <span className="amount-value">***</span></p>
        </div>

        <div className="button-container">
                  <button
                    className="retry-btn"
                  >
                    <Link to='/cart'>Retry Payment</Link>
                  </button>
                  <button
                    className="contact-btn"
                    onClick={() => alert("Contact Support")}
                  >
                    Contact Support
                  </button>
                </div>
      </div>
    </div>
    </div>
  )
}

export default Cencel
