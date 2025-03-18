const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true 
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true, min: 1 },
        color: { type: String },
        size: { type: String }
      }
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      alt_phone: { type: String},
      email : {type: String},
      zila: { type: String, required: true },
      upazila: { type: String, required: true }
    },
    paymentDetails: {
      method: { type: String,  enum: ["SSLCommerz", "Stripe", "PayPal", "Bkash", "Nagad"]},
      transactionId: { type: String, default: null }, 
      status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' }
    },
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    taxes: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: { type: String, default: null },
    orderStatus: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'],
      default: 'Processing'
    },
    tracking: {
      carrier: { type: String, default: null },
      trackingNumber: { type: String, default: null }
    },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
