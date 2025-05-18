import React from 'react'
import './failed.css'
import { Link } from 'react-router-dom'
const Failed = () => {
  return (
     <div className="payment-failed-container">
      <div className="payment-failed-box">
        <div className="icon">
               <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <h2 className="payment-failed-heading">Payment Failed</h2>
        <p className="payment-failed-message">
          Unfortunately, your payment could not be processed. Please try again
          or contact our support team.
        </p>
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
  )
}

export default Failed
