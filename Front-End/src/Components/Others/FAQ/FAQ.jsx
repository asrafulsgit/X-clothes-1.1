import React from 'react'
import './FAQ.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

const FAQ = () => {
  return (
    <div className='faq-page'>
      <Nav />
          <div className="faq">
               <div className="faq-header">
                    <h1>Frequently Asked Questions (FAQ)</h1>
               </div>
               <div className="faq-main">
                    <div>
                         <h2>1. What types of clothing do you sell?</h2>
                         <p>We offer a wide range of clothing for men, women, and children, including casual wear, activewear, formal attire, outerwear, and accessories. We also have seasonal collections to keep you stylish year-round.</p>
                    </div>
                    <div>
                         <h2>2. How do I place an order?</h2>
                         <p>To place an order, simply browse our website, select the items you wish to purchase, and add them to your shopping cart. When you’re ready, proceed to checkout where you’ll enter your shipping details and payment information. Once your order is confirmed, we’ll send you an email with your order details.</p>
                    </div>
                    <div>
                         <h2>3. Can I change or cancel my order after it has been placed?</h2>
                         <p>Unfortunately, once an order is placed, we are unable to modify or cancel it. However, you may return or exchange items once they arrive, as long as they meet our return policy criteria. Please refer to our Return & Exchange Policy for more details.</p>
                    </div>
                    <div>
                         <h2>4. What payment methods do you accept?</h2>
                         <p>We accept a variety of payment methods, including major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options. All transactions are processed securely.</p>
                    </div>
                    <div>
                         <h2>5. Is it safe to shop on your website?</h2>
                         <p>Yes! We use the latest encryption technology to ensure that your personal and payment information is kept secure. We are committed to providing a safe and secure shopping experience.</p>
                    </div>
                    <div>
                         <h2>6. How can I track my order?</h2>
                         <p>Once your order is shipped, you will receive a tracking number via email. You can use this tracking number on our website or the courier’s website to track your order’s status.</p>
                    </div>
                    <div>
                         <h2>7. Do you offer international shipping?</h2>
                         <p>Yes, we offer international shipping to select countries. Shipping fees and delivery times vary depending on the destination. You can check the available shipping options during the checkout process.</p>
                    </div>
                    <div>
                         <h2>8. What is your return/exchange policy?</h2>
                         <p>We offer a hassle-free return/exchange policy. If you are not satisfied with your purchase, you can return or exchange your items within [X] days from the date of receipt. Items must be unused, unwashed, and in their original packaging. Please refer to our Return & Exchange Policy for detailed instructions.</p>
                    </div>
                    <div>
                         <h2>9. How do I know my size?</h2>
                         <p>We have a detailed size guide available on each product page to help you find the perfect fit. If you're unsure, feel free to reach out to our customer service team for advice or assistance.</p>
                    </div>
                    <div>
                         <h2>10. Do you offer gift cards?</h2>
                         <p>Yes, we offer gift cards that can be used for purchases on our website. </p>
                    </div>
                    <div>
                         <h2>11. How can I contact customer service?</h2>
                         <p>If you have any questions or need assistance, you can contact our customer service team by email at [your email address] or through our contact page. We strive to respond to all inquiries within 24-48 hours. </p>
                    </div>
               </div>
          </div>
     <Footer />
    </div>
  )
}

export default FAQ
