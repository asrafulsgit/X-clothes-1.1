import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Profile.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import axios from 'axios'
const Profile = () => {
   const navigate = useNavigate();
   const [loading,setLoading]=useState(true)
   const [userInfo,setUserInfo]=useState({})
   useEffect(()=>{
      axios.get('http://localhost:8000/user-profile',{
        withCredentials:true
      }).then((res)=>{
        // console.log(res)
        setUserInfo(res.data.userInfo)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
      })
   },[])
  const handleLogout = () =>{
    axios.get('http://localhost:8000/user-logout',{
      withCredentials : true
    }).then((res)=>{ 
      localStorage.removeItem('favorites')
      navigate('/login')
      window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  }
  if(loading){
    return( <h1>loading.....</h1> )
  }
  return (
    <div className='profile-page'>
      <Nav />
      <div className="main-profile-section">
        <div className="profile-header">
          <h1 className='profile-title'>Profile</h1>
        </div>
        <div className="user-info-div">
          <p className='user-name'>
           User Name : {userInfo.name && userInfo.name}
          </p>
          <p className='user-email'>
            Email : {userInfo.email && userInfo.email}
          </p>
        </div>
        <button className='user-logout-btn' onClick={handleLogout}>Log Out</button>
      </div>
      <Footer />
    </div>

  )
}

export default Profile
