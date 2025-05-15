import React, { useState } from 'react'
import axios from 'axios'
import './EmailVerification.css'
import { useDispatch, useSelector } from 'react-redux'
import { apiRequiest } from "../../../../utils/ApiCall";

import { useNavigate } from 'react-router-dom'
import { setEmailVerificationCode, setIsReadyForResetPassword } from '../../../../utils/Controllers/UserSlice'

const EmailVerification = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const {email} = useSelector(state => state.authInfo)
     const [message,setMessage] = useState('')
     const [isloading,setIsLoading]= useState(false)

     const [verificationInfo, setVerificationInfo]= useState({email:email,code : ''})
     const handleChange =(e)=>{
          const {value} =e.target;
          setVerificationInfo({...verificationInfo,code: value})
          setMessage('')
     }
     const handleSubmit=async(e)=>{
          e.preventDefault()
          if(verificationInfo.code.length !== 6){
               setMessage('Verification Code Must be 6 Digit!')
               return;
          }
          try {
               await apiRequiest('post','/forgot-password-email-verification',verificationInfo)
               dispatch(setEmailVerificationCode(verificationInfo.code))
               dispatch(setIsReadyForResetPassword(true))
               navigate('/reset-password')
          } catch (error) {
               console.log(error)
               setMessage(error.response?.data?.errors[0].message)
          }
          
     }
     const handleResend =async()=>{
          setIsLoading(true)
          try {
               await apiRequiest('post','/forgot-password-email',{email})
               setIsLoading(false)
               setMessage(res.data?.message)
          } catch (error) {
               console.log(error)
               setMessage(err.response?.data?.message)
          }
     }  
  return (
    <div className='email-verification-page'>
          <div className='email-verification-section'>
               <div className="varification-title">
                    <p>Check Your  email  and <br />enter verification Code with in 1 minute</p>
               </div>
               <form onSubmit={handleSubmit}>
                    <div className='email-verficaton-code'>
                         <label htmlFor="number">Verification Code</label>
                         <input 
                         type="number" name="code"  
                         id="number" 
                         onChange={handleChange}
                          required
                          placeholder='1235..'
                         />
                         <p className='message'>{message}</p>
                    </div>
                    <div className='email-verification-btns'>
                         <button type='button' onClick={handleResend}  className='email-verficaton-resend-btn'>{isloading ? 'Sending...' : 'Resend'}</button>
                         <button type='submit' className='email-verficaton-btn'>Forgot Password</button>
                    </div>
               </form>
          </div>
    </div>

  )
}

export default EmailVerification
