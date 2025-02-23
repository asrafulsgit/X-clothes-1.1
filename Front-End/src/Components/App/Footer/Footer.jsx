import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="logo">
            <span className="logo-x">X</span>
            <span className="logo-text">Clothes.</span>
          </div>
          <p className="footer-description">
            Discover stylish and comfortable clothing for every occasion. Our
            collection blends quality, fashion, and affordability to elevate
            your wardrobe.
          </p>
          <div className="social-media">
            <button className="socialMedia-btn">
              <i className="fa-brands fa-facebook"></i>
            </button>
            <button className="socialMedia-btn">
              <i className="fa-brands fa-youtube"></i>
            </button>
            <button className="socialMedia-btn">
              <i className="fa-brands fa-x-twitter"></i>
            </button>
            <button className="socialMedia-btn">
              <i className="fa-brands fa-instagram"></i>
            </button>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>Career</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Services</h4>
            <ul>
              <li>My Account</li>
              <li>Track Your Order</li>
              <li>Return</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Our Information</h4>
            <ul>
              <li>Privacy</li>
              <li>User Terms & Condition</li>
              <li>Return Policy</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul>
              <li>+0123-456-789</li>
              <li>example@gmail.com</li>
              <li>8502 Preston Rd. Inglewood, Maine 98380</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2024 Xclothes . All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
