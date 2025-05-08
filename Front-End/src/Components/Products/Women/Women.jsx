import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Women.css'

import { subCategory,categoryCheck } from '../../../utils/categoryCheck';

import { Link, useParams } from 'react-router-dom';
import Card from '../Card';
import Modal from '../Modal';


import {apiRequiest} from '../../../utils/ApiCall';
import Header from '../header/Header';

const Women =() => {
  const {category}= useParams()
  const [message,setMessage]=useState(localStorage.getItem('message')|| 'Product Empty!')
  const [pageLoading,setPageLoading] = useState(true)
  const [isModal,setIsModal]=useState(false)
  const [modalInfo,setModalInfo]=useState({})
  const [modalLoading,setModalLoading]=useState(true)
  const [womensData,setWomensData]= useState([])
  useEffect(()=>{
    const apiCaling=async()=>{
      try {
        if(subCategory(category)){
          const data = await apiRequiest('post','/get-product-by-subcategory', {subcategory : category})
          setWomensData(data?.products)
          setPageLoading(false)
        }else if(categoryCheck(category)){
          const data = await apiRequiest('post',`/get-product-by-categoris`,{categories : ['201230']}) 
          setWomensData(data?.products)
          setPageLoading(false)
        }else{
          setWomensData([])
          setPageLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    } 
    apiCaling()
  },[category])
  const handleModal=(modal,product)=>{
    setIsModal(modal)
    setModalInfo(product)
    setModalLoading(false)
  }
  const clearCartModal=(value)=>{
    setIsModal(value)
  }
  return (
    <>
      <div className='womens-page'>
      <Header  param={'/women/201230'} name={`Women's`} header={`Women's Shop`}/>
      <div className="womens-section">
          {pageLoading ? <p style={{textAlign : 'center'}}>Loaging...</p>
          : <div className='womens-shop'>
              {!pageLoading && (womensData?.length <= 0 || !womensData) ? <p>{message}</p>
              :  womensData.map((item)=>{
                return <Card key={uuidv4()} item={item} handleModal={handleModal}/>
              })}
          </div>}
      </div>
      </div>
      <div className={isModal ? 'modal-open' : 'add-to-cart-modal'}>
          {!modalLoading && isModal ?
          <Modal product={modalInfo} clearCartModal={clearCartModal}/>
          : <p style={{color : 'white'}}>loading...</p>}  
      </div>
    </>
  )
}

export default Women
