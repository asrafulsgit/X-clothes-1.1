import React, { useEffect, useState } from 'react'
import './address.css'
import { apiRequiestWithCredentials } from '../../../../utils/ApiCall'
import AddAddress from './AddAddress'
import UpdateAddress from './UpdateAddress'
const Address = () => {
  const [addresses,setAddresses]=useState([])

  useEffect(()=>{
    const apiCalling =async()=>{
      try {
      const data =  await apiRequiestWithCredentials('get','/user-addresses')
       setAddresses(data.addresses)
      } catch (error) {
      console.log(error)
      }
    }
    apiCalling()
  },[])

  const newAddress=(address)=>{
    console.log(address)
    setAddresses([...addresses,address])
  }

  const handleAddressDelete =async(id)=>{
    const filteredAddress = addresses.filter(item => item._id !== id)
    try {
      await apiRequiestWithCredentials('delete',`/user-delete-address/${id}`)
      setAddresses(filteredAddress)
    } catch (error) {
      console.log(error)
    }
  }

  const [isUpdate,setIsUpdate]=useState(false)
  const [oldAddress,setOldAddress]=useState({})
  const handleAddressEdit=(address)=>{
    setIsUpdate(true)
    setOldAddress(address)
  }

  const isUpdated =(value,updatedAddress)=>{
    setAddresses(prevAddresses => 
      prevAddresses.map(address => 
          address._id === updatedAddress._id ? updatedAddress : address
      )
  );
    setIsUpdate(value)
  }

  return (
    <div className='manage-address-section'>
      <div className="previous-addresses">
         <table>
              <tbody>
                {addresses?.map((item,index)=>{
                  return(
                    <tr key={index}> 
                        <td>
                          <h2 className='house-name'>{item?.name}</h2>
                          <p className='house-address'> {item?.zila}, {item?.upazila}</p>
                        </td>
                        <td style={{width:'100px'}}><button className='edit-address-btn' onClick={()=>handleAddressEdit(item)} >Edit</button></td>
                        <td style={{width:'100px'}}><button className='delete-address-btn' onClick={()=> handleAddressDelete(item._id)}>Delete</button></td>
                    </tr>
                  )
                })}
              </tbody>
         </table>
      </div>
      <h1 className='new-address-title'>{isUpdate ? 'Updating ' : 'Add New'} Address</h1>
      {isUpdate ? <UpdateAddress oldAddress={oldAddress} isUpdated={isUpdated}/>
      : <AddAddress newAddress={newAddress}/>}
      
    </div>
  )
}

export default Address
