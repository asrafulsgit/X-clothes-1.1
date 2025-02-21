import React, { useState } from 'react'
import axios from 'axios'
import './EmailVerification.css'

import Nav from '../../../App/Nav/Nav'
import Footer from '../../../App/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'

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
          console.log(value)
          setVerificationInfo({...verificationInfo,code: value})
          
     }
     const handleSubmit=(e)=>{
          e.preventDefault()
          if(verificationInfo.code.length === 6){
               axios.post('http://localhost:8000/forgot-password-email-verification',verificationInfo)
               .then((res)=>{
                    dispatch(setEmailVerificationCode(verificationInfo.code))
                    dispatch(setIsReadyForResetPassword(true))
                    navigate('/reset-password')
               }).catch((err)=>{
                    setMessage(err.response.data.message)
               })
          }else{
               setMessage('Verification Code Must be 6 Digit!')
          }
     }
     const handleResend =()=>{
          setIsLoading(true)
          axios.post('http://localhost:8000/forgot-password-email',{email})
          .then((res)=>{
               setIsLoading(false)
               setMessage(res.data.message)
          }).catch((err)=>{
               setMessage(err.response.data.message)
          })
     }  
  return (
    <div className='email-verification-page'>
          <Nav />
          <div className='email-verification-section'>
               <div className="varification-title">
                    <p>Check Your  email  and <br />enter verification Code with in 1 minute</p>
               </div>
               <form onSubmit={handleSubmit}>
                    <div className='email-verficaton-code'>
                         <label htmlFor="number">Verification Code</label>
                         <input type="number" name="code"  
                         id="number" onChange={handleChange} required/>
                         <p className='message'>{message}</p>
                    </div>
                    <div className='email-verification-btns'>
                         <button type='button' onClick={handleResend}  className='email-verficaton-resend-btn'>{isloading ? 'Sending...' : 'Re-send'}</button>
                         <button type='submit' className='email-verficaton-btn'>Forgot Password</button>
                    </div>
               </form>
          </div>
          <Footer />
    </div>

  )
}

export default EmailVerification
