import React, { useEffect, useState } from 'react'
import './Favourite.css'
import { apiRequiestWithCredentials } from '../../../utils/ApiCall';
import Header from '../../Products/header/Header';
import ExtraFooter from '../../App/Footer/ExtraFooter';
import Spinner from '../../../utils/loading/Spinner'
const Favourite = () => {
   const [favorites,setFavorites]=useState([])
   const [message,setMessage]=useState('Your cart is empty!')
   const [loading,setLoading]=useState(true)

    useEffect(()=>{
      const apiCalling =async()=>{
            try {
              const data = await apiRequiestWithCredentials('get','/get-to-favourite');
              setFavorites(data?.products || [])
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
        }
        apiCalling()
    },[])

    const handleDelete=async(id)=>{
      setLoading(true)
      const filteredFavorites = favorites.filter(item => item.productId._id !== id)
      try {
        await apiRequiestWithCredentials('delete',`/remove-from-favourite/${id}`);
         const favorites = JSON.parse(localStorage.getItem('favorites'));
          const updatedFavorites = favorites.filter((item) => item !== id);
          localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
          setFavorites(filteredFavorites || []);
        setLoading(false)
      } catch (error) {
        console.log(error)
         setLoading(false)
      }

    }
    
    return (
      <div className='favorite-page'>
        <Header param={'/favourite'} name={'Favorites'} header={'Favorites'} />
        <div className="cart-main">
        {loading ? (
          <div className="favorite-page-spinner">
            <Spinner />
          </div>
        ) : (favorites?.length <= 0 || !favorites) ? (
          <p className="empty-message"> Cart is Empty</p>
        ) : (
          <div className="favorite-cart-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th className="cart-price-header">Price</th>
                  <th>Date Added</th>
                  <th className="cart-subtotal-header">Stock Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="cart-cards">
                {favorites.map((item) => {
                  const {_id,title,stock,images,price} =item.productId;
                  return (
                    <tr key={_id} className="cart-card">
                      <td className="remove-data">
                        <button
                          onClick={() => handleDelete(_id)}
                          className="remove-cart-item-btn"
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </td>
                      <td className="product">
                        <img src={images?.[0]} alt="image" />
                        <div className="product-details">
                          <h2 className="title">
                            {title.length > 30
                              ? title.slice(0, 25) + "..."
                              : title}
                          </h2>
                          <div>
                            <p>Color : white</p>
                            <p>Size : xl </p>
                          </div>
                        </div>
                      </td>
                      <td className='price-td'>${price}</td>
                      <td className='date-td'>{item?.createdAt.split('T')[0]}</td>
                      <td className='stock-td'>{stock >=0 ? 'Instock' : ''}</td>
                      <td className='add-to-cart-btn-td'><button className='add-to-cart-btn'>Add to Cart</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
        <ExtraFooter />
      </div>
    )
  }

export default Favourite


