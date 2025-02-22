import React from 'react'
import './Brands.css'
import easy from '../../../assets/brands/easy.png'
import aarong from '../../../assets/brands/aarong.webp'
import lereve from '../../../assets/brands/lereve.png'
import Richman from '../../../assets/brands/Richman.webp'
import turaag from '../../../assets/brands/turaag.png'
import twelve from '../../../assets/brands/twelve.avif'

const Brands = () => {
     const brandsName = [
          {
               name : 'Easy',
               logo :  easy
          },
          {
               name : 'Aarong',
               logo : aarong
          },
          {
               name : 'Lereve',
               logo : lereve
          },
          {
               name : 'Richman',
               logo : Richman
          },
          {
               name : 'Turaag',
               logo : turaag
          },
     ]
     
  return (
    <div  className='brands-name-page'>
          {
               brandsName.map((item,index)=>{
                    return (
                         <div key={index} className='brand'>
                              <img src={item.logo} alt="" />
                              <p>{item.name}</p>
                         </div>
                    )
               })
          }
    </div>
  )
}

export default Brands
