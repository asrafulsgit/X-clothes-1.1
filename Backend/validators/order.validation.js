const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');

// Validation middleware for creating an order
const validateCreateOrder = [
  body('carts')
    .isArray().withMessage('Items must be an array')
    .notEmpty().withMessage('Items cannot be empty')
    .bail()
    .custom((items) => {
      items.forEach((item, index) => {
        if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId._id)) {
          throw new Error(`Invalid product ID in item at index ${index}`);
        }
        if (item.quantity < 1) {
          throw new Error(`Item quantity must be at least 1 at index ${index}`);
        }
      });
      return true;
    }),

  body('shippingAddress.name').notEmpty().withMessage('Shipping name is required').escape(),
  body('shippingAddress.phone')
  .notEmpty().withMessage('Shipping phone is required')
  .matches(/^01[3-9]\d{8}$/).withMessage('Phone number must start with 01 and be followed by 9 digits.')
     .isLength({min: 11,max : 11}).withMessage('Invalid phone number format.')
    .escape(),
     body('shippingAddress.alt_phone')
    .optional()
    .matches(/^01[3-9]\d{8}$/).withMessage('Phone number must start with 01 and be followed by 9 digits.')
       .isLength({min: 11,max : 11}).withMessage('Invalid phone number format.')
      .escape(),
  body('shippingAddress.email')
    .optional()
    .isEmail().withMessage('Email must be valid').normalizeEmail(),
  body('shippingAddress.zila').notEmpty().withMessage('Zila is required').escape(),
  body('shippingAddress.upazila').notEmpty().withMessage('Upazila is required').escape(),

  body('paymentDetails.method')
    .optional()
    .isIn(['SSLCommerz', 'Stripe', 'PayPal', 'Bkash', 'Nagad']).withMessage('Invalid payment method'),

  body('paymentDetails.transactionId').optional().isString().withMessage('Transaction ID must be a string'),

  body('paymentDetails.status')
    .optional()
    .isIn(['Pending', 'Paid', 'Failed']).withMessage('Invalid payment status'),

  body('subTotal').isFloat({ min: 0 }).withMessage('Subtotal must be a non-negative number'),
  body('discount').isFloat({ min: 0 }).withMessage('Discount must be a non-negative number'),
  body('taxes').isFloat({ min: 0 }).withMessage('Taxes must be a non-negative number'),
  body('shippingCost').isFloat({ min: 0 }).withMessage('Shipping cost must be a non-negative number'),
  body('total').isFloat({ min: 0 }).withMessage('Total must be a non-negative number'),

  body('couponCode').optional().isString().withMessage('Coupon code must be a string').escape(),

  body('orderStatus')
    .optional()
    .isIn(['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded']).withMessage('Invalid order status'),

  body('tracking.carrier').optional().isString().withMessage('Carrier must be a string'),
  body('tracking.trackingNumber').optional().isString().withMessage('Tracking number must be a string'),

  body('createdAt').optional().isISO8601().withMessage('CreatedAt must be a valid date'),
  body('updatedAt').optional().isISO8601().withMessage('UpdatedAt must be a valid date'),
];
const validateCoupon =[
     body('couponCode').notEmpty().withMessage('coupon code is required').isString().withMessage('Coupon code must be a string').escape(),
]
module.exports={
     validateCreateOrder,
     validateCoupon
}



