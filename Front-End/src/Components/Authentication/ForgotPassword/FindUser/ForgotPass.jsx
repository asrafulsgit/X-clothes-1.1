import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './ForgotPass.css'
import Nav from '../../../App/Nav/Nav'
import Footer from '../../../App/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEmail, setIsReadyForEmailVerify } from '../../../../utils/Controllers/UserSlice'

const ForgotPass = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const [message,setMessage] = useState('')
     const [isLoading,setIsLoading]=useState(false)
     const [email, setUserEmail] = useState('')
     const handleChange=(e)=>{
          const {value} = e.target;
          setUserEmail(value)
          setMessage('')
     }
     const handleSubmit=(e)=>{
          e.preventDefault() 
          setIsLoading(true)
          axios.post('http://localhost:8000/forgot-password-email',{email})
          .then((res)=>{
               const {message,email}= res.data;
               setIsLoading(false)
               dispatch(setIsReadyForEmailVerify(true))
               dispatch(setEmail(email))
               navigate('/eamil-verication')
          }).catch((err)=>{
               console.log(err)
               dispatch(setIsReadyForEmailVerify(false))
               setMessage(err.response?.data?.message)
               setIsLoading(false)
          })
     }

  return (
     <div>
          <Nav />
          <div className='forgot-password-section'>
               
               <form action="" onSubmit={handleSubmit} >
                    <div className='forgot-email'>
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" value={email}
                         id="email" onChange={handleChange} required/>
                         <p className='message'>{message}</p>
                    </div>
                    <button type='submit' className='forgot-btn'>{isLoading ? 'Sending...' : 'Forgot Password'}</button>
               </form>
          </div>
          <Footer />
     </div>
  )
}

export default ForgotPass
