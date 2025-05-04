import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../../utils/loading/Loading'

const Protect = () => {
     const isLoggedIn = useSelector(state => state.authInfo.isLoggedIn)
     const isLoading = useSelector(state => state.authInfo.loading)
      
     if(isLoading){
          return <><Loading /></>
     }
     return (isLoggedIn ? <Outlet /> : <Navigate to='/login' />)
}

export default Protect
