import React from "react";
import "./deals.css";
import image from "../../../assets/test.jpg";
import { Link } from "react-router-dom";
const Deals = () => {
     const isFavorite = false;
  return (
    <div className="today-deals-page">
      <div className="header">
        <div className="left-header">
          <p>Today Deals</p>
          <h1>Deals of the Day</h1>
        </div>
      </div>
      <div className="deal-items">
        <div className="product">
          <div className="product-left">
            <img src={image} alt="" />
            <p className="discount-badge">50% Off</p>
            <div className="btns">
              <button
               //  onClick={() => {
               //    {
               //      !isLoggedIn
               //        ? unAuthUser()
               //        : isLoggedIn && isFavorite
               //        ? deleteFavorite(_id)
               //        : isLoggedIn && !isFavorite
               //        ? addFavorite(_id)
               //        : "";
               //    }
               //  }}
                className="favorite-btn"
              >
                {/* {favoriteLoading ? (
                  <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                    <div className="ldio-x2uulkbinbj favorite-spinner">
                      <div></div>
                    </div>
                  </div>
                ) : ( */}
                  <i
                    className={`fa-${
                      isFavorite ? "solid" : "regular"
                    } fa-heart`}
                  ></i>
                {/* )} */}
              </button>
              <button 
          //     onClick={() => handleAddToCart(_id)} 
              className='cart-btn'>
               {/* {isAdded ? (
                 <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                   <div className="ldio-x2uulkbinbj">
                     <div></div>
                   </div>
                 </div>
               ) : ( */}
                 <i id='add-icon' className="fa-solid fa-plus"></i>
               {/* )} */}
             </button>
            </div>
          </div>
          <div className="product-right">
            <p className="brand">Lerve</p>
            <p className="title">Mens t-shirt</p>
            <p className="price">
              $450 <span className="prev-price">$452</span>
            </p>
            <p className="rating"> 4.5</p>
            <p className="descripton">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat,
              beatae.
            </p>
            <Link>
              <button className="buy-btn">
                Buy Now <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="product">
          <div className="product-left">
            <img src={image} alt="" />
            <p className="discount-badge">50% Off</p>
            <div className="btns">
              <button
               //  onClick={() => {
               //    {
               //      !isLoggedIn
               //        ? unAuthUser()
               //        : isLoggedIn && isFavorite
               //        ? deleteFavorite(_id)
               //        : isLoggedIn && !isFavorite
               //        ? addFavorite(_id)
               //        : "";
               //    }
               //  }}
                className="favorite-btn"
              >
                {/* {favoriteLoading ? (
                  <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                    <div className="ldio-x2uulkbinbj favorite-spinner">
                      <div></div>
                    </div>
                  </div>
                ) : ( */}
                  <i
                    className={`fa-${
                      isFavorite ? "solid" : "regular"
                    } fa-heart`}
                  ></i>
                {/* )} */}
              </button>
              <button 
          //     onClick={() => handleAddToCart(_id)} 
              className='cart-btn'>
               {/* {isAdded ? (
                 <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                   <div className="ldio-x2uulkbinbj">
                     <div></div>
                   </div>
                 </div>
               ) : ( */}
                 <i id='add-icon' className="fa-solid fa-plus"></i>
               {/* )} */}
             </button>
            </div>
          </div>
          <div className="product-right">
            <p className="brand">Lerve</p>
            <p className="title">Mens t-shirt</p>
            <p className="price">
              $450 <span className="prev-price">$452</span>
            </p>
            <p className="rating"> 4.5</p>
            <p className="descripton">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat,
              beatae.
            </p>
            <Link>
              <button className="buy-btn">
                Buy Now <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
