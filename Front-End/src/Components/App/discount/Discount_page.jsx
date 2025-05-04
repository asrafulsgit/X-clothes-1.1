import React, { useEffect, useState } from 'react'
import Modal from '../../Products/Modal';
import { useParams } from 'react-router-dom';
import Card from '../../Products/Card';
import Header from '../../Products/header/Header';
import { apiRequiest } from '../../../utils/ApiCall';

const Discount_page = () => {
    const {discount} = useParams()
    const [message, setMessage]= useState('')
       const [products,setProducts]= useState([])
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [modalInfo, setModalInfo] = useState({});
       const discountProducts = async()=>{
            try {
                 const data = await apiRequiest('get',`/guest/flat-discount?discount=${discount}`)
                 setProducts(data.products)
               
            } catch (error) {
                 console.log(error)
                 setProducts([])
            }finally{
            }
       }
  
       useEffect(()=>{
        discountProducts()
       },[])
       
       const handleModal = (modal, product) => {
            setIsModalOpen(modal);
            setModalInfo(product);
          };
         
  
       return (

       <>
       <div className="mens-page">
       <Header param={`/product/discount/${discount}`} name={`Discount`} header={`Discount Shop`} />
        <div className="mens-section">
        <div className="mens-shop">
             {( !products || !products.length ) ? <p>no data found</p>
                : products.map((item,index) => {
                    return (
                      <Card
                        key={index}
                        item={item}
                        handleModal={handleModal}
                      />
                    );
                  })} 
        </div>  
       </div>
       </div>
       <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />
       </> 
    )
}

export default Discount_page
