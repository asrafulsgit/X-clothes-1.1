import React, { useState } from 'react'
import './sidebar.css'
const Sidebar = ({handleSidebar}) => {
     const [active,setActive]=useState(0)
     const sidebarInfo =[
          {
               name : 'Personal Information',
               value : 'information'
          },
          {
               name : 'My Orders',
               value : 'orders'
          },
          {
               name : 'Manage Address',
               value : 'address'
          },
          {
               name : 'Password Manager',
               value : 'password'
          },
          {
               name : 'Logout',
               value : 'logout'
          },
     ]
     const handleClick =(value,activeIndex)=>{
          handleSidebar(value)
          setActive(activeIndex)
     }
     
  return (
     <nav className='sidebar'>
          {
               sidebarInfo.map((item,index)=>{
                    return(
                         <button key={index} className={`${ active === index && 'hello'} sidebar-btn`}
                         
                         onClick={()=>handleClick(item.value,index)} >

                                   {item.name}</button>
                    )
               })
          }
     </nav>
  )
}

export default Sidebar
