const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { paymentCalculator, paymentWithCouponDiscount, createOrder} = require('../Controllers/Payments.controllers');
const { validateCreateOrder, validateCoupon } = require('../validators/order.validation');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const paymentRouter = express.Router()


paymentRouter.post('/payment/calculator',userAuthentication,paymentCalculator)
paymentRouter.post('/payment/calculator/coupon',userAuthentication,validateCoupon,validationMiddleware, paymentWithCouponDiscount)
paymentRouter.post('/payment/create-order',userAuthentication,validateCreateOrder,validationMiddleware ,createOrder)
 
module.exports=paymentRouter;