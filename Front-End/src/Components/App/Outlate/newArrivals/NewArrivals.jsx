import { useEffect, useState } from "react";
import Modal from "../../../Products/Modal";
import Card from "../../../Products/Card";
import { apiRequiest } from "../../../../utils/ApiCall";
import Spinner from "../../../../utils/loading/Spinner";

const NewArrivals = () => {
     const [message, setMessage]= useState('')
     const [products,setProducts]= useState([])
     const [loading,setLoading] = useState(true)
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [modalInfo, setModalInfo] = useState({});
     const bestSalesProducts = async()=>{
          try {
               const data = await apiRequiest('get','/guest/new-arrivals')
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
           {loading ?  <p className="outlate-spinner">
                          <Spinner />
                      </p> : ( !products || !products.length ) ? <p>no data found</p>
              :<div className="outlate-products"> {products.map((item,index) => {
                  return (
                    <Card
                      key={index}
                      item={item}
                      handleModal={handleModal}
                    />
                  );
                })}
               </div>
          }   
     </div>
     <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />
     </> 
  )
}

export default NewArrivals