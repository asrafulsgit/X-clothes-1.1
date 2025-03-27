import React, { useState } from 'react'
import DashBoard from '../dashboard/Dashboard';
import Sidebar from './Sidebar';
import AddProduct from '../Add-product/AddProduct';
import './admin.css'
import Order_list from '../orders/Order_list';
import Product_list from '../product-list/Product_list';
const Admin_Home = () => {
  const [acitveSection,setActiveSection]=useState('')
  const [sidebarControl,setsidebarControl]=useState(false)
  const handleSidebar =(value)=>{
    setActiveSection(value)
 }
  return (
    <>
      <nav style={{border: '1px solid',padding : '1.5rem'}}> 
          <button onClick={()=> setsidebarControl(!sidebarControl)} className='admin-sidebar-btn'>close</button>
      </nav>
      <div className="admin-page">
        <div className="admin-page-section">
          <div className={`admin-sidebar ${sidebarControl && 'admin-sidebar-control'}`}>
            <Sidebar handleSidebar={handleSidebar} />
            
          </div>
          <div className="admin-setting">
            {acitveSection === "dashboard" ? (
              <DashBoard />
            ) : acitveSection === "orders" ? (
               <Order_list />
            ) : acitveSection === "addproduct" ? (
              <AddProduct/>
            ) :acitveSection === "product" ? (
              <Product_list />
            ) : <DashBoard /> }
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Home
