import React, { useEffect, useState,memo } from 'react'
import './Nav.css'
import MensNav from './MensNav'
import WomensNav  from './WomensNav'
import KidsNav  from './KidsNav'
import WinterNav  from './WinterNav'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../socket'
import { setCarts,setFavorites} from '../../../utils/Controllers/UserSlice'
import { navLinksData } from '../../../allProductDetails/ProductCategories'

const Nav =({navBgSetWithModal}) => {
  const dispatch = useDispatch();
  const {isLoggedIn,carts,favorites} = useSelector(state => state.authInfo)
  // nav settings
  const [navbg, setNavbg]= useState(false)
  const [subNav,setSubNav]=useState(false)
  useEffect(()=>{
      setNavbg(navBgSetWithModal);
      window.addEventListener('scroll', ()=>{
        window.scrollY > 50 ? setNavbg(true) : setNavbg(false);
      })
      socket.on('carts',(data)=> dispatch(setCarts(data)))
      socket.on('favourites',(data)=> dispatch(setFavorites(data)))

  },[navBgSetWithModal])
  
  const [hover,setHover] = useState('')
  const handleMouseHover =(hoverItem)=>{
    setHover(hoverItem)
    setNavbg(true)
    setSubNav(true)
  }
  const hanldeLeave =()=>{
    setSubNav(false)
    }
    const subNavClose =(value)=>{
      setSubNav(value)
    }

  
  return (
    <>
    <header className='nav-page'>  
         
        <nav className={`nav ${navbg && 'navBg'}`}>
            <NavLink to='/' className='nav-logo'><h1 className='logo'><span>X</span> Clothes</h1></NavLink>   
            <div className="web-pages-nav">
                  {navLinksData.map((item,index)=>{
                    const {name,hover,path} = item;
                    return(
                      <NavLink key={index} 
                      to={path} 
                      // onClick={hanldeClick} 
                      onMouseLeave={hanldeLeave}
                      onMouseOver={()=>handleMouseHover(hover)}
                      >{name}</NavLink>
                    )
                  })}
            </div>  
            <div className="nav-links">
                  <NavLink to='/cart' >
                    <button className='nav-item cart-section-btn'>
                      <i className="fa-solid fa-cart-shopping"></i>
                      {isLoggedIn && <p className='total-carts-number'>{carts || 0}</p>}
                    </button>
                  </NavLink>
                  <NavLink to='/favourite' >
                    <button className='nav-item cart-section-btn'>
                      <i className="fa-regular fa-heart"></i>
                      {isLoggedIn && <p className='total-carts-number'>{favorites || 0}</p>}
                    </button>
                  </NavLink>
                  
                  <NavLink to={isLoggedIn ? '/profile' : '/login'} >
                    <button className='nav-item'><i className={`fa-${isLoggedIn ? 'regular' : 'solid'} fa-user`}></i></button>
                  </NavLink>
                  
                  
                  <button className='menu-btn mobile-nav' onClick={()=> setMenu(true)}  ><i className="fa-solid fa-bars"></i></button> 
            </div>
        </nav>
        
        {/*sub nav */}
        <div className={`secondary-nav ${subNav && 'secondary-nav-show'}`}
     onMouseOver={()=> setSubNav(true)}
     onMouseLeave={()=> setSubNav(false)}
     >
           { hover === 'mens' ? <MensNav  subNavClose={subNavClose}/>
           : hover === 'womens' ?   <WomensNav subNavClose={subNavClose} /> 
           : hover === 'kids'? <KidsNav /> 
           : hover === 'winter' ? <WinterNav /> 
           : '' }     
     </div>
    </header>
    </>
  )
}

export default Nav
