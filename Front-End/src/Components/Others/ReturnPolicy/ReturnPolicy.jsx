import React from 'react'

import './ReturnPolicy.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

const ReturnPolicy = () => {
  return (
    <div className='return-policy-page'>
     <Nav />
          <div className="return-policy">
               <div className="return-policy-header">
                    <h1>Return PoLicy</h1>
                    <p>"Easy Returns, Hassle-Free Shopping"</p>
               </div>
               <div className="return-policy-main">
                    <div>
                         <p>At [Your Brand Name], we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a hassle-free return process. Here’s everything you need to know:</p>
                    </div>
                    <div>
                         <h2>1. Eligibility for Returns:</h2>
                         <p>
                              You can return items within 30 days of receiving your order. To be eligible for a return, the following conditions must be met:
                              The item must be unused, unworn, and in its original condition.
                              All original tags, labels, and packaging must be intact.
                              The item must not be on the non-returnable list (such as final sale, intimates, or swimwear).
                         </p>
                    </div>
                    <div>
                         <h2>2. How to Make a Return:</h2>
                         <p> To start the return process, please follow these steps:

                              Contact Us: Reach out to our customer service team at [email or phone number] to initiate the return. Include your order number and the item(s) you wish to return.
                              Return Authorization: Once your return is approved, you’ll receive a Return Authorization (RA) number and detailed instructions on how to send back your item(s).
                              Package Your Return: Securely pack the items in the original packaging (if possible) and include the RA number with your return.
                              Ship Your Return: Use the provided return label to send the item(s) back. Please note that return shipping costs are the customer’s responsibility unless the item was defective or incorrect.
                         </p>
                    </div>
                    <div>
                         <h2>3. Refunds and Exchanges:</h2>
                         <p>Once we receive and inspect your return, we will process your refund or exchange:
                         Refunds: If you are eligible for a refund, it will be issued to the original form of payment within 5-7 business days.
                         Exchanges: If you prefer an exchange, we will send out your new item once we receive the returned product. Please be aware that exchanges are subject to stock availability.
                         </p>                   
                    </div>
                    <div>
                         <h2>4. Defective or Incorrect Items:</h2>
                         <p>If you received a defective or incorrect item, we apologize for the inconvenience. Please contact us immediately, and we’ll arrange for a return at no extra cost to you. You will receive a full refund or replacement, depending on your preference.
                         </p>
                    </div>
                    <div>
                         <h2> 5. Final Sale Items:</h2>
                         <p> Some items, such as sale, discounted, and personalized items, may be non-returnable. Please check the product page for specific details before completing your purchase.
                         </p>
                    </div>
                    <div>
                         <h2> 6. International Returns:</h2>
                         <p>
                              For international orders, the return process is the same, but return shipping costs are the responsibility of the customer. Additionally, please note that customs duties and taxes paid on international shipments are non-refundable.
                         </p>
                    </div>
               </div>
               <div className="return-policy-footer">
                    <p>If you have any further questions or concerns about our return policy, please don’t hesitate to contact our customer service team. We are here to help and ensure that your shopping experience with us is a positive one!</p>
               </div>
          </div>
     <Footer />
    </div>
  )
}

export default ReturnPolicy
