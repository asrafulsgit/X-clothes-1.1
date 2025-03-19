import React, { useEffect } from 'react'
import { apiRequiest } from '../../../../utils/ApiCall'
import { useParams } from 'react-router-dom'

const Successfull = () => {
  const {tranId} = useParams();
  console.log(tranId)
  useEffect(()=>{
    const apiCalling =async()=>{
      try {
        const data = await apiRequiest('get',`/payment/details/${tranId}`)
        console.log(data)
      } catch (error) {
        
      }
    }
    apiCalling()
  },[])
  return (
    <div>
      <h1>your payment is Successfull</h1>
    </div>
  )
}

export default Successfull
