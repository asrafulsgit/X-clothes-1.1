import React, { useState } from 'react'
import Sidebar from './Sidebar';
import './admin.css'
import { Link, Outlet, useNavigation } from 'react-router-dom';
import Loading from '../../../utils/loading/Loading';
const Admin_Home = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [sidebarControl,setsidebarControl]=useState(false)
   const closeSidebar =()=>{
    setsidebarControl(false)
   }
  return (
    <>
      <div className="admin-component">
      <div className="admin_nav_sidebar">
        <nav className='admin-nav'>
            <button onClick={()=> setsidebarControl(!sidebarControl)} className='admin-sidebar-btn'><i className="fa-solid fa-bars"></i></button>
            <div className="back-to-home"> 
              <Link to='/'><button >Home</button></Link> 
            </div>
        </nav>
        <div className={`side-bar  ${sidebarControl ? 'admin-sidebar-control-open' : 'admin-sidebar-close'}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>
      </div>
      <div className="admin-page">
          <div className="admin-setting">
            {
            <Outlet />
          }
          </div>
      </div>
      </div>
    </>
  );
}

export default Admin_Home
