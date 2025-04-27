import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { apiRequiestWithCredentials } from '../../utils/ApiCall';
import Loading from '../../utils/loading/Loading';

const Private_admin = () => {
  const [pageLoading,setPageLoading]=useState(true)
  const [isAdmin,setIsAdmin]=useState(false)
  
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
      const data =  await apiRequiestWithCredentials('get','/admin-authentication')
      setIsAdmin(data.success || true)
      setPageLoading(false)
    } catch (error) {
        console.log(error)
        setPageLoading(false)
      }
    }
    apiCalling()
  })
  if(pageLoading){
    return (<><Loading /></> )
  }
  return (isAdmin ? <Outlet /> : <Navigate to='/' />)
}

export default Private_admin

