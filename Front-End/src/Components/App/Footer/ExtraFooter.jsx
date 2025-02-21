import React from 'react'
import { Link } from 'react-router-dom'

import './ExtraFooter.css'



const ExtraFooter = () => {
  return (
    <div className='extra-footer'>
      <div className="extra-footer-links">
          <Link to='/aboutus'>About Us</Link>
          <Link to='/return-policy'>Return Policy</Link>
          <Link to='/terms-and-conditions'>Terms & Condition</Link>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/faq'>FAQ</Link>
      </div>
    </div>
  )
}

export default ExtraFooter
