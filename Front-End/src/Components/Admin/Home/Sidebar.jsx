import React, { useState } from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = ({closeSidebar}) => {
     
     const sidebarInfo =[
          {
               name : 'Dashboard',
               path : '/admin/dashboard'
          },
          {
               name : 'Order List',
               path : '/admin/order-list'
          },
          {
               name : 'Add Product',
                path : '/admin/add-product'
          },
          {
               name : 'Product List',
                path : '/admin/product-list'
          },
          {
               name : 'Add Expenses',
                path : '/admin/add-expenses'
          },
     ]
     
     
  return (
     <nav className='admin-sidebar-section' >
          {
               sidebarInfo.map((item,index)=>{
                    return(
                         <NavLink to={item.path} onClick={closeSidebar} key={index}>
                              <button key={index} className={` sidebar-btn`}
                         > {item.name}</button>
                         </NavLink>
                    )
               })
          }
     </nav>
  )
}

export default Sidebar
