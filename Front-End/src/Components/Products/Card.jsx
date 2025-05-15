import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiRequiestWithCredentials } from '../../utils/ApiCall';
import { useSelector } from 'react-redux';
import Spinner from '../../utils/loading/Spinner';

const Card = ({ item,handleModal }) => {
     const { _id, brand, price, images } = item; 
     const isLoggedIn = useSelector(state=> state.authInfo.isLoggedIn)
     const navigate = useNavigate()
     const [favorites, setFavorites] = useState(
       JSON.parse(localStorage.getItem('favorites')) || []
      );
      const [isFavorite, setIsFavorite] = useState(favorites.includes(_id));
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
          setIsFavorite(true);
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
          setIsFavorite(false);
          setFavoriteLoading(false);
        } catch (error) {
          console.log(error);
          setFavoriteLoading(false);
        }
        
      };

     // Cart setup
     const [isAdded, setIsAdded] = useState(false);
   
     const handleAddToCart = (id) => {
       handleModal(true,item)
     };
  
      const unAuthUser =()=>{
        navigate('/login')
      }
     return (
       <>
       <div className="outlate-card">
         <div className="outlate-card-image">
           <button onClick={() => {
              {
                !isLoggedIn ? unAuthUser() : 
                isFavorite  ? deleteFavorite(_id) : addFavorite(_id) }
           }} className='add-to-favourite-btn'>
             {favoriteLoading ? (
               <Spinner />
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
       
      </>
     );
   };

export default Card
