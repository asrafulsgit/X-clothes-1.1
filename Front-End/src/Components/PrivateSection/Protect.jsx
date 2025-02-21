import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Protect = () => {
     const {isLoggedIn} = useSelector(state => state.authInfo)
     return (isLoggedIn ? <Outlet /> : <Navigate to='/login' />)
}

export default Protect
