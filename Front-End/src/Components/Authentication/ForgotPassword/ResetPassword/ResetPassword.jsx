import React, { useState } from 'react'
import axios from 'axios'
import './ResetPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setEmail, setEmailVerificationCode, setIsReadyForEmailVerify, setIsReadyForResetPassword } from '../../../../utils/Controllers/UserSlice'
import { apiRequiest } from '../../../../utils/ApiCall'

const ResetPassword = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const [message,setMessage] =useState('')
     const {email,emailVerficationCode} = useSelector((state)=> state.authInfo)

     const [resetInfo, setResetInfo]= useState(
          { 
            email:email, 
            code : emailVerficationCode,
            password : '', 
            rePassword : ''
          }
     )
     const handleChange=(e)=>{
          const {name,value}= e.target;
          setResetInfo({...resetInfo,[name] : value})
          setMessage('')
     }
     const handleSubmit =async(e)=>{
          e.preventDefault()
          const {password,rePassword} = resetInfo;
          if(password !== rePassword){
               setMessage('Password is not match!')
          }
          try {
               await apiRequiest('put','/reset-password',resetInfo)
               navigate('/login')
               dispatch(setIsReadyForResetPassword(false))
               dispatch(setIsReadyForEmailVerify(false))
               dispatch(setEmailVerificationCode(''))
               dispatch(setEmail(''))
          } catch (error) {
               console.log(error)
               setMessage(error.response?.data?.errors[0].message)
          }
               
         
     }

return (
      <div className='reset-password-section'>
               <form onSubmit={handleSubmit}>
                    <div className='reset-password'>
                         <label htmlFor="password">New Password</label>
                         <input type="password" 
                         name="password" 
                         onChange={handleChange} id="password" required
     
                         />
                    </div>
                    <div className='reset-password'>
                         <label htmlFor="password">Confirm Password</label>
                         <input type="password" 
                         name="rePassword" onChange={handleChange} 
                         id="rePassword" required 
                       />
                         <p className='message'>{message}</p>
                    </div>
                    <button type='submit' className='reset-password-btn'>Forgot Password</button>
               </form>
     </div>
  )
}

export default ResetPassword
