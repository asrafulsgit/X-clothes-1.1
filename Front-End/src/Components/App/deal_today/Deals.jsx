import React, { useEffect, useState } from "react";
import "./deals.css";
// import image from "../../../assets/test.jpg";
import { Link } from "react-router-dom";
import { apiRequiest } from "../../../utils/ApiCall";
import Modal from "../../Products/Modal";
const Deals = () => {
  const isFavorite = false;
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  // const [showCaseProducts,setShowCaseProducts]=useState([])
  const [loading, setLoading] = useState(true);
  const getTodaysDeals = async () => {
    try {
      const data = await apiRequiest("get", "/guest/todays-deals");
      setProducts(data?.products.slice(0,2));
      // setShowCaseProducts(data?.products)
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

  const handleAddToCart =(product)=>{
    setModalInfo(product)
    setIsModalOpen(!isModalOpen)
  }

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
        <div className="right-header">
          <button className="see-more-btn">See More</button>
        </div>
      </div>
      <div className="deal-items">
         {products.length > 0 ? (
          products.map((product, index) => {
            const {_id, discount, title, brand, price, description, images } =
              product;
            return (
              <div className="product" key={index}>
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
                    <button className="cart-btn" onClick={()=>handleAddToCart(product)}>
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
                  <Link to={`/product/${_id}`}>
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
        )} 
      </div>
       <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Deals;


 