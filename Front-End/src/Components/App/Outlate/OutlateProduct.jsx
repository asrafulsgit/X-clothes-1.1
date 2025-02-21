import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Outlate.css'
const OutlateProduct = memo(({ item }) => {
  const { _id, brand, price, images } = item; 
    
  const [favorites, setFavorites] = useState(() => {
     return JSON.parse(localStorage.getItem('favorites')) || [];
   });
   const [isFavorite, setIsFavorite] = useState(favorites.includes(_id));
   const [favoriteLoading, setFavoriteLoading] = useState(false);
 
   // Add product to favorites
   const addFavorite = (id) => {
     setFavoriteLoading(true);
     axios
       .post('http://localhost:8000/add-to-favourite', { productId: id }, { withCredentials: true })
       .then(() => {
         // Use previous state to avoid issues with stale closure
         setFavorites((prevFavorites) => {
           const updatedFavorites = [...prevFavorites, id];
           localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
           setIsFavorite(true);
           return updatedFavorites; // Return updated state
         });
         setFavoriteLoading(false);
       })
       .catch((error) => {
         console.log(error);
         setFavoriteLoading(false);
       });
   };
   // Remove product from favorites
   const deleteFavorite = (id) => {
     setFavoriteLoading(true);
     axios
       .delete(`http://localhost:8000/remove-from-favourite/${id}`, { withCredentials: true })
       .then(() => {
         // Use previous state to avoid issues with stale closure
         setFavorites((prevFavorites) => {
           const updatedFavorites = prevFavorites.filter((item) => item !== id);
           localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
           setIsFavorite(false);
           return updatedFavorites; // Return updated state
         });
         setFavoriteLoading(false);
       })
       .catch((error) => {
         console.log(error);
         setFavoriteLoading(false);
       });
   };

  // Cart setup
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (id) => {
    setIsAdded(true);
    const cartInfo = { productId: id };
    axios.post('http://localhost:8000/add-to-cart', cartInfo, { withCredentials: true })
      .then((res) => setIsAdded(false))
      .catch((err) => {
        console.log(err);
        setIsAdded(false);
      });
  };



  return (
    <div className="outlate-card">
      <div className="outlate-card-image">
        <button onClick={() => {
            isFavorite ? deleteFavorite(_id) : addFavorite(_id);
        }} className='add-to-favourite-btn'>
          {favoriteLoading ? (
            <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
              <div className="ldio-x2uulkbinbj favorite-spinner">
                <div></div>
              </div>
            </div>
          ) : (
            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
          )}
        </button>
        <img loading='lazy' className='image' src={images[0]} alt="" />
      </div>
      <div className="outlate-card-footer">
        <div className='outalate-card-band-price'>
          <p className='brand'>{brand}</p>
          <p className='price'>TK : {price}</p>
        </div>
        <div className='outlate-card-btns'>
          <Link to={`/product/${_id}`}><button className='outlate-buy-now-btn'>BUY NOW</button></Link>
          <button onClick={() => handleAddToCart(_id)} className='outlate-add-to-cart-btn'>
            {isAdded ? (
              <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                <div className="ldio-x2uulkbinbj">
                  <div></div>
                </div>
              </div>
            ) : (
              <i id='add-icon' className="fa-solid fa-plus"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default OutlateProduct;
