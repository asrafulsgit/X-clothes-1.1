import React, { useEffect, useState } from 'react'
import { divisions } from '../../../../allProductDetails/ProductCategories';
import { apiRequiestWithCredentials } from '../../../../utils/ApiCall';

const UpdateAddress = ({oldAddress,isUpdated}) => {
  const [address,setAddress]=useState(oldAddress || {
    house: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  })
  const [message,setMessage]=useState('')
  const [errorMessageField,setErrorMessageField]=useState('')
  useEffect(() => {
    if (oldAddress) {
      setAddress(oldAddress);
    }
  }, [oldAddress]);
   const handleInputChange =(e)=>{
     const {name,value}=e.target;
    if(name === errorMessageField){
      setMessage('')
      setErrorMessageField('')
    }
    setAddress({...address,[name] : value})
  }
   const handleUpdateAddress=async(e,id)=>{
    e.preventDefault();
    try {
      const data = await apiRequiestWithCredentials('put',`/user-update-address/${id}`,address)
      isUpdated(false,data.address)
      setAddress(data.address);
      setMessage('')
      setErrorMessageField('')
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.errors[0].message || "Something went wrong")
      setErrorMessageField(error.response?.data?.errors[0].field || '')
    }
   }
  return (
    <form action="" onSubmit={(e)=>handleUpdateAddress(e, address._id)}>
      <div className="address-section">
         <div className="input-field">
           <label htmlFor="house">House</label>
          <input type="text" value={address.house || ''} required name='house' onChange={handleInputChange} placeholder='Asraful House'  />
         </div>
         {errorMessageField === 'house' && <p className='message'>{message}</p>}
         <div className="input-field">
           <label htmlFor="state">State</label>
               <select name="state" value={address.state || ''} required onChange={handleInputChange} id="state">
                 {divisions.map((item,index)=>{
                   return(
                     <option value={item.toLowerCase()} key={index}>{item}</option>
                   )
                 })}
               </select>
         </div>
         {errorMessageField === 'state' && <p className='message'>{message}</p>}
         <div className="input-field">
           <label htmlFor="zip">Zip Code</label>
           <input required type="number" name="zip" 
           onChange={handleInputChange} value={address.zip || ''}
           id="zip" placeholder='3900'/>
         </div>
         {errorMessageField === 'zip' && <p className='message'>{message}</p>}
         <div className="input-field">
           <label htmlFor="email">Email</label>
             <input type="email" name='email' value={address.email || ''} onChange={handleInputChange} placeholder='example@gmail.com' />
         </div>
         {errorMessageField === 'email' && <p className='message'>{message}</p>}
         <div className="input-field">
           <label htmlFor="phone">Phone</label>
             <input type="number" value={address.phone || ''} required name='phone' onChange={handleInputChange} placeholder='+8801825643258' />
         </div>
         {errorMessageField === 'phone' && <p className='message'>{message}</p>}
         <div className="info-update-btn">
                <button type='submit'>Save change</button>
          </div>
     </div></form>
    
  )
}

export default UpdateAddress
