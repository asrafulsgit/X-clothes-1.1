const express = require('express');
const userAuthentication = require('../Middlewares/userAuth-middleware');
const { paymentCalculator, paymentWithCouponDiscount, createOrder, paymentSystem, payment_Success, getPaymentDetails, generateVoucher} = require('../Controllers/Payments.controllers');
const { validateCreateOrder, validateCoupon } = require('../validators/order.validation');
const { validationMiddleware } = require('../Middlewares/validation.result.middleware');
const paymentRouter = express.Router()


paymentRouter.post('/payment/calculator',userAuthentication,paymentCalculator)
paymentRouter.post('/payment/calculator/coupon',userAuthentication,validateCoupon,validationMiddleware, paymentWithCouponDiscount)
paymentRouter.post('/payment/create-order',userAuthentication,validateCreateOrder,validationMiddleware ,createOrder,paymentSystem)
paymentRouter.post('/payment/success/:tranId',payment_Success)
paymentRouter.get('/payment/details/:tranId',getPaymentDetails)
paymentRouter.post('/generate/voucher',generateVoucher)
 
module.exports=paymentRouter;