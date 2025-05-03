import React, { useEffect, useState } from "react";
import "./deals.css";
// import image from "../../../assets/test.jpg";
import { Link } from "react-router-dom";
import { apiRequiest } from "../../../utils/ApiCall";
const Deals = () => {
  const isFavorite = false;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTodaysDeals = async () => {
    try {
      const data = await apiRequiest("get", "/guest/todays-deals");
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodaysDeals();
  }, []);

  

  const discountPrice = (price, discount) => {
    const prevPrice = Number(price);
    const discountAmount = (prevPrice / 100) * discount;
    const discountPrice = Math.floor(prevPrice - discountAmount);
    return discountPrice;
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8,1, 2, 3, 4, 5, 6, 7, 8];

const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2;

  const handleNext = () => {
    if (currentIndex + visibleCount < items.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  if (loading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }
  return (
    <div className="today-deals-page">
      <div className="header">
        <div className="left-header">
          <p>Today Deals</p>
          <h1>Deals of the Day</h1>
        </div>
      </div>
      <div className="deal-items">
        {/* {products.length > 0 ? (
          products.map((product, index) => {
            const { discount, title, brand, price, description, images } =
              product;
            return (
              <div className="product">
                <div className="product-left">
                  <img src={images[0] || ""} alt="Product Image" />
                  <p className="discount-badge">{discount}% Off</p>
                  <div className="btns">
                    <button className="favorite-btn">
                      <i
                        className={`fa-${
                          isFavorite ? "solid" : "regular"
                        } fa-heart`}
                      ></i>
                    </button>
                    <button className="cart-btn">
                      <i id="add-icon" className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="product-right">
                  <p className="brand">{brand}</p>
                  <p className="title">{title}</p>
                  <p className="price">
                    ${discountPrice(price, discount)}{" "}
                    <span className="prev-price">${price}</span>
                  </p>
                  <p className="rating"> 4.5</p>
                  <p className="descripton">{description}</p>
                  <Link>
                    <button className="buy-btn">
                      Buy Now <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>Product not found!</p>
        )} */}
      </div>
      



      <div className="slider-container">
      <button className="arrow left" onClick={handlePrev} disabled={currentIndex === 0}>
        &#8249;
      </button>

      <div className="slider-viewport">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * (479)+(10*currentIndex)}px)` }}
        >
          {items.map((item, idx) => (
            <div className="slide-item" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <button
        className="arrow right"
        onClick={handleNext}
        disabled={currentIndex + visibleCount >= items.length}
      >
        &#8250;
      </button>
    </div>
    </div>
  );
};

export default Deals;

// { <div className="product">
// <div className="product-left">
// <img src={image} alt="" />
// <p className="discount-badge">50% Off</p>
// <div className="btns">
// <button
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
// className="favorite-btn"
// >
{
  /* {favoriteLoading ? (
          <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
            <div className="ldio-x2uulkbinbj favorite-spinner">
              <div></div>
            </div>
          </div>
        ) : ( */
}
// <i
//   className={`fa-${
//     isFavorite ? "solid" : "regular"
//   } fa-heart`}
// ></i>
{
  /* )} */
}
//     </button>
//     <button
// //     onClick={() => handleAddToCart(_id)}
//     className='cart-btn'>
//      {/* {isAdded ? (
//        <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
//          <div className="ldio-x2uulkbinbj">
//            <div></div>
//          </div>
//        </div>
//      ) : ( */}
//        <i id='add-icon' className="fa-solid fa-plus"></i>
//      {/* )} */}
//    </button>
// </div>
// </div>
// <div className="product-right">
// <p className="brand">Lerve</p>
// <p className="title">Mens t-shirt</p>
// <p className="price">
//   $450 <span className="prev-price">$452</span>
// </p>
// <p className="rating"> 4.5</p>
// <p className="descripton">
//   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat,
//   beatae.
// </p>
// <Link>
//   <button className="buy-btn">
//     Buy Now <i className="fa-solid fa-arrow-right-long"></i>
//   </button>
// </Link>
// </div>
// </div>}
