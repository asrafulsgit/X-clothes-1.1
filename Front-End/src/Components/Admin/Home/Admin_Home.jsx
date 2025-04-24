import React, { useState } from 'react'
import Sidebar from './Sidebar';
import './admin.css'
import { Link, Outlet, useNavigation } from 'react-router-dom';
import Loading from '../../../../../../Assignments/assignment-08/src/components/loading/Loading';
const Admin_Home = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const [sidebarControl,setsidebarControl]=useState(false)

  return (
    <>
      <nav className='admin-nav'>
           <button onClick={()=> setsidebarControl(!sidebarControl)} className='admin-sidebar-btn'><i className="fa-solid fa-bars"></i></button>
           <div className="back-to-home"> 
            <Link to='/'><button >Home</button></Link> 
            </div>
      </nav>
      <div className="admin-page">
        <div className="admin-page-section">
          <div className={`admin-sidebar ${sidebarControl && 'admin-sidebar-control'}`}>
            <Sidebar  />
            
          </div>
          <div className="admin-setting">
            {
            isLoading ? <Loading /> : <Outlet />
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin_Home
