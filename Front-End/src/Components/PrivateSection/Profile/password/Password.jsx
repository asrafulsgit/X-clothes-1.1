import React, { useState } from 'react'
import './password.css'
const Password = () => {
     const [message,setMessage] =useState('')
     const [resetInfo, setResetInfo]= useState(
          {  
            oldPassword : '',
            newPassword : '', 
            confirmPassword : ''
          }
     )
     const [showPassword,setShowpassword]=useState('')
     const [seePassword,setSeePassword]=useState(false)
     console.log(showPassword)
     const handlePasswords =(value)=>{
        if(!seePassword){
          setShowpassword(value)
          setSeePassword(true)
        }else{
          setShowpassword('')
          setSeePassword(false)
        }
     }
     const handleChange=(e)=>{
          const {name,value}= e.target;
          setResetInfo({...resetInfo,[name] : value})
          setMessage('')
     }
     console.log(resetInfo)
     const handleSubmit =(e)=>{
          e.preventDefault()
          const {password,rePassword} = resetInfo;
          if(password === rePassword){
               axios.put('http://localhost:8000/reset-password',resetInfo)
               .then((res)=>{
                    navigate('/login')
                    dispatch(setEmail(''))
                    dispatch(setEmailVerificationCode(''))
                    dispatch(setIsReadyForResetPassword(false))
                    dispatch(setIsReadyForEmailVerify(false))
                    dispatch(setEmail(''))
               })
               .catch((err)=>{
                    setMessage(err.response.data.message)
               })
          }else{
               setMessage('Password is not match!')
          }
     }

return (
      <div className='password-manager-section'>
               <form >
                    <div className='input-field'>
                        <label htmlFor="password">Old Password</label>
                         <div className="inputs">
                         <input type={`${showPassword === 'password' ? 'text' :'password' }`} name="oldPassword"
                         onChange={handleChange} id="password" placeholder='old password' />
                         {resetInfo.oldPassword.length > 0 && 
                          <button type='button' onClick={()=>handlePasswords('password')} className='seePassword-btn'>
                              <i className={`fa-solid fa-eye${seePassword && showPassword === 'password' ? '': '-slash'}`}></i>
                          </button>}
                         </div>
                         <button className='forgot-password-btn'>Forgot Password</button>
                    </div>
                    <div className='input-field'>
                         <label htmlFor="password">New Password</label>
                         <div className="inputs">
                         <input  type={`${showPassword === 'oldPassword' ? 'text' :'password' }`} name="newPassword" 
                         onChange={handleChange} id="password" placeholder='new password'/>
                        {resetInfo.newPassword.length > 0 && 
                          <button type='button' onClick={()=>handlePasswords('oldPassword')} className='seePassword-btn'>
                              <i className={`fa-solid fa-eye${seePassword && showPassword === 'oldPassword' ? '': '-slash'}`}></i>
                          </button>}
                         </div>
                    </div>
                    <div className='input-field'>
                         <label htmlFor="password">Confirm New Password</label>
                         <div className="inputs">
                         <input type={`${showPassword === 'confirmPassword' ? 'text' :'password' }`} name="confirmPassword" onChange={handleChange} id="confirmPassword" placeholder='confirm password' />
                         {resetInfo.confirmPassword.length > 0 && 
                          <button type='button' onClick={()=>handlePasswords('confirmPassword')} className='seePassword-btn'>
                              <i className={`fa-solid fa-eye${seePassword && showPassword === 'confirmPassword' ? '': '-slash'}`}></i>
                          </button>}
                         </div>
                         <p className='message'>{message}</p>
                    </div>
                    <button type='submit' 
                    className='update-password-btn'>Update Password</button>
               </form>
     </div>
  )
}

export default Password
