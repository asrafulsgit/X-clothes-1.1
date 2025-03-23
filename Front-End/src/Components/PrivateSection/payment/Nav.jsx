import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './nav.css'
const Nav = () => {
  return (
     <nav className='payment-nav'>
     <NavLink to='/' className='nav-logo'><h1 className='logo'><span>X</span> Clothes</h1></NavLink>   
     <div className="back-to-home"> <Link to='/'><button >Home</button></Link> </div>
     </nav>
  )
}

export default Nav
