import React, { useEffect, useState } from "react";
import "./Cart.css";

import Nav from "../../App/Nav/Nav";
import Footer from "../../App/Footer/Footer";
import Header from "../../Products/header/Header";
import { apiRequiestWithCredentials } from "../../../utils/ApiCall";
import ExtraFooter from "../../App/Footer/ExtraFooter";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsCheckout } from "../../../utils/Controllers/UserSlice";

const Cart = () => {
  const dispatch = useDispatch()
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState("Your cart is empty!");
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount]=useState(0)
  const [totalItems,setTotalItems]=useState(0)
  useEffect(() => {
    const apiCalling = async () => {
      try {
        const data = await apiRequiestWithCredentials("get", "/get-user-carts");
        setCarts(data.carts || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setMessage(error.response?.data?.message)
        setLoading(false);
      }
    };
    apiCalling();
  }, []);
  useEffect(()=>{
    const calculateTotalItems = carts.reduce((acc,item)=> acc + item.quantity ,0)
    setTotalItems(calculateTotalItems)
    const calculateTotalAmount = carts.reduce((acc,item)=> acc + (item.quantity * item.productId.price),0)
    setTotalAmount(calculateTotalAmount)
  },[carts])
  const handleDelete = async (productId) => {
    setLoading(true);
    const filteredCarts = carts.filter((item) => item.productId._id !== productId);
    setCarts(filteredCarts);
    try {
      await apiRequiestWithCredentials(
        "delete",
        `/remove-cart-item/${productId}`
      );
    setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity =async(productId,quantity)=>{
    const updatedCarts = carts.map((item) => {
      if (item.productId._id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCarts(updatedCarts);
    try {
    await apiRequiestWithCredentials('put',`/update-cart-quantity/${productId}`,{quantity})
    } catch (error) {
      console.log(error)
    }
  }
  const handleIncrement =(productId,quantity)=>{
      handleQuantity(productId,quantity+1)   
  }
  const handleDecrement =(productId,quantity)=>{
      if(quantity > 1){
        handleQuantity(productId,quantity-1)
      }
  }
  
  const handleQuantityInput =(productId,e)=>{
      const {value}=e.target;
      const quantity = value ? Math.max(1,parseInt(value,10)): 1;
      handleQuantity(productId,quantity)
  }
  const handleChecout =(totalCart)=>{
    if(totalCart === 0) return;
    dispatch(setIsCheckout(true))
    
  }
  const orderSummary=[
    {name : 'Items', value : totalItems}
  ]
  return (
    <div className="cart-page">
      <Header param={"/cart"} name={"Cart"} header={"Shoping Cart"} />
      <div className="cart-main">
        {loading ? (
          <p>loading...</p>
        ) : !loading && (carts?.length <= 0 || !carts) ? (
          <p className="empty-message">{message}</p>
        ) : (
          <div className="cart-body">
            <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th className="cart-price-header">Price</th>
                  <th>Quantity</th>
                  <th className="cart-subtotal-header">Subtotal</th>
                </tr>
              </thead>
              <tbody className="cart-cards">
                {carts.map((item,index) => {
                  const {productId,quantity,color,size}=item;
                  const {_id,title,price,images,stock}=productId;
                  return (
                    <tr key={index} className="cart-card">
                      <td className="remove-data">
                        <button
                          onClick={() => handleDelete(_id)}
                          className="remove-cart-item-btn"
                        >
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </td>
                      <td className="product">
                        <img src={images?.[0]} alt="" />
                        <div className="product-details">
                          <h2 className="title">
                            {title.length > 30
                              ? title.slice(0, 25) + "..."
                              : title}
                          </h2>
                          <div>
                            <p>Color : {color}</p>
                            <p>Size : {size} </p>
                          </div>
                        </div>
                      </td>
                      <td>BDT {price}</td>
                      <td>
                        <div className="cart-table-quantity">
                          <button
                            disabled={quantity === 1}
                            onClick={()=> handleDecrement(_id,quantity)}
                            className="inc-dec-btn"
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <input
                            type="number"
                            onChange={(e)=>handleQuantityInput(_id,e)}
                            value={quantity}
                            name="quantity"
                          />
                          <button
                            disabled={quantity == stock}
                            onClick={() => handleIncrement(_id,quantity)}
                            className="inc-dec-btn"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div> 
                      </td>
                      <td>BDT {price*quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            <div className="order-summary-table">
                <table>
                  <thead>
                    <tr>
                    <th colSpan={2}><h3>Order Summary</h3></th>
                    </tr>
                  </thead>
                  <tbody > 
                   {orderSummary.map((item,index)=>{
                    return(
                      <tr key={index}>
                          <td className="order-summary-table-name">{item.name}</td>
                          <td className="order-summary-table-value">{item.value}</td>
                      </tr>
                    )
                   })} 
                   <tr className="order-submit-row">
                       <td className="order-summary-table-name">Total</td>
                       <td className="order-summary-table-value">{totalAmount}</td>
                   </tr>
                   <tr >
                     <td colSpan={2}> <Link to='/checkout' state={{carts,totalItems}} onClick={()=>handleChecout(carts.length)}  ><button className="order-submit-btn">Proceed to Checkout</button></Link> </td>
                   </tr>
                  </tbody>
                </table>
            </div>
          </div>
        )}
      </div>
      <ExtraFooter />
    </div>
  );
};

export default Cart;
