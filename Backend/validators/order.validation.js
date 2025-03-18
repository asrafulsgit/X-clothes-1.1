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

  body('couponCode').optional().isString().withMessage('Coupon code must be a string').escape(),

];
const validateCoupon =[
     body('couponCode').notEmpty().withMessage('coupon code is required').isString().withMessage('Coupon code must be a string').escape(),
]
module.exports={
     validateCreateOrder,
     validateCoupon
}



