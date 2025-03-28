import React, { useState } from 'react'
import DashBoard from '../dashboard/Dashboard';
import Sidebar from './Sidebar';
import AddProduct from '../Add-product/AddProduct';
import './admin.css'
import Order_list from '../orders/Order_list';
import Product_list_upadate from '../product-list/Product_list_upadate';
import { Link } from 'react-router-dom';
const Admin_Home = () => {
  const [acitveSection,setActiveSection]=useState('')
  const [sidebarControl,setsidebarControl]=useState(false)
  const handleSidebar =(value)=>{
    setActiveSection(value)
    setsidebarControl(!sidebarControl)
 }
  return (
    <>
      <nav className='admin-nav'>
           <button onClick={()=> setsidebarControl(!sidebarControl)} className='admin-sidebar-btn'><i className="fa-solid fa-bars"></i></button>
           <div className="back-to-home"> <Link to='/'><button >Home</button></Link> </div>
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
              <Product_list_upadate />
            ) : <DashBoard /> }
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Home
