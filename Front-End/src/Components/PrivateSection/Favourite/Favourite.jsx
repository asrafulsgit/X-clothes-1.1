import React, { useEffect, useState } from 'react'

import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';

import axios from 'axios';
import { apiRequiestWithCredentials } from '../../../utils/ApiCall';

const Favourite = () => {
   const [favorites,setFavorites]=useState([])
    const [message,setMessage]=useState(localStorage.getItem('message') || 'Your cart is empty!')
   const [loading,setLoading]=useState(true)
    useEffect(()=>{
      const apiCalling =async()=>{
            try {
              const data = await apiRequiestWithCredentials('get','/get-to-favourite');
              setFavorites(data?.products || [])
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
          }
        apiCalling()
    },[])

    const handleDelete=async(id)=>{
      setLoading(true)
      const filteredFavorites = favorites.filter(item => item._id !== id)
      setFavorites(filteredFavorites)
      try {
        await apiRequiestWithCredentials('delete',`/remove-from-favourite/${id}`);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }

    }
    
  
    return (
      <div className='cart-page'>
        <Nav />
        <div className='cart-page-header'>
          <h1>Favourites</h1>
          <p>"Ready to Rock Your New Look?"</p>
        </div>
        <div className='cart-main'>
            <div className='cart-cards'>
              {loading && <p>Loading....</p> }
              {!loading && (favorites.length <= 0 || !favorites) ? <p className='empty-message'>{message}</p>
              : favorites.map((item)=>{
                const {_id,images,title,price}= item;
                  return  (
                      <div key={_id} className='cart-card'>
                        <img src={images[0]} alt="" />
                        <h1 className='title'>{title.length > 30 ? item.title.slice(0,25)+'...' : item.title}</h1>
                        <p className='price'>BDT : {price}</p>
                        <button onClick={()=>handleDelete(_id)} className='remove-cart-item-btn'>Remove</button>
                      </div>
                  )
                })
              }
            </div>
        </div>
        <Footer />
      </div>
    )
  }

export default Favourite
