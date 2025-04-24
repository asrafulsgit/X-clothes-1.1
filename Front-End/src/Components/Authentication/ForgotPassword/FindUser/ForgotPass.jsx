import React, { useEffect, useState } from 'react'

import './ForgotPass.css'
import Nav from '../../../App/Nav/Nav'
import Footer from '../../../App/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEmail, setIsReadyForEmailVerify } from '../../../../utils/Controllers/UserSlice'
import { apiRequiest } from '../../../../utils/ApiCall'

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

     const handleSubmit = async(e)=>{
          e.preventDefault() 
          setIsLoading(true)
          try {
               const data = await apiRequiest('post','/forgot-password-email',{email})
               setIsLoading(false)
               dispatch(setIsReadyForEmailVerify(true))
               dispatch(setEmail(data.email))
               navigate('/eamil-verication')
          } catch (error) {
               setMessage(error.response?.data?.errors[0].message)
               dispatch(setIsReadyForEmailVerify(false))
               setIsLoading(false)
          }
     }

  return (
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
  )
}

export default ForgotPass
