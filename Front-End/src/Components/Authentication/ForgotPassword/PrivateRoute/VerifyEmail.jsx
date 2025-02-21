import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const IsEmailExist = () => {
  const {isReadyForEmailVerify} = useSelector(state => state.authInfo)
  return (
    isReadyForEmailVerify ? <Outlet /> : <Navigate to='/login' />
  )
}

export default IsEmailExist
