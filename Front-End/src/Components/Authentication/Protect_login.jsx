import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../../utils/loading/Loading'

const Protect_login = () => {
    const {isLoggedIn,loading} = useSelector(state => state.authInfo)
    if(loading){
        return <><Loading /> </>
    }
    return (isLoggedIn ? <Navigate to='/' /> : <Outlet /> )
}

export default Protect_login
