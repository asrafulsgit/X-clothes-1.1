import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const IsVerified = () => {
  const {isReadyForResetPassword} = useSelector((state)=> state.authInfo)
  return (
    isReadyForResetPassword ? <Outlet /> : <Navigate to='/login'/>
  )
}

export default IsVerified
