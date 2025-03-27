import React, { useState } from 'react'
import './sidebar.css'
const Sidebar = ({handleSidebar}) => {
     const [active,setActive]=useState(0)
     const sidebarInfo =[
          {
               name : 'Dashboard',
               value : 'dashboard'
          },
          {
               name : 'Order List',
               value : 'orders'
          },
          {
               name : 'Add Product',
               value : 'addproduct'
          },
          {
               name : 'Product List',
               value : 'product'
          },
     ]
     const handleClick =(value,activeIndex)=>{
          handleSidebar(value)
          setActive(activeIndex)
     }
     
  return (
     <nav className='admin-sidebar-section' >
          {
               sidebarInfo.map((item,index)=>{
                    return(
                         <button key={index} className={`${ active === index && 'active'} sidebar-btn`}
                         
                         onClick={()=>handleClick(item.value,index)} >

                                   {item.name}</button>
                    )
               })
          }
     </nav>
  )
}

export default Sidebar
