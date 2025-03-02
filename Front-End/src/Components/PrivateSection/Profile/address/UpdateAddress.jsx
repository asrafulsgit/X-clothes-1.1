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
  useEffect(()=>{
    setAddress(oldAddress)
  },[oldAddress])
   const handleInputChange =(e)=>{
    const {name,value}=e.target;
    setAddress({...address,[name] : value})
  }
   const handleUpdateAddress=async()=>{
    try {
      const data = await apiRequiestWithCredentials('put',`/user-update-address/${address._id}`,address)
      isUpdated(false)
      setAddress({})
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <div className="address-section">
         <div className="input-field">
           <label htmlFor="house">House</label>
             <input type="text" value={address.house || ''} required name='house' onChange={handleInputChange} placeholder='Asraful House'  />
         </div>
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
         <div className="input-field">
           <label htmlFor="zip">Zip Code</label>
           <input required type="number" name="zip" 
           onChange={handleInputChange} value={address.zip || ''}
           id="zip" placeholder='3900'/>
         </div>
         <div className="input-field">
           <label htmlFor="email">Email</label>
             <input type="email" name='email' value={address.email || ''} onChange={handleInputChange} placeholder='example@gmail.com' />
         </div>
         <div className="input-field">
           <label htmlFor="phone">Phone</label>
             <input type="number" value={address.phone || ''} required name='phone' onChange={handleInputChange} placeholder='+8801825643258' />
         </div>
         <div className="info-update-btn">
                <button onClick={handleUpdateAddress}>Save change</button>
          </div>
     </div>
  )
}

export default UpdateAddress
