import React from 'react'
import './PrivacyPolicy.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

const PrivacyPolicy = () => {
  return (
    <div className='privacy-policy-page'>
      <Nav />
          <div className="privacy-policy">
               <div className="privacy-policy-header">
                    <h1>Privacy and Policy</h1>
               </div>
               <div className="privacy-policy-main">
                    <div>
                         <p>At [Your Company Name], we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website [Website URL] or make a purchase from our online store. By accessing or using our website, you agree to the terms outlined in this Privacy Policy.</p>
                    </div>
                    <div>
                         <h2>1. Information We Collect</h2>
                         <p>We collect several types of information in connection with your use of our website, including:</p>
                         <h2>1.1 Personal Information</h2>
                         <ol>
                              <li>When you make a purchase: Name, email address, shipping address, phone number, payment information (credit card or other payment method details).</li>
                              <li>When you create an account: Username, password, and other details you provide when you register for an account on our website.</li>
                              <li>When you create an account: Username, password, and other details you provide when you register for an account on our website.</li>
                         </ol>
                         <h2>1.2 Non-Personal Information</h2>
                         <ol>
                              <li>Usage Data: We collect data about how you interact with our website, such as your IP address, browser type, device type, pages viewed, and time spent on the site.</li>
                              <li>Cookies and Tracking Technologies: We use cookies to track usage patterns on our website and improve your browsing experience. For more information, see our section on Cookies below.</li>
                         </ol>
                    </div>
                    <div>
                         <h2>2. How We Use Your Information</h2>
                         <ol>
                              <li>To process and fulfill your orders</li>
                              <li>To communicate with you about your orders, promotions, and offers</li>
                              <li>To improve our website and services</li>
                              <li>To send promotional emails and newsletters (with your consent)</li>
                              <li>To prevent fraudulent transactions and ensure the security of our website</li>
                         </ol>
                    </div>
                    <div>
                         <h2>3. Cookies and Tracking Technologies</h2>
                         <p>We use cookies to enhance your user experience, analyze website traffic, and understand your preferences. Cookies are small files placed on your device. You can modify your browser settings to refuse cookies, but this may affect your experience on our website.</p>
                    </div>
                    <div>
                         <h2>4. Third-Party Services</h2>
                         <p>We may share your personal data with third-party service providers for specific purposes, including:</p>
                         <ol>
                              <li>Payment Processors: To complete transactions</li>
                              <li>Shipping Partners: To fulfill orders and deliver products</li>
                              <li>Analytics Providers: To help us understand how users interact with our website</li>
                              <li>Advertising Partners: To show you relevant ads based on your interests</li>
                         </ol>
                    </div>
                    <div>
                         <h2>5. Security</h2>
                         <p>We implement various security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of data transmission over the internet is 100% secure, and we cannot guarantee the security of your data.</p>
                    </div>
                    <div>
                         <h2>6. Changes to This Privacy Policy</h2>
                         <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date. Please review this Privacy Policy periodically for any updates.</p>
                    </div>
               </div>
          </div>
     <Footer />
    </div>
  )
}

export default PrivacyPolicy
