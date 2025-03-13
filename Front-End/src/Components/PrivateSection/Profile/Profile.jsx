import React, { useEffect, useState } from 'react'
import './Profile.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import Header from '../../Products/header/Header'
import ExtraFooter from '../../App/Footer/ExtraFooter'
import Sidebar from './sidebar/Sidebar'
import PersonalInfo from './peronalInfo/PersonalInfo'
import Orders from './orders/Orders'
import Address from './address/Address'
import Password from './password/Password'
import Logout from './logout/logout'

const Profile = () => {
   const [loading,setLoading]=useState(false)
   const [acitveInfo,setActiveInfo]=useState('')
  
  const handleSidebar =(value)=>{
     setActiveInfo(value)
  }
  return (
    <div className='profile-page'>
      <Nav />
      <Header parm={"/profile"} name={"Profile"} header={"Profile"}/>
      <div className="main-profile-section">
         <div className="user-account-sidebar">
             <Sidebar handleSidebar={handleSidebar}/>
         </div>
         <div className="user-account-setting">
             {
              acitveInfo === 'information' ? <PersonalInfo />
              : acitveInfo === 'orders' ? <Orders />
              : acitveInfo === 'address' ? <Address />
              : acitveInfo === 'password' ? <Password />
              : acitveInfo === 'logout' ?  <Logout />
              : <PersonalInfo />
             }
         </div>
      </div>
      <ExtraFooter />
      <Footer />
    </div>

)
}

export default Profile

{/* <button className='user-logout-btn' onClick={handleLogout}>Log Out</button> */}