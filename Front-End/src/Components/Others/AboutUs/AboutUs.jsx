import React from 'react'

import './AboutUs.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

import ourVision from '../../../assets/aboutUs/ourVision.jpg'
import ourProccess from '../../../assets/aboutUs/ourproccess.jpg'
import ourApproach from '../../../assets/aboutUs/ourapproach.jpg'


const AboutUs = () => {
  return (
    <div className='about-us-page'>
      <Nav />
        <div className="about-us">
            <div className="about-us-header">
                <h1>About Us</h1>
                <p>"Fashion that Inspires, Quality that Lasts"</p>
            </div>
            <div className="about-us-main">
                   <div className="about-us-description">
                      <p>
                        Welcome to [Your Brand Name], where fashion meets comfort and style. We believe that clothing is not just about what you wear, but about how it makes you feel. Our mission is to offer a wide range of high-quality, trend-forward apparel that empowers you to express yourself and embrace your unique style.
                      </p>
                      <div className='about-us-our-promise'>
                          <h2>Our Promises:</h2>
                          <div>
                            <p>1. High-Quality Fabrics</p>
                            <p>2. Trend-Driven Designs</p>
                            <p>3. Sustainable Practices</p>
                            <p>4. Affordable Luxury</p>
                          </div>
                      </div>
                   </div>
                   <div className="about-us-our-vision">
                      <div className="our-vision-description">
                          <h2> Our Vision</h2>
                          <p>
                            At [Your Brand Name], our vision is to redefine fashion by creating clothing that is as individual as you are. We believe that style should be accessible, sustainable, and empowering—helping you feel confident and authentic in every moment.
                          </p>
                          <p>
                          We envision a world where fashion doesn’t just follow trends but sets new ones, where every piece we create reflects our commitment to quality, craftsmanship, and the environment. Our goal is to inspire self-expression, make sustainable choices the norm, and foster a community where fashion is inclusive, timeless, and responsible.
                          </p>
                          <p>
                          By blending innovation with tradition, we aim to be at the forefront of positive change in the fashion industry, creating pieces that you’ll wear with pride today and cherish for years to come.
                          </p>
                      </div>
                      <div className="about-us-our-vision-image">
                          <img src={ourVision} alt="Our Vision Image" />
                      </div>
                   </div>
                   
                   <div className="about-us-our-approach">
                      <div className="about-us-our-approach-image">
                        <img src={ourApproach} alt="Our Approach Image" />
                      </div>
                      <div className="about-us-our-approach-description">
                         <h2> Our Approach</h2>
                         <p>At [Your Brand Name], we take a thoughtful and intentional approach to fashion—one that prioritizes quality, sustainability, and individuality. Our philosophy is simple: clothing should not only look great, but also feel great and make a positive impact on the world.
                          </p>  
                         <p>
                          At [Your Brand Name], our approach is all about creating fashion that aligns with your values, reflects your personality, and lasts a lifetime. We're not just about trends—we're about building a wardrobe that you can feel proud of, inside and out.
                          </p>
                      </div>
                   </div>
                   <div className="about-us-our-proccess">
                        <div className="about-us-our-proccess-description">
                          <h2> Our Process</h2>
                         <p>
                          At [Your Brand Name], every piece of clothing we create goes through a thoughtful and carefully curated process to ensure it meets our high standards for quality, sustainability, and style. From concept to creation, we are committed to providing you with pieces that not only look great but also make a positive impact on the world.
                         </p>
                         <div>
                            <p>1. Inspiration & Design </p>
                            <p>2. Sustainable Sourcing</p>
                            <p>3. Ethical Manufacturing</p>
                            <p>4. Quality Control</p>
                            <p>5. Packaging & Delivery</p>
                         </div>
                        </div>
                        <div className="about-us-our-proccess-image">
                           <img src={ourProccess} alt="Our Proccess Image" />
                        </div>
                   </div>
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default AboutUs
