import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './Women.css'

import { subCategory,categoryCheck } from '../../../utils/categoryCheck';

import { Link, useParams } from 'react-router-dom';
import Card from '../Card';
import Modal from '../Modal';


import {apiRequiest} from '../../../utils/ApiCall';
import Header from '../header/Header';
import Loading from '../../../utils/loading/Loading';
import Page_loading from '../../../utils/loading/Page_loading';

const Women =() => {
  const {category}= useParams()
  const [message,setMessage]=useState('')
  const [pageLoading,setPageLoading] = useState(true)
  const [womensData,setWomensData]= useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

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
        }
      } catch (error) {
        setWomensData([])
        setMessage(error.data?.message || 'This Product is not available for now!')
        setPageLoading(false)
      }
  } 
  
  useEffect(()=>{
    apiCaling()
  },[category])

  const handleModal = (modal, product) => {
          setIsModalOpen(modal);
          setModalInfo(product);
        };
        if (pageLoading) {
          return <> <Page_loading /> </>
        }
  return (
    <>
      <div className='womens-page'>
      <Header  param={'/women/201230'} name={`Women's`} header={`Women's Shop`}/>
      <div className="womens-section">
        <div className='womens-shop'>
              {(!womensData || womensData?.length <= 0  ) ? <p className='message'>{message}</p>
              :  womensData.map((item)=>{
                return <Card key={uuidv4()} item={item} handleModal={handleModal}/>
              })}
          </div>
      </div>
      </div>

      {/* cart-modal */}
      <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />

    </>
  )
}

export default Women
