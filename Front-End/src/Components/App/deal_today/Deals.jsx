import React, { useEffect, useState } from "react";
import "./deals.css";
// import image from "../../../assets/test.jpg";
import { Link, useNavigate } from "react-router-dom";
import { apiRequiest, apiRequiestWithCredentials } from "../../../utils/ApiCall";
import Modal from "../../Products/Modal";
import { useSelector } from "react-redux";
const Deals = () => {
  const isLoggedIn = useSelector(state=> state.authInfo.isLoggedIn)
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(
       JSON.parse(localStorage.getItem('favorites')) || []
      );
   
  const [favoriteLoading, setFavoriteLoading] = useState(false);
   
      // Add product to favorites
      const addFavorite =async (id) => {
        setFavoriteLoading(true);
        try {
          const data = await apiRequiestWithCredentials('post','/add-to-favourite',{ productId: id });
          const favorites = JSON.parse(localStorage.getItem('favorites'))
          const updatedFavorites = [...favorites, data?.product?.productId];
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites || [] );
          setFavoriteLoading(false);
        } catch (error) {
          console.log(error);
          setFavoriteLoading(false);
        }
      };
      // Remove product from favorites
      const deleteFavorite = async(id) => {
        setFavoriteLoading(true);
        try {
          const data = await apiRequiestWithCredentials('delete',`/remove-from-favourite/${id}`);
          const favorites = JSON.parse(localStorage.getItem('favorites'));
          const updatedFavorites = favorites.filter((item) => item !== data?.product?._id);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites || []);
          setFavoriteLoading(false);
        } catch (error) {
          console.log(error);
          setFavoriteLoading(false);
        }
        
      };
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
  const checkFavorite =(id)=>{
    return favorites.includes(id)
  }
  const handleAddToCart =(product)=>{
    setModalInfo(product)
    setIsModalOpen(!isModalOpen)
  } 
  const unAuthUser =()=>{
    navigate('/login')
  }

  if (loading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }
  return (
   <> 
   <div className="today-deals-page">
      <div className="header">
        <div className="left-header">
        <p>Today Deals</p>
        <h1>Deals of the Day</h1>
        </div>
        <div className="right-header">
          <Link to='/product/today-deals' state={products}>
            <button className="see-more-btn">See More</button>
          </Link> 
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
                    <button className="favorite-btn" onClick={()=>{ 
                      // console.log('')
                      !isLoggedIn ? unAuthUser() : checkFavorite(_id) ? deleteFavorite(_id) : addFavorite(_id)
                      }
                      }>
                      <i
                        className={`fa-${
                          checkFavorite(_id) ? "solid" : "regular"
                        } fa-heart`}
                      ></i>
                    </button>
                    <button className="cart-btn" onClick={()=>{
                      !isLoggedIn ? unAuthUser() : handleAddToCart(product)
                      }}>
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
   </div>
       <Modal isOpen={isModalOpen} product={modalInfo} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Deals;


 