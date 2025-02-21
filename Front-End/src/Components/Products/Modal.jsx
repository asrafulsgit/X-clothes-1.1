import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./modal.css";
import { apiRequiestWithCredentials } from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Modal = ({ product, clearCartModal }) => {
  const { isLoggedIn } = useSelector((state) => state.authInfo);
  const navigate = useNavigate();
  const [productInfo, setProduct] = useState(product);
  const [modalThunailImage, setModalthumnailImage] = useState(
    product.images[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const { _id, brand, title, price, sizes, images, description } = productInfo;
  const [favorites,setFavorites]=useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )
  const [isFavorite, setIsFavorite] = useState(favorites.includes(_id));
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const hangleThumnailImage = (index) => {
    setModalthumnailImage(product.images[index]);
  };
  const handleSize = (e) => {
    setSelectedSize(e.target.value);
  };
  const handleQuantity = (e) => {
    const { value } = e.target;
    setQuantity(Number(value));
  };
  const handleColor = (e) => {
    const color = e.target.value;
    setColor(color);
  };
  const handleModal = () => {
    clearCartModal(false);
  };

  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const handleAddtoModal = async (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (color.length <= 0) {
      alert("Please select a color.");
      return;
    }
    setAddToCartLoading(true);
    try {
      const data = await apiRequiestWithCredentials("post", "/add-to-cart", {
        productId: id,
        quantity,
        size: selectedSize,
        color,
      });
      setAddToCartLoading(false);
    } catch (error) {
      console.log(error);
      setAddToCartLoading(false);
    }
  };
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
              const unAuthUser =()=>{
                navigate('/login')
              }
  return (
    <div className="cart-modal">
      <div onClick={handleModal} className="modal-close-btn">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <div className="cart-modal-left">
        <div className="cart-modal-images">
          {images.map((img, index) => {
            return (
              <img
                src={img}
                onClick={() => hangleThumnailImage(index)}
                onMouseOver={() => hangleThumnailImage(index)}
                key={index}
                alt=""
              />
            );
          })}
        </div>
        <div className="cart-modal-thumnail-image">
          <img src={modalThunailImage || "somthing wrong"} alt="" />
        </div>
      </div>
      <div className="cart-modal-right">
        <div>
          <h3 className="product-brand">{brand}</h3>
          <h3 className="product-title">{title}</h3>
        </div>
        <div className="product-price">
          <p className="price">TK : {price}</p>
        </div>
        <div className="size_quantity">
          <div className="quentity-div">
            <p>Quantity : </p>
            <div className="quantity-field">
              <button
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
                className="inc-dec-btn"
              >
                -
              </button>
              <input
                type="number"
                onChange={handleQuantity}
                value={quantity}
                name="quantity"
                id="quantity"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="inc-dec-btn"
              >
                +
              </button>
            </div>
          </div>
          {sizes && (
            <div className="product-size">
              <p>Size : </p>
              <select
                name="sizes"
                value={selectedSize}
                id="sizes"
                onChange={handleSize}
              >
                {sizes.map((item) => (
                  <option key={uuidv4()} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="colors-div">
          <p>Colors : </p>
          <div className="colors">
            {product.colors.map((item, index) => {
              return (
                <input
                  key={index}
                  onClick={handleColor}
                  type="button"
                  value={item}
                  className={`color ${color === item && "color-active"} `}
                />
              );
            })}
          </div>
        </div>
        <div className="cart-modal-btns">
          <button className="add-to-cart" disabled={product.stock <=0 || !product.stock} 
          onClick={() => handleAddtoModal(_id)}>
            {addToCartLoading ? <p>loading...</p> : <p>Add To Cart</p>}
          </button>
          <button onClick={() => {
              {
                !isLoggedIn ? unAuthUser() : 
                (isLoggedIn && isFavorite ) ? deleteFavorite(_id) : 
                (isLoggedIn && !isFavorite ) ? addFavorite(_id) : ''}
           }} className="cart-modal-favorite-btn">
            {favoriteLoading ? 
               <div style={{padding: '0 4px'}} className="loadingio-spinner-rolling-nq4q5u6dq7r">
                 <div  className="ldio-x2uulkbinbj ">
                   <div style={{width : '14px',height : '14px'}}></div>
                 </div>
               </div>
            : <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>}
          </button>
        </div>
        <div className="description">
          <h3>Description : </h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
