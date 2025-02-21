import React, { useState } from 'react'
import './Show.css'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Show = () => {
     const dispatch = useDispatch()
     const [hover,setHover]=useState('')
     const handleMouseOver=(houverName)=>{
          setHover(houverName)
     }
     const handleClick=()=>{
          dispatch(setSelectedCategory(''))
     }
  return (
    <div className='show-page'>
          <div className='men-show' onMouseOver={()=>handleMouseOver('mens')} onMouseLeave={()=>setHover('')}>
               <h2>Modern <br /> Gentleman</h2>
               <Link to='/men' onClick={handleClick}
                    className={`show-hover-btn ${hover === 'mens' && 'mens-hover'}`}>
                    <button>Mens Wear</button>
               </Link>
          </div>
          <div className='women-show' onMouseOver={()=>handleMouseOver('womens')} onMouseLeave={()=>setHover('')}>
               <h2>Elegance <br /> Defined</h2>
               <Link to='/women' onClick={handleClick} className={`show-hover-btn ${hover === 'womens' && 'womens-hover'}`}>
                    <button>Womens Wear</button>
               </Link>
          </div>
          <div className='kids-show' onMouseOver={()=>handleMouseOver('kids')} onMouseLeave={()=>setHover('')}>
               <h2>Little <br /> Luminaries</h2>
               <Link to='/kids' onClick={handleClick}  className={`show-hover-btn ${hover === 'kids' && 'kids-hover'}`}>
                    <button>Kids Wear</button>
               </Link>
          </div>
    </div>
  )
}

export default Show
