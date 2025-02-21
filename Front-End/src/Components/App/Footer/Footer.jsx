import React from 'react'

import { Link } from 'react-router-dom'
import './Footer.css'
import ExtraFooter from './ExtraFooter'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="social-media">
          <button className='socialMedia-btn'><i className="fa-brands fa-facebook"></i></button>
          <button className='socialMedia-btn'><i className="fa-brands fa-youtube"></i></button>
          <button className='socialMedia-btn'><i className="fa-brands fa-x-twitter"></i></button>
          <button className='socialMedia-btn'><i className="fa-brands fa-instagram"></i></button>
        </div>
        <div className="footer-main">
          <div className="footer-links">
              <div className="footer-mens">
                  <h1>Mens</h1>
                  <div className="mens-links">
                    <Link to=''>Summer</Link>
                    <Link to='/winter'>Winter</Link>
                  </div>
              </div>
              <div className="footer-womens">
                    <h1>Womens</h1>
                    <div className="mens-links">
                      <Link to=''>Summer</Link>
                      <Link to='/winter'>Winter</Link>
                    </div>
              </div>
              <div className="footer-kids">
                    <h1>Kids</h1>
                    <div className="mens-links">
                      <Link to=''>Summer</Link>
                      <Link to='/winter'>Winter</Link>
                    </div>
              </div>
          </div>
          <div className="footer-location">
              <h1>Location</h1>
              <div className='location'>
                <h3>Bangladesh</h3>
                <p>Feni</p>
                <p>Dactar Para, Feni Sadar.</p>
              </div>
          </div>
          <div className="footer-developers">
              <h1>Developers</h1>
              <div className='developers'>
                <h3>MD. ASRAFUL ISLAM</h3>
                <p>FPI</p>
              </div>
          </div>
        </div>
        <div>
          <ExtraFooter />
        </div>
    </div>
  )
}

export default Footer
