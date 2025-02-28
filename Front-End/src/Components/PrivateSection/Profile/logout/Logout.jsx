import React from 'react'
import './logout.css'
import { apiRequiestWithCredentials } from '../../../../utils/ApiCall'

const Logout = () => {
  const handleLogout = async() =>{
    try {
      await apiRequiestWithCredentials('get','/user-logout')
      localStorage.removeItem('favorites')
      window.location.replace(`${import.meta.env.VITE_FRONTEND_URL}/login`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='logout-section'>
       <h1>Logout</h1>
       <p>Are you sure you want to log out?</p>
       <button onClick={handleLogout} className='logout-btn'>Yes, Logout</button>
    </div>
  )
}

export default Logout
