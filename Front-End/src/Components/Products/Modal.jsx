import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./modal.css";
import { apiRequiestWithCredentials } from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Modal = ({ isOpen, product, onClose }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authInfo);

  const [productInfo, setProductInfo] = useState({});
  const [modalThunailImage, setModalthumnailImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  useEffect(() => {
    if (product && Object.keys(product).length) {
      setProductInfo(product);
      setModalthumnailImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.[0] || "");
      setQuantity(1);
      setColor("");
      const favs = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(favs);
      setIsFavorite(favs.includes(product._id));
    }
  }, [product]);

  if (!isOpen || !productInfo || Object.keys(productInfo).length === 0) return null;

  const {
    _id,
    brand,
    title,
    price,
    sizes = [],
    images = [],
    description,
    colors = [],
    stock,
  } = productInfo;

  const hangleThumnailImage = (index) => {
    setModalthumnailImage(images[index]);
  };

  const handleSize = (e) => setSelectedSize(e.target.value);

  const handleQuantity = (e) => setQuantity(Number(e.target.value));

  const handleColor = (e) => setColor(e.target.value);

  const handleAddtoModal = async (id) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a color.");
      return;
    }
    if (!color) {
      alert("Please select a color.");
      return;
    }

    setAddToCartLoading(true);
    try {
      await apiRequiestWithCredentials("post", "/add-to-cart", {
        productId: id,
        quantity,
        size: selectedSize,
        color,
      });
      setSelectedSize("");
      setColor("");
      setQuantity(1);
    } catch (error) {
      console.log(error);
    }finally{
      setAddToCartLoading(false);
    }
  };

  const addFavorite = async (id) => {
    setFavoriteLoading(true);
    try {
      const data = await apiRequiestWithCredentials("post", "/add-to-favourite", { productId: id });
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = [...favorites, data?.product?.productId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
    setFavoriteLoading(false);
  };

  const deleteFavorite = async (id) => {
    setFavoriteLoading(true);
    try {
      const data = await apiRequiestWithCredentials("delete", `/remove-from-favourite/${id}`);
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = favorites.filter((item) => item !== data?.product?._id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setIsFavorite(false);
    } catch (error) {
      console.log(error);
    }
    setFavoriteLoading(false);
  };

  const unAuthUser = () => navigate("/login");

  return (
    <div className="product-info-modal" onClick={onClose}>
      <div className="cart-modal modal-animate" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="cart-modal-left">
          <div className="cart-modal-images">
            {images.map((img, index) => (
              <img
                src={img}
                onClick={() => hangleThumnailImage(index)}
                onMouseOver={() => hangleThumnailImage(index)}
                key={index}
                alt=""
              />
            ))}
          </div>
          <div className="cart-modal-thumnail-image">
            <img src={modalThunailImage || "something wrong"} alt="" />
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
            {sizes.length > 0 && (
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
              {colors.map((item, index) => (
                <input
                  key={index}
                  onClick={handleColor}
                  type="button"
                  value={item}
                  className={`color ${color === item && "color-active"} `}
                />
              ))}
            </div>
          </div>
          <div className="cart-modal-btns">
            <button
              className="add-to-cart"
              disabled={stock <= 0}
              onClick={() => handleAddtoModal(_id)}
            >
              <p>
                {addToCartLoading
                  ? "loading..."
                  : stock <= 0
                  ? "out of stock"
                  : "Add To Cart"}
              </p>
            </button>
            <button
              onClick={() => {
                if (!isLoggedIn) unAuthUser();
                else if (isFavorite) deleteFavorite(_id);
                else addFavorite(_id);
              }}
              className="cart-modal-favorite-btn"
            >
              {favoriteLoading ? (
                <div style={{ padding: "0 4px" }} className="loadingio-spinner-rolling-nq4q5u6dq7r">
                  <div className="ldio-x2uulkbinbj">
                    <div style={{ width: "14px", height: "14px" }}></div>
                  </div>
                </div>
              ) : (
                <i className={`fa-${isFavorite ? "solid" : "regular"} fa-heart`}></i>
              )}
            </button>
          </div>
          <div className="description">
            <h3>Description : </h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
