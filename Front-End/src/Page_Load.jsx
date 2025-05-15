import axios from 'axios'
import React, { useEffect } from 'react'
import { setLoading } from './utils/Controllers/UserSlice'
import { useDispatch } from 'react-redux'

const Page_Load = ({checkUserCreadentials}) => {
     const dispatch = useDispatch()
     const setCreadentials=(value)=>{
          checkUserCreadentials(value)
     }
     useEffect(()=>{
          try {
               axios.get(`${import.meta.env.VITE_BACKEND_URL}/access/token/refresh`,{
                 withCredentials : true
              }).then((res)=>{
               setCreadentials(true)
               dispatch(setLoading(false))
               }).catch((err)=>{
                    localStorage.removeItem('favorites')
                    setCreadentials(false)
                    dispatch(setLoading(false))
               })  
             } catch (error) {
               console.error('the error is', error)
               setCreadentials(false)
               dispatch(setLoading(false))
             }
     },[])
  return (<></>)
}

export default Page_Load

