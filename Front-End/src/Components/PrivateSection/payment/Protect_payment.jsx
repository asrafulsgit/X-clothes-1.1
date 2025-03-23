import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Protect_payment = () => {
     const {isCheckout} = useSelector(state => state.authInfo)
     return (isCheckout ? <Outlet /> : <Navigate to='/cart' />)
}

export default Protect_payment

