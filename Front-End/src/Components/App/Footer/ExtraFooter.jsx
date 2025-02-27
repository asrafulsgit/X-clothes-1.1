import React from 'react'

import './ExtraFooter.css'

import payment from '../../../assets/vectors/payment.png'
import shipping from '../../../assets/vectors/shipping.png'
import support from '../../../assets/vectors/support.png'

const ExtraFooter = () => {
  const extraFooter = [
    {
      image : shipping, 
      title : 'Free Shipping', 
      subtitle : 'Free Shipping for order above BDT 1k'
    },
    {
      image : payment, 
      title : 'Flexible payment', 
      subtitle : 'Multiple secure payment options'
    },
    {
      image : support, 
      title : '24/7 Support', 
      subtitle : 'We support online all days'
    }
  ]
  return (
    <div className='extra-footer'>
         {extraFooter.map((item,index)=>{
          const {image,title,subtitle}= item;
          return(
          <div className="extra-footer-itmes" key={index}>
            <img src={image} alt="vector" />
            <div className="extra-footer-details">
                 <h2>{title}</h2>
                 <p>{subtitle}</p>
            </div>
          </div>
          )
         })}
        
    </div>
  )
}

export default ExtraFooter
