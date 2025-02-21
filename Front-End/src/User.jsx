import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts, setFavorites,setFavoritesProductsIds } from './utils/Controllers/UserSlice'
import axios from 'axios'
import socket from './socket'
const User = () => {
     const {isLoggedIn,loading} = useSelector(state => state.authInfo)
     const dispatch = useDispatch()
     useEffect(()=>{
           // carts count
           if(isLoggedIn){
               axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/count`, {
                    withCredentials: true,
                  }).then((res)=>{
                    // console.log(res)
                    dispatch(setCarts(res.data.count));
                  }). catch((err)=>{
                     console.log(err)
                  })
          }

          // favorites count
          if(isLoggedIn){
               axios.get(`${import.meta.env.VITE_BACKEND_URL}/favorite/count`, {
                    withCredentials: true,
                  }).then((res)=>{
                   dispatch(setFavorites(res.data.count));
                  }). catch((err)=>{
                    console.log(err)
                  }) 
          }

          if(isLoggedIn){
               axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-to-favourite`,{
                    withCredentials:true
                  }).then((res)=>{
                         const favoriteIds = res.data.products.map(item => item._id);
                         localStorage.setItem('favorites',JSON.stringify(favoriteIds))
                         dispatch(setFavoritesProductsIds(favoriteIds))
                  }).catch((err)=>{
                        console.log(err)
                  })
          }
     },[isLoggedIn])
  return (
   <></>
  )
}

export default User
