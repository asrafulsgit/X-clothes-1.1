import React, { useState } from 'react'
import Card from '../../Products/Card'
import Header from '../../Products/header/Header'
import Modal from '../../Products/Modal'
import { useLocation } from 'react-router-dom'

const Today_Deals = () => {
    const [message, setMessage]= useState('')
    const {state} = useLocation()
     
       const [products,setProducts]= useState(state)
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [modalInfo, setModalInfo] = useState({});
       
       
       const handleModal = (modal, product) => {
            setIsModalOpen(modal);
            setModalInfo(product);
          };
         
  
       return (

       <>
       <div className="mens-page">
       <Header param={`/product/today-deals`} name={`Todays Deals`} header={`Todays Deals Shop`} />
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

export default Today_Deals
