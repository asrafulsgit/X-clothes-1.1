import React from 'react'
import './TermsCondition.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

const TermsCondition = () => {
  return (
    <div className='term-and-condition-page'>
      <Nav />
          <div className="terms-and-conditons">
               <div className="terms-and-conditons-header">
                    <h1>Terms and Conditions</h1>
               </div>
               <div className="terms-and-conditions-main">
                    <div>
                         <p>Welcome to [Your Company Name]! These Terms and Conditions ("Terms") govern the use of our website, [Website URL], and the purchase of products from our online store. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, you must refrain from using our website.</p>
                    </div>
                    <div>
                         <p>[Your Company Name] is a business registered in [Your Country]. Our contact details are as follows:</p>
                         <ol>
                              <li>Email: [Email Address]</li>
                              <li>Phone: [Phone Number]</li>
                              <li>Address: [Business Address]</li>
                         </ol>
                    </div>
                    <div>
                         <h2>2. Products and Availability</h2>
                         <p>We strive to display products as accurately as possible. However, we do not guarantee that all product descriptions, prices, or images are always up-to-date or free from error. Availability of products is subject to change, and we reserve the right to limit quantities or discontinue items.</p>
                    </div>
                    <div>
                         <h2>3. Order Process</h2>
                         <ol>
                              <li>Placing an Order: After selecting your items, follow the checkout process to submit an order. An order confirmation email will be sent to you once the order is successfully placed.</li>
                              <li>Payment: Payment must be made in full at the time of placing the order. We accept the following payment methods: [list of payment methods].</li>
                              <li>Shipping: Shipping fees and delivery times vary depending on your location. Estimated delivery times will be provided at checkout. We are not responsible for delays caused by external factors such as weather, customs, or carrier issues.</li>
                         </ol>
                    </div>
                    <div>
                         <h2>4. Pricing and Payment</h2>
                         <ol>
                              <li>All prices listed are in [Currency] and may be subject to taxes and shipping fees. Taxes and shipping fees will be calculated at checkout.</li>
                              <li>We reserve the right to change prices without prior notice.</li>
                              <li>If a product is listed at an incorrect price due to a technical error, we reserve the right to cancel or modify the order.</li>
                         </ol>
                    </div>
                    <div>
                         <h2>5. Account Registration</h2>
                         <p>To make purchases, you may be asked to create an account. By registering, you agree to provide accurate and complete information and to keep your account details secure. You are responsible for all activities conducted under your account.</p>
                    </div>
                    <div>
                         <h2>6. Governing Law</h2>
                         <p>These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country]. Any disputes arising from or related to these Terms shall be resolved in the courts of [Your Country].</p>
                    </div>
     
               </div>
               <div className="terms-and-conditions-footer">
                    <p>By using this website, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</p>
               </div>
          </div>
     <Footer />
    </div>
  )
}

export default TermsCondition
