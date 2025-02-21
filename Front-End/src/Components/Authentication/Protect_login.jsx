import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Protect_login = () => {
    const {isLoggedIn} = useSelector(state => state.authInfo)
    return (isLoggedIn ? <Navigate to='/' /> : <Outlet /> )
}

export default Protect_login
