import React, { useEffect, useState } from 'react';
import './order.css'
const Orders = () => {
  const orders = [
    {
      orderId: '#SDGT1254FD',
      totalPayment: '$633.00',
      paymentMethod: 'Paypal',
      estimatedDeliveryDate: '24 February 2024',
      items: [
        {
          name: 'Trendy Brown Coat',
          color: 'Brown',
          size: 'XXL',
          quantity: 4,
          image: 'https://via.placeholder.com/80x100/A0522D/FFFFFF?text=Coat', // Replace with actual image URL
        },
        {
          name: 'Classy Light Coat',
          color: 'Cream',
          size: 'XXL',
          quantity: 1,
          image: 'https://via.placeholder.com/80x100/FFF8DC/000000?text=Coat', // Replace with actual image URL
        },
        {
          name: 'Light Brown Sweter',
          color: 'Light Brown',
          size: 'S',
          quantity: 1,
          image: 'https://via.placeholder.com/80x100/D2B48C/000000?text=Sweater', // Replace with actual image URL
        },
        {
          name: 'Modern Brown Dress',
          color: 'Brown',
          size: 'S',
          quantity: 2,
          image: 'https://via.placeholder.com/80x100/A0522D/FFFFFF?text=Dress', // Replace with actual image URL
        },
      ],
      status: 'Accepted',
    },
    {
      orderId: '#SDGT7412DF',
      totalPayment: '$60.00',
      paymentMethod: 'Cash',
      deliveredDate: '12 February 2024',
      items: [
        {
          name: 'Brown Winter Coat',
          color: 'Brown',
          size: 'XXL',
          quantity: 1,
          image: 'https://via.placeholder.com/80x100/A0522D/FFFFFF?text=Coat', // Replace with actual image URL
        },
      ],
      status: 'Delivered',
    },
  ];

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>Orders (2)</h2>
        <div className="sort-by">
          <span>Sort by:</span>
          <select>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      { orders.map((order) => (
        <div className="order-item" key={order.orderId}>
          <div className="order-details">
            <div className="order-id">
              <span>Order ID</span>
              <p>{order.orderId}</p>
            </div>
            <div className="total-payment">
              <span>Total Payment</span>
              <p>{order.totalPayment}</p>
            </div>
            <div className="payment-method">
              <span>Payment Method</span>
              <p>{order.paymentMethod}</p>
            </div>
            {order.estimatedDeliveryDate && (
              <div className="delivery-date">
                <span>Estimated Delivery Date</span>
                <p>{order.estimatedDeliveryDate}</p>
              </div>
            )}
            {order.deliveredDate && (
              <div className="delivered-date">
                <span>Delivered Date</span>
                <p>{order.deliveredDate}</p>
              </div>
            )}
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div className="order-item-detail" key={index}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-details">
                    Color: {item.color} | Size: {item.size} | Qty. {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-status">
            <span className={order.status.toLowerCase()}>{order.status}</span>
            <p>Your Order has been {order.status}</p>
          </div>

          <div className="order-actions">
            {order.status === 'Accepted' && (
              <>
                <button className="track-order">Track Order</button>
                <button className="invoice">Invoice</button>
                <button className="cancel-order">Cancel Order</button>
              </>
            )}
            {order.status === 'Delivered' && (
              <>
                <button className="add-review">Add Review</button>
                <button className="invoice">Invoice</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Orders