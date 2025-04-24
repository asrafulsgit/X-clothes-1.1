import React, { useEffect, useState } from 'react'
import { bangladeshUpazila, divisions } from '../../../../allProductDetails/ProductCategories';
import { apiRequiestWithCredentials } from '../../../../utils/ApiCall';

const UpdateAddress = ({oldAddress,isUpdated}) => {
  const [address,setAddress]=useState(oldAddress || {
    name: "",
    zila: "",
    upazila: "",
    email: "",
    phone: "",
  })
  const [upazilas,setUpazilas]=useState([])
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
    if(name === 'zila'){
              const selectedZila = bangladeshUpazila.find(item => item.zila.toLowerCase() === value);
              setUpazilas(selectedZila.upazilas)
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
  <> <form action="" onSubmit={(e)=>handleUpdateAddress(e, address._id)}>
      <div className="address-section">
         <div className="input-field">
           <label htmlFor="name">Full Name</label>
          <input type="text" value={address.name || ''} required name='name' onChange={handleInputChange} placeholder='Asraful House'  />
         </div>
         {errorMessageField === 'name' && <p className='message'>{message}</p>}
         <div className="address-field">
               <div className="input-field">
                 <label htmlFor="zila">Zila</label>
                 <select
                   name="zila"
                   value={address.zila || ""}
                   required
                   onChange={handleInputChange}
                   id="zila"
                 >
                   <option value="">Select Option</option>
                   {bangladeshUpazila.map((item, index) => {
                     const { zila } = item;
                     return (
                       <option value={zila.toLowerCase()} key={index}>
                         {zila}
                       </option>
                     );
                   })}
                 </select>
                 {errorMessageField === "zila" && (
                   <p className="message">{message}</p>
                 )}
               </div>
         {errorMessageField === 'zila' && <p className='message'>{message}</p>}

               <div className="input-field">
                 <label htmlFor="upazila">Upazila</label>
                 <select
                   name="upazila"
                   value={address.upazila || ""}
                   required
                   onChange={handleInputChange}
                   id="upazila"
                 >
                   <option value="">Select Option</option>
     
                   {address.zila &&
                     upazilas.map((item, index) => {
                       return (
                         <option value={item} key={index}>
                           {item}
                         </option>
                       );
                     })}
                 </select>
                 {errorMessageField === "shippingAddress.upazila" && (
                   <p className="message">{message}</p>
                 )}
               </div> 
         {errorMessageField === 'upazila' && <p className='message'>{message}</p>}
         
         </div>
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
     </div>
     </form>
</> 
    
    
  )
}

export default UpdateAddress
