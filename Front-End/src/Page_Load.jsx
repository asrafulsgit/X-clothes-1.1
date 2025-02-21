import axios from 'axios'
import React, { useEffect } from 'react'

const Page_Load = ({checkUserCreadentials}) => {
     const setCreadentials=(value)=>{
          checkUserCreadentials(value)
     }
     useEffect(()=>{
          try {
               axios.get(`${import.meta.env.VITE_BACKEND_URL}/access/token/refresh`,{
                 withCredentials : true
              }).then((res)=>{
               //   console.log(res)
               setCreadentials(true)
               }).catch((err)=>{
                    localStorage.removeItem('favorites')
                    setCreadentials(false)

               })  
             } catch (error) {
               console.error('the error is', error)
             }
     },[])
  return (<></>)
}

export default Page_Load

