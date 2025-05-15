import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Card from '../../../Products/Card'
import Modal from '../../../Products/Modal'

import './BestSellers.css'
import OutlateProduct from '../OutlateProduct'
import { apiRequiest } from '../../../../utils/ApiCall';
import Spinner from '../../../../utils/loading/Spinner';


const BestSellers = () => {
     const [message, setMessage]= useState('')
     const [products,setProducts]= useState([])
     const [loading,setLoading] = useState(true)
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [modalInfo, setModalInfo] = useState({});
     const bestSalesProducts = async()=>{
          try {
               const data = await apiRequiest('get','/sales/best-sales')
               setProducts(data.products)
             
          } catch (error) {
               console.log(error)
               setProducts([])
          }finally{
               setLoading(false)
          }
     }

     useEffect(()=>{
          bestSalesProducts()
     },[])
     
     const handleModal = (modal, product) => {
          setIsModalOpen(modal);
          setModalInfo(product);
        };
       

     return (
     <>
     <div className="best-seller-page">
           {loading ? 
           <p className="outlate-spinner">
                    <Spinner />
          </p> : ( !products || !products.length ) ? <p>no data found</p>
              : <div className="outlate-products">
               {products.map((item) => {
                  return (
                    <Card
                      key={uuidv4()}
                      item={item.product}
                      handleModal={handleModal}
                    />
                  );
                })}
              </div> }   
     </div>
     <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />
     </> 
  )
}

export default BestSellers
