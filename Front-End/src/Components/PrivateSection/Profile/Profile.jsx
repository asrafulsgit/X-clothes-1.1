import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Profile.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import axios from 'axios'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall'
import Header from '../../Products/header/Header'
import ExtraFooter from '../../App/Footer/ExtraFooter'
import Sidebar from './sidebar/Sidebar'
import PersonalInfo from './peronalInfo/PersonalInfo'
import Orders from './orders/Orders'
import Address from './address/Address'
import Password from './password/Password'
import Logout from './logout/logout'

const Profile = () => {
   const navigate = useNavigate();
   const [loading,setLoading]=useState(false)
   const [userInfo,setUserInfo]=useState({})
   const [acitveInfo,setActiveInfo]=useState('')
   useEffect(()=>{
    setLoading(true)
      const apiCalling =async()=>{
        try {
          const data = await apiRequiestWithCredentials('get','/user-profile')
          setUserInfo(data.userInfo)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      apiCalling()
   },[])
  const handleLogout = async() =>{
    try {
      await apiRequiestWithCredentials('get','/user-logout')
      localStorage.removeItem('favorites')
      window.location.replace(`${import.meta.env.VITE_FRONTEND_URL}/login`)
    } catch (error) {
      console.log(error)
    }
  }
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