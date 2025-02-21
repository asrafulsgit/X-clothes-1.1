import React, { useContext } from 'react'

import './Menu.css'

import { NavLink } from 'react-router-dom'
const Menu = ({menu,onCloseMenu}) => {
const closeMenu =()=>{
      onCloseMenu(false)
}
  return (
    <div className={`menu ${menu && 'openMenu'}`}>
          <button className='close-menu-btn' onClick={closeMenu} ><i className="fa-solid fa-xmark"></i></button>
          <nav className='menu-nav'>
                <NavLink to='/men'>Men</NavLink>
                <NavLink to='/women'>Women</NavLink>
                <NavLink to='/kids'>Kinds</NavLink>
          </nav>
    </div>
  )
}

export default Menu
