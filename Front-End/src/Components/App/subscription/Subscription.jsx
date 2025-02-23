import React from 'react'

import './subscription.css'

const Subscription = () => {
  return (
    <div className='subscription-page'>
       <div className="subscription-header">
               <p className='title'>Our NewsLetter</p>
               <h1>Subscribe to Our Newsletter to get
                    <br /> Updates to Our Latest Collection
               </h1>
               <p className='sub-title'> Get 20% off on your first order just by subscribing to our newsletter</p>
       </div>
       <div className="subscription-body">
          <form >
               <div className='substription-field'>
               {/* <div className="message-box">
               <i className="fa-solid fa-envelope"></i>
               </div> */}
               <input type="text" placeholder='Enter Email Address' />
               </div>
               <button type='submit'>Subscribe</button>
          </form>
       </div>
    </div>
  )
}

export default Subscription
