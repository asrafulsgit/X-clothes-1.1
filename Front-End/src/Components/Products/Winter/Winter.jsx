import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import "./Winter.css";
import Card from "../Card";
import Modal from "../Modal";
import { categoryCheck, subCategory } from "../../../utils/categoryCheck";
import {apiRequiest} from "../../../utils/ApiCall";
import Header from "../header/Header";
import Page_loading from "../../../utils/loading/Page_loading";

const Winter = () => {
  const { category } = useParams();
  const [message,setMessage]=useState('')
  
  const [winterData, setWinterData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const apiCaling = async () => {
      try {
        if (subCategory(category)) {
          const data = await apiRequiest(
            "post",
            "/get-product-by-subcategory",
            { subcategory: category }
          );
          setWinterData(data?.products);
          setPageLoading(false);
        } else if (categoryCheck(category)) {
          const data = await apiRequiest("post", `/get-product-by-categoris`, {
            categories: ["120130","230240","330340","420440"],
          });
          setWinterData(data?.products);
          setPageLoading(false)
        } 
      } catch (error) {
        console.log(error);
        setWinterData([])
        setMessage(error.data?.message || 'This Product is not available for now!')
        setPageLoading(false)
      }
    };

  useEffect(() => { 
    apiCaling();
  }, [category]);

  
const handleModal = (modal, product) => {
          setIsModalOpen(modal);
          setModalInfo(product);
        };
        if (pageLoading) {
          return <> <Page_loading /> </>
        }
  return (
    <>
      <div className="womens-page">
        <Header  param={'/winter/12233342'} name={'Winter'} header={'Winter Shop'}/>
        <div className="womens-section">
              <div className="womens-shop">
                { ( !winterData || winterData?.length <= 0 ) ? (
                  <p className="message">{message}</p>
                ): winterData.map((item) => {
                    return (
                      <Card
                        key={uuidv4()}
                        item={item}
                         handleModal={handleModal}
                      />
                    );
                  })}
              </div>
        </div>
      </div>

      {/* cart-modal */}
      <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />

    </>
  );
};

export default Winter;
