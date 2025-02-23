import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./Kids.css";
import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import kidsBanner from "../../../assets/banners/kids-banner.png";
import { Link, useParams } from "react-router-dom";
import Card from "../Card";
import Modal from "../Modal";
import { categoryCheck, subCategory } from "../../../utils/categoryCheck";
import {apiRequiest} from "../../../utils/ApiCall";
import { useSelector } from "react-redux";

const Kids = () => {
  const { category } = useParams();
  const [message,setMessage]=useState(localStorage.getItem('message')|| 'Product Empty!')
  const [pageLoading, setPageLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [modalLoading, setModalLoading] = useState(true);
  const [kidsData, setKidsData] = useState([]);

  useEffect(() => {
    const apiCaling = async () => {
      try {
        if (subCategory(category)) {
          const data = await apiRequiest(
            "post",
            "/get-product-by-subcategory",
            { subcategory: category }
          );
          setKidsData(data?.products);
          setPageLoading(false);
        } else if (categoryCheck(category)) {
          const data = await apiRequiest("post", `/get-product-by-categoris`, {
            categories: ["301320", "401420"],
          });
          setKidsData(data?.products);
          setPageLoading(false)
        } else {
          setKidsData([]);
          setPageLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
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
      <div className="kids-page">
        <Nav navBgSetWithModal={isModal && true} />
        <div className="winter-banner">
                           <h1>Kid's Shop</h1>
                           <div className="header-links">
                            <Link to='/'>Home</Link>|
                            <Link to='/kids/301401'>Kid's</Link>
                         </div>
          
               </div>

        <div className="kids-section">
          {pageLoading ? (
            <p style={{ textAlign: "center" }}>Loaging...</p>
          ) : (
            <div className="kids-shop">
              {!pageLoading && (kidsData?.length <= 0 || !kidsData) ? <p>{message}</p>
              : kidsData?.map((item) => {
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
        <Footer />
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

export default Kids;
