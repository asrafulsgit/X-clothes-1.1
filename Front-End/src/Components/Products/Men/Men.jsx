import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Men.css";

import { Link, useParams } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";
import { categoryCheck, subCategory } from "../../../utils/categoryCheck";
import {apiRequiest} from "../../../utils/ApiCall";
import Header from "../header/Header";

const Men = () => {
  const { category } = useParams();
  const [message,setMessage]=useState(localStorage.getItem('message')|| 'Product Empty!')
  const [pageLoading, setPageLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const [mensData, setMensData] = useState([]);
  const apiCaling = async () => {
    try {
      if (subCategory(category)) {
        const data = await apiRequiest(
          "post",
          "/get-product-by-subcategory",
          { subcategory: category }
        );
        setMensData(data?.products);
        setPageLoading(false);
      } else if (categoryCheck(category)) {
        const data = await apiRequiest("post", `/get-product-by-categoris`, {
          categories: ["101120"],
        });
        setMensData(data?.products);
        setPageLoading(false)
      } else {
        setMensData([]);
        setPageLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    apiCaling();
  }, [category]);

  const handleModal = (modal, product) => {
    setIsModal(modal);
    setModalInfo(product);
    setModalLoading(false);
  };
  const clearCartModal = (value) => {
    setIsModal(value);
  };
  return (
    <>
      <div className="mens-page">
        <Header param={'/men/101120'} name={`Men's`} header={`Men's Shop`} />

        <div className="mens-section">
          {pageLoading ? (
            <p style={{ textAlign: "center" }}>Loaging...</p>
          ) : (
            <div className="mens-shop">
              {!pageLoading && (mensData?.length <= 0 || !mensData) ? <p>{message}</p>
              : mensData.map((item) => {
                  return (
                    <Card
                      key={uuidv4()}
                      item={item}
                      handleModal={handleModal}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <div className={isModal ? "modal-open" : "add-to-cart-modal"}>
        {!modalLoading && isModal ? (
          <Modal product={modalInfo} clearCartModal={clearCartModal} />
        ) : (
          <p style={{ color: "white" }}>loading...</p>
        )}
      </div>
    </>
  );

};

export default Men;
